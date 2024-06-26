import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useCalculateTotal } from "@/layout/navbar/hooks";

export default function PaymentDetails() {
  const { data: total } = useCalculateTotal();
  const shipmentCost = 22.5;
  const subtotal = total ? total[0] : 0;
  const discount = total ? total[1] : 0;
  const grandTotal = total ? total[2] : 0;
  return (
    <Card
      sx={{
        width: "416px",
        height: "267px",
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography fontSize={"24px"} fontWeight={"500"} mb={2.5}>
          Payment Details
        </Typography>
        <Stack
          direction={"column"}
          gap={0.5}
          fontSize={"14px"}
          fontWeight={"00"}
        >
          <Stack direction={"row"} justifyContent="space-between">
            <Typography fontSize={"14px"} fontWeight={"300"} color={"#717171"}>
              Subtotal
            </Typography>
            <Typography fontSize={"14px"} fontWeight={"300"} color={"#444444"}>
              ${subtotal}
            </Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between">
            <Typography fontSize={"14px"} fontWeight={"300"} color={"#717171"}>
              Discount
            </Typography>
            <Typography fontSize={"14px"} fontWeight={"300"} color={"#444444"}>
              - ${discount}
            </Typography>
          </Stack>
          <Stack direction={"row"} justifyContent="space-between">
            <Typography fontSize={"14px"} fontWeight={"300"} color={"#717171"}>
              Shipment Cost
            </Typography>
            <Typography fontSize={"14px"} fontWeight={"300"} color={"#444444"}>
              $22.5
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ borderBottom: "1px solid #CBCBCB" }} my={0.75}></Box>
        <Stack direction={"row"} justifyContent="space-between">
          <Typography fontSize={"16px"} fontWeight={"500"}>
            Grand Total
          </Typography>
          <Typography fontSize={"16px"} fontWeight={"500"}>
            ${grandTotal + shipmentCost}
          </Typography>
        </Stack>
        <Button
          variant="contained"
          sx={{ mt: "25px", py: "10px", fontSize: "16px", fontWeight: "400" }}
        >
          Procced to checkout
        </Button>
      </CardContent>
    </Card>
  );
}
