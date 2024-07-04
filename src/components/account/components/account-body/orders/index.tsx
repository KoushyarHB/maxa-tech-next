import useOrderTabStore from "@/stores/useOrderTabStore";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import TabTitle from "../../tab-title";
import CanceledOrdersTab from "./canceled-orders-tab";
import CurrentOrdersTab from "./current-orders-tab";
import DeliveredOrdersTab from "./delivered-orders-tab";
import OrderTabTitle from "./order-tab-title";
import ReturnedOrdersTab from "./returned-orders-tab";
import { useGetUserOrdersHistory } from "@/components/account/hooks";
import { IOrder } from "@/layout/navbar/hooks/types";

export default function Orders() {
  const { orderTab, setOrderTab } = useOrderTabStore();
  const { data, isLoading } = useGetUserOrdersHistory("");

  useEffect(() => {
    setOrderTab("Current");
  }, [setOrderTab]);

  const [numberOfOrders, setNumberOfOrders] = useState({
    current: 0,
    delivered: 0,
    canceled: 0,
    returned: 0,
  });

  useEffect(() => {
    if (!isLoading) {
      const currentOrders = data.filter(
        (item: IOrder) => item.orderStatus === "current"
      ).length;
      const deliveredOrders = data.filter(
        (item: IOrder) => item.orderStatus === "delivered"
      ).length;
      const canceledOrders = data.filter(
        (item: IOrder) => item.orderStatus === "canceled"
      ).length;
      const returnedOrders = data.filter(
        (item: IOrder) => item.orderStatus === "returned"
      ).length;

      setNumberOfOrders({
        current: currentOrders,
        delivered: deliveredOrders,
        canceled: canceledOrders,
        returned: returnedOrders,
      });
    }
  }, [data, isLoading]);

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
          mb: "100px",
        }}
      >
        <Stack
          sx={{ fontSize: "20px", fontWeight: "300", color: "#717171" }}
          direction={"row"}
        >
          <OrderTabTitle
            title={"Current"}
            numberOfOrders={numberOfOrders.current}
          />
          <Box sx={{ borderBottom: "solid 4px #EDEDED", width: "32px" }}></Box>
          <OrderTabTitle
            title={"Delivered"}
            numberOfOrders={numberOfOrders.delivered}
          />
          <Box sx={{ borderBottom: "solid 4px #EDEDED", width: "32px" }}></Box>
          <OrderTabTitle
            title={"Canceled"}
            numberOfOrders={numberOfOrders.canceled}
          />
          <Box sx={{ borderBottom: "solid 4px #EDEDED", width: "32px" }}></Box>
          <OrderTabTitle
            title={"Returned"}
            numberOfOrders={numberOfOrders.returned}
          />
          <Box sx={{ borderBottom: "solid 4px #EDEDED", width: "368px" }}></Box>
        </Stack>
        {orderTab === "Current" && <CurrentOrdersTab />}
        {orderTab === "Delivered" && <DeliveredOrdersTab />}
        {orderTab === "Canceled" && <CanceledOrdersTab />}
        {orderTab === "Returned" && <ReturnedOrdersTab />}
      </Box>
    </Box>
  );
}
