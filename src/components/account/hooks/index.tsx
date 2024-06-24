import { useQuery } from "@tanstack/react-query";
import { getUserInfo, getUserWishlistItems } from "../services";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["aacount-user-info"],
    queryFn: () => getUserInfo(),
  });
};

export const useGetUserWishlist = () => {
  return useQuery({
    queryKey: ["user-wishlist"],
    queryFn: () => getUserWishlistItems(),
  });
};
