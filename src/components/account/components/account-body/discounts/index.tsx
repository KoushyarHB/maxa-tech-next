import { Box, Typography } from "@mui/material";
import React from "react";
import TabTitle from "../../tab-title";
import eye from "@/assets/images/eye.svg";

export default function Discounts() {
  return (
    <Box>
      <TabTitle
        firstTitle={"Discounts & Vouchers"}
        secondTitle={"Add discount code to apply a discount in your purchase"}
      />
      <Box
        marginY={"24px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"392px"}
        height={"72px"}
        borderRadius={"8px"}
        sx={{ backgroundColor: "#f6f6f6" }}
      >
        <Box width={"360px"} height={"24px"} display={"flex"}>
          <Box
            component={"input"}
            placeholder="label"
            sx={{ backgroundColor: "#f6f6f6", ":focus": { outline: "none" } }}
            flexGrow={1}
          ></Box>
          <Box component={"img"} src={eye.src} />
        </Box>
      </Box>
      <Typography fontWeight={"300"} fontSize={"16px"} color={"#717171"}>
        Where can I find the discount code ?
      </Typography>
    </Box>
  );
}
