import { useCalculateTotal } from "@/layout/navbar/hooks";
import useGrandTotalStore from "@/stores/useGrandTotalStore";
import useShipmentCostStore from "@/stores/useShipmentCostStore";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

export default function PaymentDetails() {
  const { data: total } = useCalculateTotal();
  const { shipmentCost } = useShipmentCostStore();
  const { grandTotal, setGrandTotal } = useGrandTotalStore();
  const subtotal = total ? total[0] : 0;
  const discount = total ? total[1] : 0;
  const grandTotalBeforeShipment = total ? total[2] : 0;

  useEffect(() => {
    setGrandTotal(grandTotalBeforeShipment + shipmentCost);
  }, [grandTotalBeforeShipment, shipmentCost, setGrandTotal]);

  return (
    <Box sx={{ px: "8px" }}>
      <Stack direction={"column"} gap={0.5} fontSize={"14px"} fontWeight={"00"}>
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
            ${shipmentCost}
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ borderBottom: "1px solid #CBCBCB" }} my={0.75}></Box>
      <Stack direction={"row"} justifyContent="space-between">
        <Typography fontSize={"16px"} fontWeight={"500"}>
          Grand Total
        </Typography>
        <Typography fontSize={"16px"} fontWeight={"500"}>
          ${grandTotal}
        </Typography>
      </Stack>
    </Box>
  );
}
