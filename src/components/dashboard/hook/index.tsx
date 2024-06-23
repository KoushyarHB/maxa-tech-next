// hooks/useGetAllProductsToDashboard.ts
import { IProduct } from "@/components/home/hooks/types";
import { editData, getAllDashboardProducts, postData } from "../services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllDashboardProducts = () => {
  return useQuery<IProduct[]>({
    queryKey: ["products-Dashboard"],
    queryFn: getAllDashboardProducts,
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
