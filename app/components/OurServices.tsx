import { Box, Typography } from "@mui/material";

export default function OurServices() {
  return (
    <Box
      component="section"
      id="services"
      sx={{
        width: "100%",
        mb: 2,
        px: { xs: 2, md: 8 },
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        color="white"
        sx={{
          fontSize: { xs: "24px", sm: "45px", lg: "50px" },
          fontWeight: "bold",
          marginBottom: "15px",
          paddingLeft: "10px",
          paddingRight: "10px",
          justifyContent: "flex-start",
          display: "flex",
        }}
      >
        Our Services
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: { xs: 2, sm: 4 },
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(4, minmax(0, 1fr))",
          },
          px: 1,
        }}
      >
        {[
          "FABRICATION",
          "SET DESIGN",
          "CONSULTING",
          "PRODUCTION DESIGN",
        ].map((label) => (
          <Box
            key={label}
            sx={{
              aspectRatio: "1 / 1",
              borderRadius: 4,
              bgcolor: "#222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              boxShadow: 3,
              border: "2px solid #333",
              overflow: "hidden",
              transition: "transform 150ms ease, border-color 150ms ease",
              "&:hover": {
                transform: "translateY(-2px)",
                borderColor: "rgba(255,255,255,0.5)",
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                px: 2,
                color: "rgba(255,255,255,0.85)",
                fontWeight: 800,
                letterSpacing: "0.12em",
                fontSize: { xs: 12, sm: 14, md: 16 },
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

