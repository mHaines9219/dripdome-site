import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function ProjectsContributed() {
  return (
    <Box
      sx={{
        zIndex: 10,
        width: "100%",
        // border: "1px solid white",
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
          justifyContent: { xs: "center" },
          display: "flex",
          zIndex: 10,
          mt: { xs: 4, md: 8 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        Projects We&apos;ve Contributed To
      </Typography>
      <Box
        sx={{
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: { xs: 2, sm: 3, md: 4 },
          justifyItems: "center",
          px: 1,
        }}
      >
        {[
          "biw.png",
          "ccw.png",
          "googtrans.png",
          "paperw.png",
          "phw.png",
          "sunny2.png",
        ].map((logo) => (
          <Box
            key={logo}
            sx={{
              width: "100%",
              maxWidth: { xs: 100, sm: 150, md: 200, lg: 250 },
              aspectRatio: "1 / 1",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              p: { xs: 1, sm: 2 },
            }}
          >
            <Image
              src={`/logos/${logo}`}
              alt={logo.replace(".png", "")}
              width={250}
              height={250}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
