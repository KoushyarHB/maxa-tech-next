import { useQuery } from "@tanstack/react-query";
import { getOrderImages } from "../services";
import { ICartProducts } from "@/layout/navbar/hooks/types";

export const useGetOrderImages = (orderItems: ICartProducts[]) => {
  return useQuery({
    queryKey: ["orderItems", orderItems],
    queryFn: () => getOrderImages(orderItems),
  });
};
