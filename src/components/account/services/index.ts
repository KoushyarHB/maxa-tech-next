import { IProduct } from "@/components/home/hooks/types";
import { BASE_URL } from "@/constants/urls";
import { fetchIdCookie } from "@/layout/navbar/services";
import axios from "axios";

export const getUserInfo = async () => {
  const userId = fetchIdCookie();
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  return response.data;
};

export const getUserWishlistItems = async () => {
  const userId = fetchIdCookie();
  const response = await axios.get(`${BASE_URL}/wishlist/${userId}`);
  const idOfItemsInWishlist: number[] = response.data.wishlistProducts;
  const wishlistProducts: IProduct[] = [];

  await Promise.all(
    idOfItemsInWishlist.map(async (productId) => {
      try {
        const productResponse = await axios.get<IProduct>(
          `${BASE_URL}/products/${productId}`
        );
        const product = productResponse.data;
        wishlistProducts.push(product);
      } catch (error) {
        console.error(`Error fetching product ${productId}:`, error);
      }
    })
  );

  return wishlistProducts;
};
