import { IProduct } from "@/components/home/hooks/types";
import { BASE_URL } from "@/constants/urls";
import axios from "axios";

export async function getAllDashboardProducts() {
  try {
    const { data } = await axios.get(`${BASE_URL}/products`);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export async function postData(bodyRequest: IProduct) {
  try {
    const get = await axios.get(`${BASE_URL}/products`);
    const exists = get.data.some(
      (item: { id: number; name: string }) =>
        item.id === bodyRequest.id ||
        item.name.trim() === bodyRequest.name.trim()
    );

    if (!exists) {
      const { data } = await axios.post(`${BASE_URL}/products`, bodyRequest);
      return data;
    } else {
      return { message: "Product with the same ID or name already exists" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
}

export async function editData(id: number, product: IProduct) {
  try {
    const res = await axios.put(`${BASE_URL}/products/${id}`, product);
    return res.data;
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
}
