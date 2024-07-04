import { useGetUserOrdersHistory } from "@/components/account/hooks";
import OrderCard from "@/components/shared/order-card/components";
import { IOrder } from "@/layout/navbar/hooks/types";
import { Box, Stack } from "@mui/material";
import ZeroReceipt from "../zero-receipt";

export default function CurrentOrdersTab() {
  const { data, isLoading } = useGetUserOrdersHistory("Current");

  if (!isLoading) {
    if (data.length === 0) {
      return <ZeroReceipt />;
    }
  }

  return (
    <Stack>
      {data?.map((item: IOrder) => (
        <Box key={item.orderReceiverName}>
          <OrderCard orderCardProps={item} />
        </Box>
      ))}
    </Stack>
  );
}
