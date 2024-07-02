import UserOrder from "@/components/checkout/components/user-order/UserOrder";
import StepperComponent from "@/components/shared/stepper";
import useTabStore from "@/stores/useTabStore";
import { Box, Stack } from "@mui/material";
import PaymentInfo from "./payment-info/PaymentInfo";
import { usePlaceOrderMutation } from "../hooks";

export default function Payment() {
  const { setTab } = useTabStore();
  const placeOrder = usePlaceOrderMutation();
  const handleGoTo = () => {
    placeOrder.mutate();
    setTab("Orders");
  };

  return (
    <Box>
      <Box
        marginY={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <StepperComponent activeStepNumber={2} />
      </Box>
      <Stack direction={"row"} justifyContent={"space-between"} mb={6}>
        <PaymentInfo />
        <UserOrder
          link={"account"}
          action={handleGoTo}
          buttonText="Place Order"
        />
      </Stack>
    </Box>
  );
}
