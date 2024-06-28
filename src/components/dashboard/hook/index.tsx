// hooks/useGetAllProductsToDashboard.ts
import { IProduct } from "@/components/home/hooks/types";
import {
  editData,
  editQuantityPrice,
  getAllProductsToDashboard,
  postData,
} from "../services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllProductsToDashboard = () => {
  return useQuery<IProduct[]>({
    queryKey: ["products-Dashboard"],
    queryFn: getAllProductsToDashboard,
  });
};

export const usePostData = () => {
  return useMutation({
    mutationKey: ["post-data"],
    mutationFn: postData,
  });
};

export const useEditData = () => {
  return useMutation({
    mutationKey: ["edit-data"],
    mutationFn: ({ id, product }: { id: number; product: IProduct }) =>
      editData(id, product),
  });
};

export const useEditQuantityPrice = () => {
  return useMutation({
    mutationKey: ["edit-QuantityPrice"],
    mutationFn: ({ id, product }: { id: number; product: IProduct }) =>
      editQuantityPrice(id, product),
    onError: (error) => {
      console.log("Mutation failed:", error);
    },
  });
};

// export const useEditQuantityPrice = () => {
//   return useMutation({
//     mutationKey: ["edit-QuantityPrice"],
//     mutationFn: (products: { id: number; product: IProduct }[]) =>
//       editQuantityPrices(products),
//     onError: (error) => {
//       console.log("Mutation failed:", error);
//     },
//     onSuccess: () => {
//       console.log("Mutation succeeded");
//     },
//   });
// };
