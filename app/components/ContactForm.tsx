"use client";

import { useRef, useState, FormEvent } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { sendData } from "@/hooks/sendData";
import FormStatus, { FormStatusState } from "./FormStatus";
import {
  FONT_MONO,
  NB_BUTTON_SX,
  NB_COLORS,
  NB_FIELD_LABEL_SX,
  NB_RULE,
  nbShadow,
} from "@/lib/theme";

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
} as const;

const FIELDS = [
  { name: "name", label: "NAME", type: "text" },
  { name: "instagram", label: "INSTAGRAM", type: "text" },
  { name: "email", label: "EMAIL", type: "email" },
  { name: "referral", label: "HOW DID YOU HEAR ABOUT US?", type: "text" },
];

export default function ContactForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatusState>(null);

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
        const formElements = form.elements as HTMLFormControlsCollection & {
          name: HTMLInputElement;
          instagram: HTMLInputElement;
          email: HTMLInputElement;
          referral: HTMLInputElement;
          message: HTMLTextAreaElement;
        };

        const formData = {
          recaptchaToken: captchaValue,
          name: formElements.name.value,
          instagram: formElements.instagram.value,
          email: formElements.email.value,
          referral: formElements.referral.value,
          message: formElements.message.value,
        };

        setStatus(null);
        setSubmitting(true);
        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            // Fire-and-forget: the CRM webhook must not affect user feedback
            void sendData(formData).catch(() => {});
            setStatus({
              type: "success",
              message: "MESSAGE RECEIVED. WE REPLY WITHIN 48 HOURS.",
            });
            form.reset();
            recaptchaRef.current?.reset();
          } else {
            throw new Error("Failed to send message");
          }
        } catch {
          setStatus({
            type: "error",
            message:
              "SOMETHING WENT WRONG. PLEASE TRY AGAIN OR EMAIL INFO@DRIPDOME.COM.",
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {FIELDS.map((field) => (
        <Box key={field.name}>
          <Typography
            component="label"
            htmlFor={`contact-${field.name}`}
            sx={NB_FIELD_LABEL_SX}
          >
            {field.label}
          </Typography>
          <TextField
            id={`contact-${field.name}`}
            name={field.name}
            type={field.type}
            required
            fullWidth
            sx={FIELD_SX}
          />
        </Box>
      ))}
      <Box>
        <Typography
          component="label"
          htmlFor="contact-message"
          sx={NB_FIELD_LABEL_SX}
        >
          YOUR MESSAGE
        </Typography>
        <TextField
          id="contact-message"
          name="message"
          required
          fullWidth
          multiline
          minRows={4}
          sx={FIELD_SX}
        />
      </Box>
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
        {submitting ? "SENDING..." : "SEND IT →"}
      </Button>
    </Box>
  );
}
