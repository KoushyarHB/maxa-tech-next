import UserOrder from "@/components/checkout/components/user-order/UserOrder";
import { useGetCartItems } from "@/layout/navbar/hooks";
import { fetchIdCookie, getCartItemDetails } from "@/layout/navbar/services";
import useTabStore from "@/stores/useTabStore";
import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import PaymentInfo from "./payment-info/PaymentInfo";
import StepperComponent from "@/components/shared/stepper";

export default function Payment() {
  const userId = fetchIdCookie();
  const { data: cartItems } = useGetCartItems(Number(userId));
  const { setTab } = useTabStore();

  const handleGoTo = () => {
    setTab("Orders");
  };

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
