import { Box } from "@mui/material";
import React from "react";
import TabTitle from "../../tab-title";

export default function Notifications() {
  return (
    <Box>
      <TabTitle
        firstTitle={"Notifications"}
        secondTitle={"Manage your notification settings"}
      />
    </Box>
  );
}
