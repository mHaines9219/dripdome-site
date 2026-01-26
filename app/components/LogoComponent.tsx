import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";

export default function LogoComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "25vh",
      }}
    >
      <Image
        src="/assets/mobile_logo_1.png"
        alt="logos"
        width={750}
        height={300}
        style={{ objectFit: "cover" }}
      />
    </Box>
  );
}
