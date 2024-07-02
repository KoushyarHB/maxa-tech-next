import StepperComponent from "@/components/shared/stepper";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import UserInfo from "./user-info/UserInfo";
import UserOrder from "./user-order/UserOrder";

export default function Checkout() {
  return (
    <Box>
      <Box
        marginY={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <StepperComponent activeStepNumber={1} />
      </Box>
      <Stack direction={"row"} justifyContent={"space-between"} mb={6}>
        <UserInfo />
        <UserOrder link="/payment" buttonText="Continue to Pay" />
      </Stack>
    </Box>
  );
}
