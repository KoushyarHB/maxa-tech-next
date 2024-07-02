import { Box, Stack } from "@mui/material";
import TabTitle from "../../tab-title";
import OrderTabTitle from "./order-tab-title";
import { useGetUserOrdersHistory } from "@/components/account/hooks";
import { IOrder } from "@/layout/navbar/hooks/types";
import OrderCard from "@/components/shared/order-card/components";

export default function Orders() {
  const { data } = useGetUserOrdersHistory();
  console.log(data);
  return (
    <Box>
      <TabTitle
        firstTitle={"Order History"}
        secondTitle={"Track, return or purchase items"}
      />
      <Box
        sx={{
          width: "911px",
          pt: "16px",
        }}
      >
        <Stack
          sx={{ fontSize: "20px", fontWeight: "300", color: "#717171" }}
          direction={"row"}
        >
          <OrderTabTitle title={"Current"} />
          <Box sx={{ borderBottom: "solid 4px #EDEDED", width: "32px" }}></Box>
          <OrderTabTitle title={"Delivered"} />
          <Box sx={{ borderBottom: "solid 4px #EDEDED", width: "32px" }}></Box>
          <OrderTabTitle title={"Canceled"} />
          <Box sx={{ borderBottom: "solid 4px #EDEDED", width: "32px" }}></Box>
          <OrderTabTitle title={"Returned"} />
          <Box sx={{ borderBottom: "solid 4px #EDEDED", width: "368px" }}></Box>
        </Stack>
        <Stack>
          {data?.map((item: IOrder) => (
            <Box key={item.orderReceiverName}>
              <OrderCard orderCardProps={item} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
