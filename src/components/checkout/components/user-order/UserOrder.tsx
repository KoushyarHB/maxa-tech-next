import CartItem from "@/components/shared/cart-item/CartItem";
import { useGetCartItems } from "@/layout/navbar/hooks";
import { fetchIdCookie } from "@/layout/navbar/services";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import PaymentDetails from "@/components/cart/components/payment-details/PaymentDetails";
import Link from "next/link";
import { discountCodeType } from "../../hook/type";

type ButtonProps = {
  link: string;
  action?: () => void;
  buttonText: string;
};

export default function UserOrder({ link, action, buttonText }: ButtonProps) {
  const userId = fetchIdCookie();
  const { data: cartItems } = useGetCartItems(Number(userId));
  const [discountCodeInput, setDiscountCodeInput] = useState<string>("");

  // const discountCode: discountCodeType = {
  //   bronze: "10",
  //   silver: "20",
  //   gold: "30",
  // };

  // const handelDiscountApply = () => {
  //   const discountValue = discountCode[discountCodeInput];
  //   if (discountValue) {
  //     const discountPercent = parseInt(discountValue);
  //     const discountAmount = (subtotal * discountPercent) / 100;
  //     setGrandTotal(subtotal - discountAmount + shipment);
  //   }
  // };

  return (
    <Card sx={{ minHeight: "338px" }}>
      <CardContent>
        <Stack direction={"row"} gap={"25px"} minHeight={"331px"}>
          <Stack direction={"column"}>
            <Typography variant="h5" mb={1.5}>
              Your Order
            </Typography>
            <Stack direction={"column"} mb={6} gap={3}>
              {cartItems?.map((item: any) => (
                <CartItem
                  key={item.productId}
                  cartItemProps={item}
                  changeComponent="payment"
                />
              ))}
              <Stack direction={"row"} gap={"5px"}>
                <TextField
                  placeholder="discount code"
                  value={discountCodeInput}
                  onChange={(e) => setDiscountCodeInput(e.target.value)}
                  sx={{ borderRadius: "8px" }}
                />
                <Button
                  variant="outlined"
                  // onClick={handelDiscountApply}
                  sx={{ width: "133px", borderRadius: "8px" }}
                >
                  Apply
                </Button>
              </Stack>
            </Stack>
            <PaymentDetails />
            <Link href={link}>
              <Button
                onClick={action}
                variant="contained"
                sx={{ mt: "25px", py: "12px", textTransform: "none" }}
                fullWidth
              >
                {buttonText}
              </Button>
            </Link>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
