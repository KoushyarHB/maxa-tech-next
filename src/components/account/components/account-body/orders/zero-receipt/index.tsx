import zeroReceipt from "@/assets/images/0 Receipt.png";
import { Box } from "@mui/material";

export default function ZeroReceipt() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: "74px",
      }}
    >
      <Box component={"img"} src={zeroReceipt.src}></Box>
    </Box>
  );
}
