import Card from "@/components/shared/card/components";
import CartItem from "@/components/shared/cart-item/CartItem";
import { useGetCartItems } from "@/layout/navbar/hooks";
import { fetchIdCookie } from "@/layout/navbar/services";
import { Box, Button, CardContent, Stack, Typography } from "@mui/material";
import { useGetProduct } from "../hooks";
import PaymentDetails from "./payment-details/PaymentDetails";
import StepperComponent from "@/components/shared/stepper";
import Link from "next/link";

export default function Cart() {
  const { data: randomProducts } = useGetProduct();
  const userId = fetchIdCookie();
  const { data: cartItems } = useGetCartItems(Number(userId));

  return (
    <Box>
      <Box
        marginY={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <StepperComponent activeStepNumber={0} />
      </Box>
      <Stack direction={"column"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"column"} spacing={2} mb={6}>
            {cartItems?.map((item: any) => (
              <CartItem
                key={item.productId}
                cartItemProps={item}
                changeComponent="account"
              />
            ))}
          </Stack>
          <Stack>
            <Box
              sx={{
                width: "416px",
                height: "267px",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "8px",
              }}
            >
              <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                <Typography fontSize={"24px"} fontWeight={"500"} mb={2.5}>
                  Payment Details
                </Typography>
                <PaymentDetails />
                <Link href="/checkout">
                  <Button
                    variant="contained"
                    sx={{
                      width: "100%",
                      mt: "25px",
                      py: "10px",
                      fontSize: "16px",
                      fontWeight: "400",
                      textTransform: "none",
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Box>
          </Stack>
        </Stack>
        <Stack direction={"column"}>
          <Typography fontSize={"20px"} fontWeight={"500"}>
            Customers who viewed items in your browsing history also viewed
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            marginY={6}
          >
            {randomProducts?.map((item) => (
              <Card
                key={item.productId}
                cardProps={item}
                hoverMode={{ hoverMode: "productHover" }}
              />
            ))}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
