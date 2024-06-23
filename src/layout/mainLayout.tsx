import React, { ReactNode } from "react";
import Footer from "./footer";
import Navbar from "./navbar/components";
import { Box } from "@mui/material";

type LayoutProps = { children: ReactNode };

export default function MainLayout({ children }: LayoutProps) {
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
      <Footer />
    </>
  );
}
