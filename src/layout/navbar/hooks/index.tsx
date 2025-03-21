import { useMutation, useQuery } from "@tanstack/react-query";
import {
  calculateTotal,
  decreaseCartItemQuantity,
  fetchAccessCookie,
  getCartItemDetails,
  getCartItems,
  getUserInfo,
  increaseCartItemQuantity,
  removeCartItem,
  signInUser,
  signUpNewUser,
} from "../services";
import { ICart, IOrder, IOrders, IUser, IWishlist } from "./types";
import { queryClient } from "@/pages/_app";

export const useAccessCookie = () => {
  return useQuery({
    queryKey: ["access"],
    queryFn: () => fetchAccessCookie(),
    staleTime: Infinity,
    refetchInterval: 100,
  });
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
  });
};

export const useSignUpNewUser = () => {
  return useMutation({
    mutationFn: (data: {
      newUserData: IUser;
      cartData: ICart;
      wishlistData: IWishlist;
      orderData: IOrders;
    }) =>
      signUpNewUser(
        data.newUserData,
        data.cartData,
        data.wishlistData,
        data.orderData
      ),
  });
};

export const useSignInUser = () => {
  return useMutation({
    mutationFn: signInUser,
  });
};

export const useGetCartItems = (userId: number) => {
  return useQuery({
    queryKey: ["cartItems", userId],
    queryFn: () => getCartItems(userId),
  });
};

export const useGetCartItemDetails = (productId: number) => {
  return useQuery({
    queryKey: ["cartItemDetails", productId],
    queryFn: () => getCartItemDetails(productId),
  });
};

export const useRemoveCartItem = () => {
  return useMutation<any, Error, number>({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cartItems"],
      });
      queryClient.invalidateQueries({
        queryKey: ["calculateTotal"],
      });
    },
    onError: (error: Error) => {
      console.error("Error deleting cart item:", error);
    },
  });
};

export const useIncreaseCartItemQuantity = () => {
  return useMutation<any, Error, number>({
    mutationFn: increaseCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      queryClient.invalidateQueries({
        queryKey: ["calculateTotal"],
      });
    },
    onError: (error: Error) => {
      console.error("Error deleting cart item:", error);
    },
  });
};

export const useDecreaseCartItemQuantity = () => {
  return useMutation<any, Error, number>({
    mutationFn: decreaseCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      queryClient.invalidateQueries({
        queryKey: ["calculateTotal"],
      });
    },
    onError: (error: Error) => {
      console.error("Error deleting cart item:", error);
    },
  });
};

export const useCalculateTotal = () => {
  return useQuery({
    queryKey: ["calculateTotal"],
    queryFn: () => calculateTotal(),
    staleTime: 0,
  });
};
