"use client";

import { useRef, FormEvent, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { trackGenerateLead } from "@/lib/analytics";
import FormStatus, { FormStatusState } from "../components/FormStatus";
import {
  FONT_MONO,
  NB_BUTTON_SX,
  NB_COLORS,
  NB_DISPLAY_SX,
  NB_FIELD_LABEL_SX,
  NB_MONO_SX,
  NB_OUTLINE_TEXT_SX,
  NB_RULE,
  nbShadow,
} from "@/lib/theme";

const BUDGET_RANGES = [
  "$10K – $25K",
  "$25K – $50K",
  "$50K – $100K",
  "$100K+",
];

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
  "& .MuiSvgIcon-root": {
    color: NB_COLORS.ink,
  },
} as const;

const DETAILS = [
  { label: "TYPICAL RANGE", value: "$10K TO $100K+" },
  { label: "FASTEST TURNAROUND", value: "2 WEEKS BRIEF TO INSTALL" },
  { label: "RESPONSE TIME", value: "WITHIN 48 HOURS" },
];

export default function BrandActivationForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [budgetRange, setBudgetRange] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatusState>(null);

  const handleBudgetChange = (event: SelectChangeEvent<string>) => {
    setBudgetRange(event.target.value);
  };

  return (
    <Box component="section" id="inquiry" sx={{ bgcolor: NB_COLORS.paper }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
        }}
      >
        {/* Left: intake header */}
        <Box
          sx={{
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 6 },
            borderRight: { md: NB_RULE },
            borderBottom: { xs: NB_RULE, md: "none" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ ...NB_MONO_SX, fontSize: 12, color: NB_COLORS.steel, mb: 2 }}>
            PROJECT INTAKE · BRAND ACTIVATIONS
          </Typography>
          <Typography
            variant="h2"
            sx={{
              ...NB_DISPLAY_SX,
              fontSize: { xs: 36, sm: 48, lg: 60 },
              color: NB_COLORS.ink,
              mb: 1,
            }}
          >
            REQUEST A
          </Typography>
          <Typography
            sx={{
              ...NB_OUTLINE_TEXT_SX,
              fontSize: { xs: 36, sm: 48, lg: 60 },
              mb: 3,
            }}
          >
            PROJECT QUOTE.
          </Typography>
          <Typography
            sx={{ fontSize: { xs: 15, md: 17 }, color: NB_COLORS.ink, maxWidth: 420, mb: 4 }}
          >
            Tell us about your brief. We reply within 48 hours with next steps.
          </Typography>

          <Box sx={{ mt: "auto" }}>
            {DETAILS.map((row) => (
              <Box
                key={row.label}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  py: 1.25,
                  borderTop: NB_RULE,
                }}
              >
                <Typography sx={{ ...NB_MONO_SX, fontSize: 11, color: NB_COLORS.steel }}>
                  {row.label}
                </Typography>
                <Typography
                  sx={{ ...NB_MONO_SX, fontSize: 11, fontWeight: 700, color: NB_COLORS.ink }}
                >
                  {row.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right: form */}
        <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 4, md: 6 } }}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: 780,
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
              if (!budgetRange) {
                setStatus({
                  type: "error",
                  message: "PLEASE SELECT A BUDGET RANGE.",
                });
                return;
              }

              const form = e.currentTarget;
              const formElements = form.elements as HTMLFormControlsCollection & {
                name: HTMLInputElement;
                email: HTMLInputElement;
                company: HTMLInputElement;
                projectDate: HTMLInputElement;
                referral: HTMLInputElement;
                brief: HTMLTextAreaElement;
              };

              const formData = {
                recaptchaToken: captchaValue,
                name: formElements.name.value,
                email: formElements.email.value,
                company: formElements.company.value,
                projectDate: formElements.projectDate.value,
                budgetRange,
                referral: formElements.referral.value,
                brief: formElements.brief.value,
                formType: "brandActivation",
              };

              setStatus(null);
              setSubmitting(true);
              try {
                const response = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                });

                if (response.ok) {
                  trackGenerateLead({ form: "brandActivation", value: 500 });
                  setStatus({
                    type: "success",
                    message: "INQUIRY RECEIVED. WE REPLY WITHIN 48 HOURS.",
                  });
                  form.reset();
                  setBudgetRange("");
                  recaptchaRef.current?.reset();
                } else {
                  throw new Error("Failed to send inquiry");
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
            <Box>
              <Typography component="label" htmlFor="ba-name" sx={NB_FIELD_LABEL_SX}>
                NAME
              </Typography>
              <TextField id="ba-name" name="name" required fullWidth sx={FIELD_SX} />
            </Box>
            <Box>
              <Typography component="label" htmlFor="ba-email" sx={NB_FIELD_LABEL_SX}>
                EMAIL
              </Typography>
              <TextField
                id="ba-email"
                name="email"
                type="email"
                required
                fullWidth
                sx={FIELD_SX}
              />
            </Box>
            <Box>
              <Typography component="label" htmlFor="ba-company" sx={NB_FIELD_LABEL_SX}>
                COMPANY / AGENCY
              </Typography>
              <TextField id="ba-company" name="company" required fullWidth sx={FIELD_SX} />
            </Box>
            <Box>
              <Typography
                component="label"
                htmlFor="projectDate"
                sx={NB_FIELD_LABEL_SX}
              >
                ESTIMATED PROJECT DATE
              </Typography>
              <TextField
                id="projectDate"
                name="projectDate"
                type="date"
                required
                fullWidth
                inputProps={{ "aria-label": "Estimated Project Date" }}
                sx={FIELD_SX}
              />
            </Box>
            <FormControl
              fullWidth
              sx={{
                ...FIELD_SX,
                "& .MuiInputLabel-root": {
                  fontFamily: FONT_MONO,
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  color: NB_COLORS.steel,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: NB_COLORS.ink,
                },
              }}
            >
              <InputLabel id="budget-label">BUDGET RANGE</InputLabel>
              <Select
                labelId="budget-label"
                value={budgetRange}
                onChange={handleBudgetChange}
                label="BUDGET RANGE"
                required
                inputProps={{ "aria-label": "Budget Range" }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: NB_COLORS.surface,
                      color: NB_COLORS.ink,
                      border: NB_RULE,
                      borderRadius: 0,
                      boxShadow: nbShadow(4),
                      "& .MuiMenuItem-root": {
                        fontFamily: FONT_MONO,
                        fontSize: 13,
                        letterSpacing: "0.08em",
                        "&:hover": {
                          bgcolor: NB_COLORS.ink,
                          color: NB_COLORS.paperOnInk,
                        },
                        "&.Mui-selected": {
                          bgcolor: NB_COLORS.silver,
                          color: NB_COLORS.onSilver,
                          "&:hover": {
                            bgcolor: NB_COLORS.ink,
                            color: NB_COLORS.paperOnInk,
                          },
                        },
                      },
                    },
                  },
                }}
              >
                {BUDGET_RANGES.map((range) => (
                  <MenuItem key={range} value={range}>
                    {range}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box>
              <Typography component="label" htmlFor="ba-referral" sx={NB_FIELD_LABEL_SX}>
                HOW DID YOU HEAR ABOUT US? (OPTIONAL)
              </Typography>
              <TextField id="ba-referral" name="referral" fullWidth sx={FIELD_SX} />
            </Box>
            <Box>
              <Typography component="label" htmlFor="ba-brief" sx={NB_FIELD_LABEL_SX}>
                TELL US ABOUT THE PROJECT
              </Typography>
              <TextField
                id="ba-brief"
                name="brief"
                required
                fullWidth
                multiline
                minRows={5}
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
              {submitting ? "SENDING..." : "REQUEST A QUOTE"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
