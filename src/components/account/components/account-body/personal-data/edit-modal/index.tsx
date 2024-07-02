import closeCircle from "@/assets/images/close-circle.png";
import { useGetUserInfo, useUpdateUserInfo } from "@/components/account/hooks";
import { updateUserInfo } from "@/components/account/services";
import useModalStore from "@/stores/useModalStore";
import { Button, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FormEvent } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 392,
  height: 310,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 0,
  p: 4,
};

export default function EditPersonalDataModal() {
  const { data } = useGetUserInfo();
  const updateMutation = useUpdateUserInfo();
  const { open, setOpen, modalTitle, modalType } = useModalStore();
  const handleClose = () => setOpen(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValue = formData.get(modalType);
    console.log("Form value:", formValue);
    updateMutation.mutate({ newData: formValue, modalType });
    handleClose();
  };

  let defaultValue = "";
  switch (modalType) {
    case "userName":
      defaultValue = data?.userName;
      break;
    case "email":
      defaultValue = data?.email;
      break;
    case "password":
      defaultValue = data?.password;
      break;
    case "address":
      defaultValue = data?.address;
      break;
    case "postalCode":
      defaultValue = data?.postalCode;
      break;
    case "phoneNumber":
      defaultValue = data?.phoneNumber;
      break;
    default:
      defaultValue = "";
      break;
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 100,
          sx: { backgroundColor: "rgba(0, 0, 0, 0.09)" },
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box sx={{ display: "flex", mb: "10px" }}>
            <Box flexGrow={1}></Box>
            <Box
              onClick={handleClose}
              component={"img"}
              src={closeCircle.src}
            />
          </Box>
          <Typography
            sx={{ mb: "32px" }}
            id="transition-modal-title"
            variant="h6"
            component="h2"
          >
            {`You can edit your ${modalTitle
              .split(" ")
              .map((item) => item.toLowerCase())
              .join(" ")}:`}
          </Typography>
          <Box onSubmit={handleSubmit} component="form" noValidate>
            <TextField
              margin="none"
              sx={{ height: "48px", mb: "32px" }}
              fullWidth
              name={modalType}
              label={modalTitle}
              defaultValue={defaultValue}
              autoFocus
            />
            <Box sx={{ display: "flex" }}>
              <Box flexGrow={1}></Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "162px",
                  height: "48px",
                  textTransform: "none",
                  borderRadius: "8px",
                  backgroundColor: "#0C68F4",
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
