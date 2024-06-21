import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services";
import { IProduct } from "@/components/home/hooks/types";

export const useGetProduct = (id: number) => {
  return useQuery<IProduct[]>({
    queryKey: ["sample-products", id],
    queryFn: () => getProduct(),
    refetchOnWindowFocus: false,
  });
};
