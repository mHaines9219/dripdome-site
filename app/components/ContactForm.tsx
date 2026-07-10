"use client";

import { useRef, FormEvent } from "react";
import { Box, Button, TextField } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { sendData } from "@/hooks/sendData";
import {
  ACCENT,
  INK,
  NB_BORDER,
  NB_BUTTON_SX,
  SURFACE,
  nbShadow,
} from "@/lib/theme";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: SURFACE,
    color: INK,
    borderRadius: 0,
    transition: "box-shadow 120ms ease",
    "& fieldset": { border: NB_BORDER },
    "&:hover fieldset": { border: NB_BORDER },
    "&.Mui-focused fieldset": { border: `3px solid ${ACCENT}` },
    "&.Mui-focused": { boxShadow: nbShadow(4) },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(17,17,17,0.6)",
    opacity: 1,
  },
} as const;

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
        mb: 4,
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
      <TextField
        name="name"
        placeholder="NAME"
        required
        fullWidth
        inputProps={{ "aria-label": "Name" }}
        sx={inputSx}
      />
      <TextField
        name="instagram"
        placeholder="INSTAGRAM"
        required
        fullWidth
        inputProps={{ "aria-label": "Instagram" }}
        sx={inputSx}
      />
      <TextField
        name="email"
        type="email"
        placeholder="EMAIL"
        required
        fullWidth
        inputProps={{ "aria-label": "Email" }}
        sx={inputSx}
      />
      <TextField
        name="referral"
        placeholder="HOW DID YOU HEAR ABOUT US?"
        required
        fullWidth
        inputProps={{ "aria-label": "How did you hear about us" }}
        sx={inputSx}
      />
      <TextField
        name="message"
        placeholder="YOUR MESSAGE"
        required
        fullWidth
        multiline
        minRows={4}
        inputProps={{ "aria-label": "Message" }}
        sx={inputSx}
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
        disableElevation
        sx={{
          alignSelf: "center",
          px: 4,
          py: 1.5,
          width: "80dvw",
          maxWidth: 900,
          letterSpacing: "0.08em",
          ...NB_BUTTON_SX,
        }}
      >
        SEND
      </Button>
    </Box>
  );
}
