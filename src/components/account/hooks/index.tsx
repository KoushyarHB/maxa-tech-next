import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserInfo,
  getUserOrdersHistory,
  getUserWishlistItems,
  updateUserInfo,
} from "../services";
import { queryClient } from "@/pages/_app";
import { UpdateUserInfoParams } from "./types";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["account-user-info"],
    queryFn: () => getUserInfo(),
  });
};

export const useGetUserOrdersHistory = (orderTab: string) => {
  return useQuery({
    queryKey: ["user-orders-history", orderTab],
    queryFn: () => getUserOrdersHistory(orderTab),
  });
};

export const useUpdateUserInfo = () => {
  return useMutation({
    mutationFn: (params: UpdateUserInfoParams) => updateUserInfo(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-user-info"] });
    },
  });
};

export const useGetUserWishlist = () => {
  return useQuery({
    queryKey: ["user-wishlist"],
    queryFn: () => getUserWishlistItems(),
  });
};
