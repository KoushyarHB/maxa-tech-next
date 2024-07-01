import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Error_Image from "@/assets/images/error/error_404.gif";
import Link from "next/link";

function ErrorPageNotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f7f6f6",
      }}
    >
      <Box component="img" src={Error_Image.src} alt="error image" />
      <Typography
        sx={{ fontSize: "40px", color: "#e5472f" }}
      >
        oops ! Page Not Found
      </Typography>
      <Typography
        sx={{
          fontSize: "20px",
         
          width: "50%",
          textAlign: "center",
        }}
      >
        The page you are looking for was not found You can return to the main
        page using the button below...
      </Typography>
      <Button
        variant="outlined"
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          my: "40px",
          ":hover": { background: "#1976d2", color: "white" },
          borderRadius: "8px",
        }}
      >
        <Link href={"/"}>Go To Home</Link>
      </Button>
    </Box>
  );
}

export default ErrorPageNotFound;
