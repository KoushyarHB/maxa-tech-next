import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services";
import { IProduct } from "@/components/home/hooks/types";


export const useGetProduct = () => {
  return useQuery<IProduct[]>({
    queryKey: ["sample-products"],
    queryFn: () => getProduct(),
    refetchOnWindowFocus: false,
  });
};
