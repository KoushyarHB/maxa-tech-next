import { Box } from "@mui/material";
import React from "react";
import TabTitle from "../../tab-title";
import key from "@/assets/images/security-and-access-icons/key.svg";
import call from "@/assets/images/security-and-access-icons/call.svg";
import edit from "@/assets/images/security-and-access-icons/edit.svg";

export default function SecurityAndAccess() {
  return (
    <Box>
      <TabTitle
        firstTitle={"Security settings"}
        secondTitle={"Change password and phone number"}
      />
      <Box display={"flex"} gap={"24px"}>
        <Box
          marginBottom={"24px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"392px"}
          height={"72px"}
          borderRadius={"8px"}
          sx={{ backgroundColor: "#f6f6f6" }}
        >
          <Box width={"360px"} height={"24px"} display={"flex"} gap={"8px"}>
            <Box component={"img"} src={key.src} />
            <Box
              component={"input"}
              placeholder="Password"
              sx={{ backgroundColor: "#f6f6f6", ":focus": { outline: "none" } }}
              flexGrow={1}
            ></Box>
            <Box component={"img"} src={edit.src} />
          </Box>
        </Box>
        <Box
          marginBottom={"24px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"392px"}
          height={"72px"}
          borderRadius={"8px"}
          sx={{ backgroundColor: "#f6f6f6" }}
        >
          <Box width={"360px"} height={"24px"} display={"flex"} gap={"8px"}>
            <Box component={"img"} src={call.src} />
            <Box
              component={"input"}
              placeholder="Phone number"
              sx={{ backgroundColor: "#f6f6f6", ":focus": { outline: "none" } }}
              flexGrow={1}
            ></Box>
            <Box component={"img"} src={edit.src} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
