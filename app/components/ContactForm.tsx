"use client";

import { useRef, useState, FormEvent } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { getAttribution } from "@/lib/attribution";
import { ContactApiResponse, useSpamGuard } from "@/hooks/useSpamGuard";
import { trackGenerateLead } from "@/lib/analytics";
import {
  BUDGET_RANGES,
  LOCATIONS,
  PROJECT_TYPES,
  REFERRAL_SOURCES,
  TIMELINES,
  type LeadOption,
} from "@/lib/leadFields";
import { uploadToDrive } from "@/lib/uploadToDrive";
import ChoiceChips from "./ChoiceChips";
import FileDrop, { type AttachedFile } from "./FileDrop";
import FormStatus, { FormStatusState } from "./FormStatus";
import HoneypotField from "./HoneypotField";
import {
  FONT_MONO,
  NB_BUTTON_SX,
  NB_COLORS,
  NB_FIELD_LABEL_SX,
  NB_MONO_SX,
  NB_RULE,
  nbShadow,
} from "@/lib/theme";

/** Hidden until the Drive service account is set up in Vercel */
const UPLOADS_ENABLED = process.env.NEXT_PUBLIC_LEAD_UPLOADS_ENABLED === "true";

const FIELD_SX = {
  "& .MuiInputBase-root": {
    bgcolor: NB_COLORS.surface,
    color: NB_COLORS.ink,
    borderRadius: 0,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: NB_RULE,
  },
  "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
    border: NB_RULE,
  },
  "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: NB_RULE,
  },
  "& .MuiInputBase-root.Mui-focused": {
    boxShadow: nbShadow(4),
  },
  "& .MuiInputBase-input::placeholder": {
    fontFamily: FONT_MONO,
    fontSize: 13,
    letterSpacing: "0.08em",
    color: NB_COLORS.steel,
    opacity: 1,
  },
  "& .MuiNativeSelect-select, & select": {
    fontFamily: FONT_MONO,
    fontSize: 14,
    letterSpacing: "0.06em",
  },
  "& select option": {
    bgcolor: NB_COLORS.surface,
    color: NB_COLORS.ink,
  },
  "& .MuiSvgIcon-root": {
    color: NB_COLORS.ink,
  },
} as const;

type InputSpec = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "url";
  placeholder?: string;
};

function Field({ spec }: { spec: InputSpec }) {
  return (
    <Box>
      <Typography component="label" htmlFor={`contact-${spec.name}`} sx={NB_FIELD_LABEL_SX}>
        {spec.label}
      </Typography>
      <TextField
        id={`contact-${spec.name}`}
        name={spec.name}
        type={spec.type ?? "text"}
        required={spec.required}
        autoComplete={spec.autoComplete}
        placeholder={spec.placeholder}
        slotProps={{ htmlInput: { inputMode: spec.inputMode } }}
        fullWidth
        sx={FIELD_SX}
      />
    </Box>
  );
}

function SelectField({
  name,
  label,
  options,
  required,
}: {
  name: string;
  label: string;
  options: LeadOption[];
  required?: boolean;
}) {
  return (
    <Box>
      <Typography component="label" htmlFor={`contact-${name}`} sx={NB_FIELD_LABEL_SX}>
        {label}
      </Typography>
      {/* Native select: the phone's own picker on mobile */}
      <TextField
        id={`contact-${name}`}
        name={name}
        select
        required={required}
        defaultValue=""
        fullWidth
        slotProps={{ select: { native: true } }}
        sx={FIELD_SX}
      >
        <option value="" disabled={required}>
          SELECT ONE
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    </Box>
  );
}

/** Spec-sheet section rule: "01 · WHO YOU ARE ——————" */
function SectionHead({ index, title }: { index: string; title: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: { xs: 1, md: 1.5 } }}>
      <Typography sx={{ ...NB_MONO_SX, fontSize: 12, fontWeight: 700, color: NB_COLORS.ink }}>
        {index} · {title}
      </Typography>
      <Box aria-hidden sx={{ flex: 1, borderTop: NB_RULE }} />
    </Box>
  );
}

const PAIR_SX = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
  gap: { xs: 2, md: 2.5 },
} as const;

