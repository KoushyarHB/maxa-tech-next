import StepperComponent2 from "@/components/shared/stepper2";
import { useGetCartItems } from "@/layout/navbar/hooks";
import { fetchIdCookie, getCartItemDetails } from "@/layout/navbar/services";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import UserInfo from "./user-info/UserInfo";
import UserOrder from "./user-order/UserOrder";
import StepperComponent from "@/components/shared/stepper";

export default function Checkout() {
  const userId = fetchIdCookie();
  const { data: cartItems } = useGetCartItems(Number(userId));

  const shipment = 22.5;
  useEffect(() => {
    let newSubtotal = 0;
    let newDiscount = 0;
    let newGrandTotal = 0;
    cartItems?.map((item: any) => {
      getCartItemDetails(item.productId).then((productDetail) => {
        newDiscount +=
          (productDetail.discount.percent * productDetail.price) / 100;
        newSubtotal += productDetail.price;
        newGrandTotal += newSubtotal - newDiscount + shipment;
      });
    });
  }, [cartItems]);

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
