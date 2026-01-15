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
          justifyContent: "flex-start",
          display: "flex",
          zIndex: 10,
        }}
      >
        Projects We've Contributed To{" "}
      </Typography>
      <Box
        sx={{
          zIndex: 10,
          flexWrap: "wrap",
          gap: { xs: 2, sm: 4 },
          display: "grid",
          justifyItems: "center",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          justifyContent: { xs: "center", sm: "flex-start" },
          px: 1,
        }}
      >
        {[
          "bitrans.png",
          "cctrans.png",
          "googtrans.png",
          "paper.png",
          "phlogo.png",
          "sunnydtrans.png",
        ].map((logo) => (
          <Box
            key={logo}
            sx={{
              width: { xs: 120, sm: 170, md: 200 },
              height: { xs: 120, sm: 170, md: 200 },
              borderRadius: 4,
              // bgcolor: "#222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // boxShadow: 3,
              // border: "2px solid #333",
              overflow: "hidden",
              p: 2,
            }}
          >
            <Image
              src={`/logos/${logo}`}
              alt={logo.replace(".png", "")}
              width={100}
              height={100}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

