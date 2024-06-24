import { Stack, Typography } from "@mui/material";
import React from "react";

type TabTitleProps = {
  firstTitle: string;
  secondTitle: string;
};

export default function TabTitle({ firstTitle, secondTitle }: TabTitleProps) {
  return (
    <Stack direction={"column"} mb={"24px"}>
      <Typography sx={{ fontSize: "20px", fontWeight: "500", mb: "8px" }}>
        {firstTitle}
      </Typography>
      <Typography sx={{ fontSize: "16px", fontWeight: "300" }}>
        {secondTitle}
      </Typography>
    </Stack>
  );
}
