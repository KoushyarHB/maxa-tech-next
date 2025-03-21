import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import edit from "@/assets/images/personal-data-icons/edit.svg";
import EditPersonalDataModal from "../edit-modal";
import useModalStore from "@/stores/useModalStore";

type PersonalDataFieldProps = {
  title: string;
  icon: any;
  data: any;
  fieldType: string;
};

export default function PersonalDataField({
  title,
  icon,
  data,
  fieldType,
}: PersonalDataFieldProps) {
  const { setOpen, setModalTitle, setModalType } = useModalStore();
  const handleOpen = () => {
    setOpen(true);
    setModalTitle(title);
    setModalType(fieldType);
  };

  return (
    <Box>
      <Stack direction={"column"}>
        <Typography
          sx={{
            ml: "19px",
            fontSize: "14px",
            fontWeight: "300",
            color: "#717171",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "72px",
            backgroundColor: "#F6F6F6",
            borderRadius: "8px",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ px: "16px", py: "24px" }}
          >
            <Box sx={{ mr: "8px" }} component={"img"} src={icon.src} />
            <Box
              sx={{
                flexGrow: 1,
                color: "#717171",
                fontSize: "16px",
                fontWeight: "300",
              }}
            >
              {data}
            </Box>
            <Box onClick={handleOpen} component={"img"} src={edit.src} />
          </Stack>
        </Box>
      </Stack>
      <EditPersonalDataModal />
    </Box>
  );
}
