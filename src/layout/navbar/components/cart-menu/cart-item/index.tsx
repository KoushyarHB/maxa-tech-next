import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import frameDelivery from "@/assets/images/single-product-assets/frameDelivery.svg";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import trashBtn from "@/assets/images/trashbtn.svg";
import { ICartProducts } from "@/layout/navbar/hooks/types";
import {
  useDecreaseCartItemQuantity,
  useGetCartItemDetails,
  useIncreaseCartItemQuantity,
  useRemoveCartItem,
} from "@/layout/navbar/hooks";

type Props = {
  cartItemProps: ICartProducts;
};

export default function CartItem({ cartItemProps }: Props) {
  const { data: cartItemDetails } = useGetCartItemDetails(
    cartItemProps.productId
  );

  const removeMutation = useRemoveCartItem();
  const increaseMutation = useIncreaseCartItemQuantity();
  const decreaseMutation = useDecreaseCartItemQuantity();

  const handleRemoveCartProduct = (id: number) => {
    removeMutation.mutate(id);
  };

  const handleIncreaseQuantity = (id: number) => {
    increaseMutation.mutate(id);
  };

  const handleDecreaseQuantity = (id: number) => {
    decreaseMutation.mutate(id);
  };

  return (
    <Box
      width={"448px"}
      height={"173px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={"16px"}
      boxShadow={1}
      borderRadius={"8px"}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={"174px"}
        height={"140px"}
      >
        <Box
          component={"img"}
          height={"120px"}
          src={cartItemDetails?.thumbnailImage}
        />
      </Box>
      <Box sx={{ mr: "26px", my: "8px" }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          width={"232px"}
          height={"157px"}
        >
          <Box sx={{ my: "8px" }}>
            <Typography fontSize={"16px"} fontWeight={"600"}>
              {cartItemDetails?.name}
            </Typography>
          </Box>
          <Box>
            <Box>
              {cartItemDetails?.color && (
                <Box>
                  <Typography
                    fontSize={"10px"}
                    fontWeight={"500"}
                    color={"#717171"}
                  >
                    {cartItemDetails?.color}
                  </Typography>
                </Box>
              )}
              <Box>
                <Typography
                  fontSize={"14px"}
                  fontWeight={"500"}
                  color={"#717171"}
                >
                  × {cartItemProps?.quantity}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ mt: "12px" }}
              component={"img"}
              src={frameDelivery.src}
            />
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              marginTop={"9px"}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  fontSize={"14px"}
                  fontWeight={"400"}
                  color={"#2D2D2D"}
                >
                  $
                  {(cartItemDetails?.price * cartItemProps?.quantity).toFixed(
                    2
                  )}
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Box
                  onClick={() =>
                    handleRemoveCartProduct(cartItemProps.productId)
                  }
                  component={"img"}
                  src={trashBtn.src}
                />
                <Box>
                  <Stack
                    direction="row"
                    alignItems={"center"}
                    spacing={1}
                    borderBottom={1}
                    width={"69px"}
                    height={"24px"}
                  >
                    <Button
                      onClick={() =>
                        handleDecreaseQuantity(cartItemProps.productId)
                      }
                      size="small"
                      sx={{ color: "#717171", minHeight: 16, minWidth: 16 }}
                    >
                      <RemoveIcon></RemoveIcon>
                    </Button>
                    <TextField
                      size="small"
                      InputProps={{ disableUnderline: true }}
                      variant="standard"
                      placeholder={String(cartItemProps?.quantity)}
                    />
                    <Button
                      onClick={() =>
                        handleIncreaseQuantity(cartItemProps.productId)
                      }
                      size="small"
                      sx={{ color: "#717171", minHeight: 16, minWidth: 16 }}
                    >
                      <AddIcon></AddIcon>
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
