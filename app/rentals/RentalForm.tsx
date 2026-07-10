"use client";

import { useRef, FormEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { rentalEquipment } from "./data";
import {
  ACCENT,
  INK,
  NB_BORDER,
  NB_BUTTON_SX,
  SURFACE,
  nbShadow,
} from "@/lib/theme";

export default function RentalForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const handleEquipmentChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedEquipment(typeof value === "string" ? value.split(",") : value);
  };

  const inputStyles = {
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
    // Resting labels sit inside the white input; shrunk labels float over
    // the dark page background, so they flip to light.
    "& .MuiInputLabel-root": {
      color: "rgba(17,17,17,0.7)",
    },
    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
      color: "rgba(243,237,226,0.85)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: ACCENT,
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 4, md: 8 },
        py: 6,
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: "40px", md: "60px", lg: "70px" },
          marginBottom: "15px",
          justifyContent: "center",
          display: "flex",
          color: "white",
          whiteSpace: "nowrap",
        }}
      >
        Request a Rental
      </Typography>

      <Typography
        variant="body2"
        component="p"
        sx={{
          fontSize: { sm: "18px", md: "22px", lg: "26px" },
          display: "flex",
          textAlign: "center",
          maxWidth: 900,
          marginBottom: "30px",
          color: "white",
        }}
      >
        Fill out the form below to request rental equipment for your production.
        We&apos;ll get back to you shortly!
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
            startDate: HTMLInputElement;
            endDate: HTMLInputElement;
            projectDescription: HTMLTextAreaElement;
          };

          const formData = {
            recaptchaToken: captchaValue,
            name: formElements.name.value,
            instagram: formElements.instagram.value,
            email: formElements.email.value,
            equipmentDesired: selectedEquipment,
            rentalStartDate: formElements.startDate.value,
            rentalEndDate: formElements.endDate.value,
            projectDescription: formElements.projectDescription.value,
            formType: "rental", // Identify this as a rental request
          };

          try {
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });

            if (response.ok) {
              alert("Thank you! Your rental request has been sent.");
              form.reset();
              setSelectedEquipment([]);
              recaptchaRef.current?.reset();
            } else {
              throw new Error("Failed to send request");
            }
          } catch {
            alert("An error occurred. Please try again.");
          }
        }}
      >
        {/* Name */}
        <TextField
          name="name"
          placeholder="NAME"
          required
          fullWidth
          inputProps={{ "aria-label": "Name" }}
          sx={inputStyles}
        />

        {/* Instagram */}
        <TextField
          name="instagram"
          placeholder="INSTAGRAM"
          required
          fullWidth
          inputProps={{ "aria-label": "Instagram" }}
          sx={inputStyles}
        />

        {/* Email */}
        <TextField
          name="email"
          type="email"
          placeholder="EMAIL"
          required
          fullWidth
          inputProps={{ "aria-label": "Email" }}
          sx={inputStyles}
        />

        {/* Equipment Desired - Dropdown */}
        <FormControl fullWidth sx={inputStyles}>
          <InputLabel id="equipment-label">EQUIPMENT DESIRED</InputLabel>
          <Select
            labelId="equipment-label"
            multiple
            value={selectedEquipment}
            onChange={handleEquipmentChange}
            label="EQUIPMENT DESIRED"
            required
            inputProps={{ "aria-label": "Equipment Desired" }}
          >
            {rentalEquipment.map((item) => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Rental Timeframe - Start and End Date */}
        <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          <TextField
            name="startDate"
            type="datetime-local"
            required
            fullWidth
            label="RENTAL START DATE"
            InputLabelProps={{ shrink: true }}
            inputProps={{ "aria-label": "Rental Start Date" }}
            sx={inputStyles}
          />
          <TextField
            name="endDate"
            type="datetime-local"
            required
            fullWidth
            label="RENTAL END DATE"
            InputLabelProps={{ shrink: true }}
            inputProps={{ "aria-label": "Rental End Date" }}
            sx={inputStyles}
          />
        </Box>

        {/* Project Description */}
        <TextField
          name="projectDescription"
          placeholder="DESCRIPTION OF PROJECT"
          required
          fullWidth
          multiline
          minRows={4}
          inputProps={{ "aria-label": "Project Description" }}
          sx={inputStyles}
        />

        {/* ReCAPTCHA */}
        <Box sx={{ mb: 1, display: "flex", justifyContent: "center" }}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          />
        </Box>

        {/* Submit Button */}
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
            ...NB_BUTTON_SX,
          }}
        >
          SUBMIT RENTAL REQUEST
        </Button>
      </Box>
    </Box>
  );
}
