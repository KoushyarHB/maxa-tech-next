import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function PersonalData() {
  return (
    <Box>
      <Stack direction={"column"} mb={"24px"}>
        <Typography sx={{ fontSize: "20px", fontWeight: "500", mb: "8px" }}>
          Identification
        </Typography>
        <Typography sx={{ fontSize: "16px", fontWeight: "300" }}>
          Verify your identity
        </Typography>
      </Stack>
      <Grid sx={{ width: "808px" }} container spacing={2}>
        <Grid item xs={6}>
          <Stack direction={"column"}>
            <Typography
              sx={{
                ml: "19px",
                fontSize: "14px",
                fontWeight: "300",
                color: "#717171",
              }}
            >
              Full Name:
            </Typography>
            {/* <Box
              fullwidth
              sx={{
                height: "72px",
                backgroundColor: "#F6F6F6",
                borderRadius: "8px",
              }}
            ></Box> */}
          </Stack>
        </Grid>
        <Grid item xs={6}>
          2
        </Grid>
        <Grid item xs={6}>
          3
        </Grid>
        <Grid item xs={6}>
          4
        </Grid>
        <Grid item xs={6}>
          5
        </Grid>
        <Grid item xs={6}>
          6
        </Grid>
      </Grid>
    </Box>
  );
}
