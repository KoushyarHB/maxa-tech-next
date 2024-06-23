import { IProduct } from "@/components/home/hooks/types";
import { BASE_URL } from "@/constants/urls";
import { queryClient } from "@/pages/_app";
import axios from "axios";
import Swal from "sweetalert2";

export async function getAllProductsToDashboard() {
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
      queryClient.invalidateQueries({ queryKey: ["products-Dashboard"] });
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
    queryClient.invalidateQueries({ queryKey: ["products-Dashboard"] });
    return res.data;
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
}

export async function handleDelete(id: number) {
  console.log(id);
  const result = await Swal.fire({
    title: "Sure you want to delete this item?",
    text: "This action is irreversible.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, I'm sure",
    cancelButtonText: "Cancel",
  });
  if (result.isConfirmed) {
    try {
      await axios.delete(`${BASE_URL}/products/${id}`);
      queryClient.invalidateQueries({ queryKey: ["products-Dashboard"] });
      Swal.fire({
        title: "Deleted",
        text: "Item was deleted successfuly.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Someething went wrong.",
        icon: "error",
      });
    }
  } else {
    Swal.fire({
      title: "Canceled",
      text: "Deletion canceled.",
      icon: "info",
    });
  }
}
