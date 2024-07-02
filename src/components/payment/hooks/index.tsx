import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "../services";
import { queryClient } from "@/pages/_app";

export const usePlaceOrderMutation = () => {
  return useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      queryClient.invalidateQueries({ queryKey: ["user-orders-history"] });
    },
  });
};
