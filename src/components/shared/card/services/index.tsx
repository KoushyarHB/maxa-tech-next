import { BASE_URL } from "@/constants/urls";
import { ICartProducts } from "@/layout/navbar/hooks/types";
import { fetchIdCookie } from "@/layout/navbar/services";
import { queryClient } from "@/pages/_app";
import axios from "axios";
import { toast } from "react-toastify";

export const addToCart = async (productId: number) => {
  const userId = fetchIdCookie();
  const cartProductObj = { productId: productId, quantity: 1, color: "" };

  try {
    const cartResponse = await axios.get(`${BASE_URL}/cart/${userId}`);
    const userCart = cartResponse.data;

    const existingProductIndex = userCart.cartProducts.findIndex(
      (product: ICartProducts) => product.productId === productId
    );

    if (existingProductIndex !== -1) {
      userCart.cartProducts[existingProductIndex].quantity += 1;
      toast.info("Item already in in your shopping cart. Quantity updated!");
    } else {
      userCart.cartProducts.unshift(cartProductObj);
      toast.success("Item added to your shopping cart");
    }

    const updateResponse = await axios.put(
      `${BASE_URL}/cart/${userId}`,
      userCart
    );
    return updateResponse.data;
  } catch (error) {
    toast.error("Error updating your shopping cart");
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const addToWishlist = async (productId: number) => {
  const userId = fetchIdCookie();

  try {
    const wishlistResponse = await axios.get(`${BASE_URL}/wishlist/${userId}`);
    const userWishlist = wishlistResponse.data;

    const existingItemIndex = userWishlist.wishlistProducts.findIndex(
      (id: number) => id === productId
    );

    if (existingItemIndex !== -1) {
      userWishlist.wishlistProducts.splice(existingItemIndex, 1);
      toast.info("Item removed form your wishlist");
    } else {
      userWishlist.wishlistProducts.unshift(productId);
      toast.success("Item added to your wishlist");
    }

    const updateResponse = await axios.put(
      `${BASE_URL}/wishlist/${userId}`,
      userWishlist
    );
    queryClient.invalidateQueries({ queryKey: ["wishlistItems"] });
    return updateResponse.data;
  } catch (error) {
    toast.error("Error adding item to your wishlist");
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

export const isInWishlist = async (productId: number) => {
  const userId = fetchIdCookie();
  try {
    const wishlistResponse = await axios.get(`${BASE_URL}/wishlist/${userId}`);
    const userWishlist = wishlistResponse.data;
    const existingItemIndex = userWishlist.wishlistProducts.findIndex(
      (id: number) => id === productId
    );
    if (existingItemIndex !== -1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error querying wishlist:", error);
    throw error;
  }
};