const value = (form: HTMLFormElement, name: string) => {
  const field = form.elements.namedItem(name);
  if (field instanceof RadioNodeList) return field.value;
  if (
    field instanceof HTMLInputElement ||
    field instanceof HTMLTextAreaElement ||
    field instanceof HTMLSelectElement
  ) {
    return field.value.trim();
  }
  return "";
};

export default function ContactForm({ projectType }: { projectType?: string }) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [status, setStatus] = useState<FormStatusState>(null);
  const [buttonLabel, setButtonLabel] = useState("SENDING...");
  // Remounts the picker after a send so its file errors clear too
  const [fileDropKey, setFileDropKey] = useState(0);
  const { guardFields, restart } = useSpamGuard();

  const updateFile = (id: string, patch: Partial<AttachedFile>) =>
    setFiles((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  /** Sends each file to its Drive upload URL, then has the server check them. */
  const uploadFiles = async (uploads: NonNullable<ContactApiResponse["uploads"]>, leadId: string) => {
    let failed = 0;
    for (const [index, item] of files.entries()) {
      const url = uploads.urls[index];
      setButtonLabel(`UPLOADING ${index + 1} OF ${files.length}...`);
      updateFile(item.id, { state: "uploading", progress: 0 });
      try {
        if (!url) throw new Error("No upload URL");
        await uploadToDrive(url, item.file, item.type, (progress) =>
          updateFile(item.id, { progress })
        );
        updateFile(item.id, { state: "done", progress: 1 });
      } catch {
        failed += 1;
        updateFile(item.id, { state: "failed", progress: 0 });
      }
    }
    if (failed < files.length) {
      // Best effort: unchecked files are still scanned by Drive
      await fetch("/api/lead-files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, folderId: uploads.folderId, token: uploads.token }),
      }).catch(() => {});
    }
    return failed;
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 900,
        mx: "auto",
        gap: { xs: 2, md: 2.5 },
      }}
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const captchaValue = recaptchaRef.current?.getValue();
        if (!captchaValue) {
          setStatus({
            type: "error",
            message: "PLEASE COMPLETE THE CAPTCHA BEFORE SENDING.",
          });
          return;
        }

        const form = e.currentTarget;
        const email = value(form, "email");
        const body = {
          recaptchaToken: captchaValue,
          name: value(form, "name"),
          email,
          phone: value(form, "phone"),
          company: value(form, "company"),
          instagram: value(form, "instagram"),
          projectType: value(form, "projectType"),
          location: value(form, "location"),
          zip: value(form, "zip"),
          budget: value(form, "budget"),
          timeline: value(form, "timeline"),
          message: value(form, "message"),
          links: value(form, "links"),
          referralSource: value(form, "referralSource"),
          referralDetail: value(form, "referralDetail"),
          files: files.map((item) => ({ name: item.file.name, size: item.file.size, type: item.type })),
          ...guardFields(form),
          attribution: getAttribution(),
        };

        setStatus(null);
        setButtonLabel("SENDING...");
        setSubmitting(true);
        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          const result = (await response.json().catch(() => ({}))) as ContactApiResponse;
          if (!response.ok) {
            setStatus({
              type: "error",
              message: (
                result.error ?? "SOMETHING WENT WRONG. PLEASE TRY AGAIN OR EMAIL INFO@DRIPDOME.COM."
              ).toUpperCase(),
            });
            return;
          }

          let failedUploads = 0;
          // Spam the server silently dropped stays out of Ads; the CRM
          // hand-off now happens server-side for verified leads only
          if (result.lead && result.leadId) {
            trackGenerateLead({ form: "contact", leadId: result.leadId, email });
            if (result.uploads && files.length) {
              failedUploads = await uploadFiles(result.uploads, result.leadId);
            }
          }

          const filesLost = files.length > 0 && (result.uploadsUnavailable || failedUploads > 0);
          setStatus({
            type: "success",
            message: filesLost
              ? "MESSAGE RECEIVED. SOME FILES DID NOT UPLOAD, SO PLEASE REPLY TO OUR CONFIRMATION EMAIL WITH THEM. WE REPLY WITHIN 48 HOURS."
              : "MESSAGE RECEIVED. WE REPLY WITHIN 48 HOURS.",
          });
          form.reset();
          setFiles([]);
          setFileDropKey((key) => key + 1);
          recaptchaRef.current?.reset();
          restart();
        } catch {
          setStatus({
            type: "error",
            message: "SOMETHING WENT WRONG. PLEASE TRY AGAIN OR EMAIL INFO@DRIPDOME.COM.",
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <SectionHead index="01" title="THE PROJECT" />
      <ChoiceChips
        name="projectType"
        label="WHAT DO YOU NEED BUILT?"
        options={PROJECT_TYPES}
        required
        defaultValue={projectType}
      />
      <ChoiceChips name="location" label="WHERE IS IT?" options={LOCATIONS} required />
      <Box sx={PAIR_SX}>
        <Field
          spec={{
            name: "zip",
            label: "ZIP OR CITY (OPTIONAL)",
            autoComplete: "postal-code",
          }}
        />
        <SelectField name="timeline" label="WHEN DO YOU NEED IT?" options={TIMELINES} required />
      </Box>
      <SelectField name="budget" label="BUDGET RANGE" options={BUDGET_RANGES} required />
      <Box>
        <Typography component="label" htmlFor="contact-message" sx={NB_FIELD_LABEL_SX}>
          TELL US ABOUT IT
        </Typography>
        <TextField
          id="contact-message"
          name="message"
          required
          fullWidth
          multiline
          minRows={4}
          placeholder="THE SPACE, THE SHOW, THE BRAND, WHAT SUCCESS LOOKS LIKE"
          sx={FIELD_SX}
        />
      </Box>

      <SectionHead index="02" title="REFERENCES" />
      <Box>
        <Typography component="label" htmlFor="contact-links" sx={NB_FIELD_LABEL_SX}>
          MOODBOARD OR REFERENCE LINKS (OPTIONAL)
        </Typography>
        <TextField
          id="contact-links"
          name="links"
          fullWidth
          multiline
          minRows={2}
          placeholder="PINTEREST, DRIVE, DROPBOX. ONE PER LINE"
          slotProps={{ htmlInput: { inputMode: "url", autoCapitalize: "none", spellCheck: false } }}
          sx={FIELD_SX}
        />
      </Box>
      {UPLOADS_ENABLED && (
        <FileDrop key={fileDropKey} files={files} onChange={setFiles} disabled={submitting} />
      )}

      <SectionHead index="03" title="WHO YOU ARE" />
      <Box sx={PAIR_SX}>
        <Field spec={{ name: "name", label: "NAME", required: true, autoComplete: "name" }} />
        <Field
          spec={{
            name: "email",
            label: "EMAIL",
            type: "email",
            required: true,
            autoComplete: "email",
            inputMode: "email",
          }}
        />
        <Field
          spec={{
            name: "phone",
            label: "PHONE (OPTIONAL)",
            type: "tel",
            autoComplete: "tel",
            inputMode: "tel",
          }}
        />
        <Field
          spec={{ name: "company", label: "COMPANY (OPTIONAL)", autoComplete: "organization" }}
        />
      </Box>
      <Box sx={PAIR_SX}>
        <SelectField
          name="referralSource"
          label="HOW DID YOU HEAR ABOUT US? (OPTIONAL)"
          options={REFERRAL_SOURCES}
        />
        <Field
          spec={{
            name: "referralDetail",
            label: "ANY DETAIL? (OPTIONAL)",
            placeholder: "WHO REFERRED YOU, WHICH POST",
          }}
        />
      </Box>
      <Field spec={{ name: "instagram", label: "INSTAGRAM (OPTIONAL)" }} />

      <HoneypotField />
      <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
        <ReCAPTCHA
          ref={recaptchaRef}
          theme="dark"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        />
      </Box>
      <FormStatus status={status} />
      <Button
        type="submit"
        disableElevation
        disabled={submitting}
        sx={{
          ...NB_BUTTON_SX,
          width: "100%",
          py: 1.75,
          fontSize: 14,
          "&.Mui-disabled": {
            bgcolor: NB_COLORS.silverLight,
            color: NB_COLORS.steel,
            border: NB_RULE,
            boxShadow: nbShadow(0),
          },
        }}
      >
        {submitting ? buttonLabel : "SEND IT →"}
      </Button>
    </Box>
  );
}
