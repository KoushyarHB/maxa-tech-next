import {
  Box,
  Button,
  Icon,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import frameDelivery from "@/assets/images/single-product-assets/frameDelivery.svg";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { ICartProducts } from "@/layout/navbar/hooks/types";
import { useGetCartItemDetails } from "@/layout/navbar/hooks";
import trashBtn from "@/assets/images/trashbtn.svg";

type Props = {
  cartItemProps: ICartProducts;
};

export default function CartItem({ cartItemProps }: Props) {
  const { data: cartItemDetails } = useGetCartItemDetails(
    cartItemProps.productId
  );
  console.log(cartItemDetails);

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
      <Box sx={{ mr: "10px", my: "8px" }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          width={"232px"}
          height={"157px"}
          gap={"8px"}
        >
          <Box>
            <Typography fontSize={"16px"} fontWeight={"600"}>
              {cartItemDetails?.name}
            </Typography>
          </Box>
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
            <Typography fontSize={"14px"} fontWeight={"500"} color={"#717171"}>
              × {cartItemProps?.quantity}
            </Typography>
          </Box>
          <Box component={"img"} src={frameDelivery.src} />
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"canter"}
            marginTop={"12px"}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                fontSize={"14px"}
                fontWeight={"400"}
                color={"#2D2D2D"}
              >
                $
                {(cartItemDetails?.price * cartItemProps?.quantity)?.toFixed(2)}
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={2}>
              <Box component={"img"} src={trashBtn.src} />
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
  );
}
