// hooks/useGetAllProductsToDashboard.ts
import { IProduct } from "@/components/home/hooks/types";
import { queryClient } from "@/pages/_app";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  editData,
  editOrder,
  editQuantityPrice,
  getAllOrders,
  getAllProductsToDashboard,
  postData,
  updatePrices,
  updateQuantities,
} from "../services";
import { IDashboardOrder } from "./type";

export const useGetAllProductsToDashboard = () => {
  return useQuery<IProduct[]>({
    queryKey: ["products-dashboard"],
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

export const useUpdatePrices = () => {
  return useMutation({
    mutationFn: updatePrices,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products-dashboard"] });
    },
  });
};

export const useUpdateQuantities = () => {
  return useMutation({
    mutationFn: updateQuantities,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products-dashboard"] });
    },
  });
};

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ["get-all-orders"],
    queryFn: () => getAllOrders(),
  });
};

export const useEditOrder = () => {
  return useMutation({
    mutationKey: ["edit-order"],
    mutationFn: ({ id, order }: { id: number; order: IDashboardOrder }) =>
      editOrder(id, order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-orders"] });
    },
  });
};
