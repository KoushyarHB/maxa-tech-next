import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import maxaTech from "@/assets/images/maxatech.png";

export default function Hero() {
  return (
    <Container disableGutters>
      <Box
        sx={{
          marginBottom: "48px",
          display: "flex",
          justifyContent: "space-between",
          p: 1,
          flexDirection: "row",
        }}
      >
        <Stack direction="column" sx={{ marginTop: "50px" }}>
          <Typography
            sx={{ fontSize: "64px", fontWeight: 600 }}
            variant="h1"
            component="h1"
            gutterBottom
          >
            MAXA Tech
          </Typography>
          <Typography
            sx={{ fontSize: "32px", marginTop: "50px" }}
            variant="h2"
            component="h2"
          >
            &quot;Join the{" "}
            <span style={{ color: "#F45E0C" }}>digital revolution</span>&quot;
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#F45E0C",
              marginTop: "110px",
              py: 2,
              width: "228px",
              ":hover": {
                backgroundColor: "#F68242",
              },
            }}
          >
            Explore More
          </Button>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Image src={maxaTech.src} alt="maxa tech" width={728} height={443} />
        </Box>
      </Box>
    </Container>
  );
}
