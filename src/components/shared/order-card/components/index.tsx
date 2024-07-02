import { Box, Button, Stack } from "@mui/material";
import arrowRight from "@/assets/images/arrow-circle-right.svg";
import { IOrder } from "@/layout/navbar/hooks/types";
import { useGetOrderImages } from "../hooks";

type OrderCardPropsType = {
  orderCardProps: IOrder;
};

export default function OrderCard({ orderCardProps }: OrderCardPropsType) {
  const { data: orderImages } = useGetOrderImages(orderCardProps.orderItems);
  return (
    <Box>
      <Stack
        sx={{
          width: "912px",
          px: "16px",
          py: "17px",
        }}
        direction={"column"}
      >
        <Box
          sx={{
            backgroundColor: "#F6F6F6",
            borderRadius: "4px",
            p: "16px",
            mb: "24px",
          }}
        >
          <Stack direction={"row"}>
            <Stack
              direction={"column"}
              sx={{
                width: "170.75px",
                height: "65px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ fontSize: "16px", fontWeight: "600" }}>Order Code</Box>
              <Box sx={{ fontSize: "18px", fontWeight: "300" }}>
                {orderCardProps.orderCode}
              </Box>
            </Stack>
            <Stack
              direction={"column"}
              sx={{
                width: "170.75px",
                height: "65px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ fontSize: "16px", fontWeight: "500" }}>Placed On</Box>
              <Box>{orderCardProps.orderPlacementDate}</Box>
            </Stack>
            <Stack
              direction={"column"}
              sx={{
                width: "170.75px",
                height: "65px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ fontSize: "16px", fontWeight: "500" }}>Total</Box>
              <Box>${orderCardProps.orderTotal}</Box>
            </Stack>
            <Stack
              direction={"column"}
              sx={{
                width: "170.75px",
                height: "65px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ fontSize: "16px", fontWeight: "500" }}>Sent To</Box>
              <Box>{orderCardProps.orderReceiverName}</Box>
            </Stack>
            <Button
              sx={{
                textTransform: "none",
                width: "165px",
                fontSize: "16px",
                fontWeight: "300",
                color: "#0C68F4",
              }}
            >
              Order Status
              <Box
                sx={{ ml: "8px", color: "#0C68F4" }}
                component={"img"}
                src={arrowRight.src}
                alt={"arrowRight"}
              />
            </Button>
          </Stack>
        </Box>
        <Stack sx={{ gap: "20px" }} direction={"row"}>
          {orderImages?.map((item, index) => (
            <Box
              sx={{
                width: "109px",
                height: "116px",
                border: "1px solid #F6F6F6",
                borderRadius: "4px",
              }}
              component={"img"}
              key={index}
              src={item}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
