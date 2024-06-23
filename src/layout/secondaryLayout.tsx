import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import Navbar from "./navbar/components";

type LayoutProps = { children: ReactNode };

export default function SecondaryLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          px: "108px",
        }}
      >
        {children}
      </Box>
    </>
  );
}
