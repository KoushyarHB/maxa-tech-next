import useOrderTabStore from "@/stores/useOrderTabStore";
import { Box, Stack } from "@mui/material";
import React from "react";

type OrderTabTitleProps = {
  title: string;
};

export default function OrderTabTitle({ title }: OrderTabTitleProps) {
  const { orderTab, setOrderTab } = useOrderTabStore();
  const handleTabChange = (str: string) => {
    setOrderTab(str);
  };

  return (
    <Stack
      onClick={() => {
        handleTabChange(title);
      }}
      direction={"row"}
      alignItems={"center"}
      sx={{
        borderBottom: `solid 4px ${title === orderTab ? "#0C68F4" : "#EDEDED"}`,
        cursor: "pointer",
        pb: "4px",
      }}
    >
      <Box
        sx={{
          mr: "8px",
          color: title === orderTab ? "#0C68F4" : "inherit",
        }}
      >
        {title}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "25px",
          height: "25px",
          borderRadius: "100%",
          padding: "5px",
          backgroundColor: title === orderTab ? "#0C68F4" : "#EDEDED",
          color: title === orderTab ? "white" : "inherit",
        }}
      >
        0
      </Box>
    </Stack>
  );
}
