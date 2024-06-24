import { useQuery } from "@tanstack/react-query";
import { isInWishlist } from "../services";
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
