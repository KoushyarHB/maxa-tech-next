import { BASE_URL } from "@/constants/urls";
import { ICartProducts } from "@/layout/navbar/hooks/types";
import axios from "axios";

export const getOrderImages = async (orderItems: ICartProducts[]) => {
  const orderItemImagePromises = orderItems.map((item: ICartProducts) => {
    return axios
      .get(`${BASE_URL}/products/${item.productId}`)
      .then((response) => response.data.thumbnailImage);
  });
  const orderItemImages = await Promise.all(orderItemImagePromises);
  return orderItemImages;
};
