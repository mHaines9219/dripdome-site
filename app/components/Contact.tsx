"use client";

import { useRef, FormEvent } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Footer from "../ui/Footer";
import { sendData } from "@/hooks/sendData";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  return (
    <>
      <Box sx={{ mx: { xs: 2, md: 8, lg: 24 } }}>
        <Typography
          variant="h2"
          component="h2"
          color="primary"
          sx={{
            fontSize: { xs: "50px", md: "80px", lg: "90px" },
            fontWeight: "bold",
            marginBottom: "15px",
            justifyContent: "center",
            display: "flex",
            whiteSpace: "nowrap",
          }}
        >
          CONTACT US
        </Typography>

        <Typography
          variant="body1"
          component="p"
          color="primary"
          sx={{
            fontSize: { sm: "20px", md: "25px", lg: "30px" },
            display: "flex",
            textAlign: "center",
            marginBottom: "30px",
            fontFamily: "Open Sans",
          }}
        >
          BIG OR SMALL, EVERY IDEA HAS THE POTENTIAL TO SHINE. TELL US ABOUT
          YOUR PROJECT AND LET&apos;S BUILD SOMETHING AMAZING!
        </Typography>
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
              message: HTMLTextAreaElement;
            };

            const formData = {
              recaptchaToken: captchaValue,
              name: formElements.name.value,
              instagram: formElements.instagram.value,
              email: formElements.email.value,
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
            sx={{
              "& .MuiInputBase-root": { bgcolor: "white", color: "black" },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(0,0,0,0.7)",
                opacity: 1,
              },
            }}
          />
          <TextField
            name="instagram"
            placeholder="INSTAGRAM"
            required
            fullWidth
            inputProps={{ "aria-label": "Instagram" }}
            sx={{
              "& .MuiInputBase-root": { bgcolor: "white", color: "black" },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(0,0,0,0.7)",
                opacity: 1,
              },
            }}
          />
          <TextField
            name="email"
            type="email"
            placeholder="EMAIL"
            required
            fullWidth
            inputProps={{ "aria-label": "Email" }}
            sx={{
              "& .MuiInputBase-root": { bgcolor: "white", color: "black" },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(0,0,0,0.7)",
                opacity: 1,
              },
            }}
          />
          <TextField
            name="message"
            placeholder="YOUR MESSAGE"
            required
            fullWidth
            multiline
            minRows={4}
            inputProps={{ "aria-label": "Message" }}
            sx={{
              "& .MuiInputBase-root": { bgcolor: "white", color: "black" },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(0,0,0,0.7)",
                opacity: 1,
              },
            }}
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
            sx={{
              alignSelf: "flex-start",
              px: 4,
              py: 1.5,
              fontWeight: 700,
              bgcolor: "#16a34a",
              "&:hover": { bgcolor: "#1d4ed8" },
            }}
          >
            SEND
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
