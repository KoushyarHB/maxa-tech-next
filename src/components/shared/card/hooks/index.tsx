import { useMutation, useQuery } from "@tanstack/react-query";
import { addToCart, isInWishlist } from "../services";
import { queryClient } from "@/pages/_app";

export const useIsInWishlist = (productId: number) => {
  return {
    ...useQuery({
      queryKey: ["isInWishlist", productId],
      queryFn: () => isInWishlist(productId),
    }),
    invalidate: () =>
      queryClient.invalidateQueries({ queryKey: ["isInWishlist", productId] }),
  };
};

export const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      queryClient.invalidateQueries({ queryKey: ["calculateTotal"] });
    },
  });
};
