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
import { BRAND_GRADIENT_BUTTON_SX } from "@/lib/theme";

const BUDGET_RANGES = [
  "$10K – $25K",
  "$25K – $50K",
  "$50K – $100K",
  "$100K+",
];

const inputStyles = {
  "& .MuiInputBase-root": { bgcolor: "white", color: "black" },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(0,0,0,0.7)",
    opacity: 1,
  },
  "& .MuiInputLabel-root": { color: "rgba(0,0,0,0.7)" },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0,0,0,0.23)",
  },
};

export default function BrandActivationForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [budgetRange, setBudgetRange] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleBudgetChange = (event: SelectChangeEvent<string>) => {
    setBudgetRange(event.target.value);
  };

  return (
    <Box
      id="inquiry"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 3, md: 8 },
        py: { xs: 6, md: 10 },
        bgcolor: "black",
        color: "white",
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: "36px", md: "56px", lg: "64px" },
          fontWeight: "bold",
          mb: 1,
          textAlign: "center",
          color: "white",
        }}
      >
        REQUEST A PROJECT QUOTE
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "16px", md: "20px" },
          textAlign: "center",
          maxWidth: 720,
          mb: 4,
          color: "rgba(255,255,255,0.85)",
        }}
      >
        Tell us about your brief. We reply within 48 hours with next steps.
      </Typography>

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
            alert("Please complete the CAPTCHA");
            return;
          }
          if (!budgetRange) {
            alert("Please select a budget range");
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

          setSubmitting(true);
          try {
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });

            if (response.ok) {
              trackGenerateLead({ form: "brandActivation", value: 500 });
              alert("Thank you. Your inquiry is in. We reply within 48 hours.");
              form.reset();
              setBudgetRange("");
              recaptchaRef.current?.reset();
            } else {
              throw new Error("Failed to send inquiry");
            }
          } catch {
            alert("An error occurred. Please try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <TextField
          name="name"
          placeholder="NAME"
          required
          fullWidth
          inputProps={{ "aria-label": "Name" }}
          sx={inputStyles}
        />
        <TextField
          name="email"
          type="email"
          placeholder="EMAIL"
          required
          fullWidth
          inputProps={{ "aria-label": "Email" }}
          sx={inputStyles}
        />
        <TextField
          name="company"
          placeholder="COMPANY / AGENCY"
          required
          fullWidth
          inputProps={{ "aria-label": "Company" }}
          sx={inputStyles}
        />
        <Box>
          <Typography
            component="label"
            htmlFor="projectDate"
            sx={{
              display: "block",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.7)",
              mb: 0.75,
            }}
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
            sx={inputStyles}
          />
        </Box>
        <FormControl
          fullWidth
          sx={{
            "& .MuiInputBase-root": { bgcolor: "white", color: "black" },
            "& .MuiInputLabel-root": { color: "rgba(0,0,0,0.7)" },
            "& .MuiInputLabel-root.Mui-focused": { color: "black" },
            "& .MuiSelect-select": { color: "black" },
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
          >
            {BUDGET_RANGES.map((range) => (
              <MenuItem key={range} value={range}>
                {range}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="referral"
          placeholder="HOW DID YOU HEAR ABOUT US?"
          fullWidth
          inputProps={{ "aria-label": "How did you hear about us" }}
          sx={inputStyles}
        />
        <TextField
          name="brief"
          placeholder="TELL US ABOUT THE PROJECT"
          required
          fullWidth
          multiline
          minRows={5}
          inputProps={{ "aria-label": "Brief" }}
          sx={inputStyles}
        />

        <Box sx={{ mb: 1, display: "flex", justifyContent: "center" }}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={submitting}
          sx={{
            alignSelf: "center",
            px: 4,
            py: 1.75,
            width: "100%",
            maxWidth: 780,
            fontWeight: 700,
            fontSize: "16px",
            letterSpacing: "0.05em",
            ...BRAND_GRADIENT_BUTTON_SX,
            "&.Mui-disabled": {
              background: "rgba(229,199,103,0.4)",
              color: "white",
            },
          }}
        >
          {submitting ? "SENDING..." : "REQUEST A QUOTE"}
        </Button>
      </Box>
    </Box>
  );
}
