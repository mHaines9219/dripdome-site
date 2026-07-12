"use client";

import { useRef, FormEvent } from "react";
import { Box, Button, TextField } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { sendData } from "@/hooks/sendData";
import {
  FONT_MONO,
  NB_BUTTON_SX,
  NB_COLORS,
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
  { name: "name", placeholder: "NAME", type: "text", aria: "Name" },
  { name: "instagram", placeholder: "INSTAGRAM", type: "text", aria: "Instagram" },
  { name: "email", placeholder: "EMAIL", type: "email", aria: "Email" },
  {
    name: "referral",
    placeholder: "HOW DID YOU HEAR ABOUT US?",
    type: "text",
    aria: "How did you hear about us",
  },
];

export default function ContactForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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
          alert("Please complete the CAPTCHA");
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

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          await sendData(formData);
          if (response.ok) {
            alert("Thank you! Your message has been sent.");
            form.reset();
            recaptchaRef.current?.reset();
          } else {
            throw new Error("Failed to send message");
          }
        } catch {
          alert("An error occurred. Please try again.");
        }
      }}
    >
      {FIELDS.map((field) => (
        <TextField
          key={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          required
          fullWidth
          inputProps={{ "aria-label": field.aria }}
          sx={FIELD_SX}
        />
      ))}
      <TextField
        name="message"
        placeholder="YOUR MESSAGE"
        required
        fullWidth
        multiline
        minRows={4}
        inputProps={{ "aria-label": "Message" }}
        sx={FIELD_SX}
      />
      <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        />
      </Box>
      <Button
        type="submit"
        disableElevation
        sx={{ ...NB_BUTTON_SX, width: "100%", py: 1.75, fontSize: 14 }}
      >
        SEND IT →
      </Button>
    </Box>
  );
}
