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
  "& .MuiInputLabel-root": {
    fontFamily: FONT_MONO,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: NB_COLORS.steel,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: NB_COLORS.ink,
  },
  "& .MuiSvgIcon-root": {
    color: NB_COLORS.ink,
  },
} as const;

const MENU_PROPS = {
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
        letterSpacing: "0.04em",
      },
      "& .MuiMenuItem-root.Mui-selected": {
        bgcolor: NB_COLORS.silverLight,
      },
      "& .MuiMenuItem-root.Mui-selected:hover": {
        bgcolor: NB_COLORS.silverLight,
      },
    },
  },
} as const;

const DETAILS = [
  { label: "MIN RENTAL PERIOD", value: "1 WEEK" },
  { label: "PICKUP / DELIVERY", value: "NEW YORK CITY" },
  { label: "RESPONSE TIME", value: "WITHIN 48 HOURS" },
];

export default function RentalForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatusState>(null);

  const handleEquipmentChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedEquipment(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box component="section" sx={{ bgcolor: NB_COLORS.paper }}>
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
            RENTAL INTAKE · FORM R
          </Typography>
          <Typography
            variant="h2"
            sx={{
              ...NB_DISPLAY_SX,
              fontSize: { xs: 40, sm: 56, lg: 72 },
              color: NB_COLORS.ink,
              mb: 1,
            }}
          >
            REQUEST
          </Typography>
          <Typography
            sx={{
              ...NB_OUTLINE_TEXT_SX,
              fontSize: { xs: 40, sm: 56, lg: 72 },
              mb: 3,
            }}
          >
            A RENTAL.
          </Typography>
          <Typography
            sx={{ fontSize: { xs: 15, md: 17 }, color: NB_COLORS.ink, maxWidth: 420, mb: 4 }}
          >
            Fill out the form below to request rental equipment for your
            production. We&apos;ll get back to you shortly!
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
                  setStatus({
                    type: "success",
                    message: "RENTAL REQUEST RECEIVED. WE REPLY WITHIN 48 HOURS.",
                  });
                  form.reset();
                  setSelectedEquipment([]);
                  recaptchaRef.current?.reset();
                } else {
                  throw new Error("Failed to send request");
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
            {/* Name */}
            <Box>
              <Typography component="label" htmlFor="rental-name" sx={NB_FIELD_LABEL_SX}>
                NAME
              </Typography>
              <TextField id="rental-name" name="name" required fullWidth sx={FIELD_SX} />
            </Box>

            {/* Instagram */}
            <Box>
              <Typography component="label" htmlFor="rental-instagram" sx={NB_FIELD_LABEL_SX}>
                INSTAGRAM
              </Typography>
              <TextField
                id="rental-instagram"
                name="instagram"
                required
                fullWidth
                sx={FIELD_SX}
              />
            </Box>

            {/* Email */}
            <Box>
              <Typography component="label" htmlFor="rental-email" sx={NB_FIELD_LABEL_SX}>
                EMAIL
              </Typography>
              <TextField
                id="rental-email"
                name="email"
                type="email"
                required
                fullWidth
                sx={FIELD_SX}
              />
            </Box>

            {/* Equipment Desired - Dropdown */}
            <FormControl fullWidth sx={FIELD_SX}>
              <InputLabel id="equipment-label">EQUIPMENT DESIRED</InputLabel>
              <Select
                labelId="equipment-label"
                multiple
                value={selectedEquipment}
                onChange={handleEquipmentChange}
                label="EQUIPMENT DESIRED"
                required
                inputProps={{ "aria-label": "Equipment Desired" }}
                MenuProps={MENU_PROPS}
              >
                {rentalEquipment.map((item) => (
                  <MenuItem key={item.name} value={item.name}>
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
                sx={FIELD_SX}
              />
              <TextField
                name="endDate"
                type="datetime-local"
                required
                fullWidth
                label="RENTAL END DATE"
                InputLabelProps={{ shrink: true }}
                inputProps={{ "aria-label": "Rental End Date" }}
                sx={FIELD_SX}
              />
            </Box>

            {/* Project Description */}
            <Box>
              <Typography
                component="label"
                htmlFor="rental-description"
                sx={NB_FIELD_LABEL_SX}
              >
                DESCRIPTION OF PROJECT
              </Typography>
              <TextField
                id="rental-description"
                name="projectDescription"
                required
                fullWidth
                multiline
                minRows={4}
                sx={FIELD_SX}
              />
            </Box>

            {/* ReCAPTCHA */}
            <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
              <ReCAPTCHA
                ref={recaptchaRef}
                theme="dark"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              />
            </Box>

            <FormStatus status={status} />

            {/* Submit Button */}
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
              {submitting ? "SENDING..." : "SUBMIT RENTAL REQUEST"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
