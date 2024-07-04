import { IProduct } from "@/components/home/hooks/types";
import { BASE_URL } from "@/constants/urls";
import { queryClient } from "@/pages/_app";
import axios from "axios";
import Swal from "sweetalert2";
import { IDashboardOrder } from "../hook/type";
import { IOrder, IOrders } from "@/layout/navbar/hooks/types";

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
    console.log("Failed to update product:", error);
    console.log(error);
  }
}

export async function updatePrices(dataArray) {
  try {
    const updatePromises = dataArray.map((item) =>
      axios.patch(`${BASE_URL}/products/${item[0]}`, { price: +item[1] })
    );
    const res = await Promise.all(updatePromises);
    console.log(res);
  } catch (error) {
    console.error("Error updating prices:", error);
  }
}

export async function updateQuantities(dataArray) {
  try {
    const updatePromises = dataArray.map((item) =>
      axios.patch(`${BASE_URL}/products/${item[0]}`, {
        availableQuantity: +item[1],
      })
    );
    const res = await Promise.all(updatePromises);
    console.log(res);
  } catch (error) {
    console.error("Error updating quantities:", error);
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
        text: "Something went wrong.",
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

export const getAllOrders = async () => {
  try {
    const oredersResponse = await axios.get(`${BASE_URL}/order`);
    const ordersData = oredersResponse.data;
    console.log(ordersData);
    const idPlusOrdersArray: IDashboardOrder[] = [];
    ordersData.map((item: IOrders) =>
      item.ordersHistory.map((order) =>
        idPlusOrdersArray.push({ userId: item.id, ...order })
      )
    );
    console.log(idPlusOrdersArray);
    return idPlusOrdersArray;
  } catch (error) {
    console.log(error);
  }
};

export const editOrder = async (id: number, order: IDashboardOrder) => {
  try {
    const ordersResponse = await axios.get(`${BASE_URL}/order/${id}`);
    console.log(ordersResponse.data);
    const ordersHistory = ordersResponse.data.ordersHistory;
    const updatedOrdersHistory = ordersHistory.map((item: IOrder) => {
      if (item.orderCode === order.orderCode) {
        item.orderStatus = order.orderStatus;
        item.orderPlacementDate = order.orderPlacementDate;
        item.orderTotal = order.orderTotal;
        item.orderAddress = order.orderAddress;
        item.orderPostalCode = order.orderPostalCode;
        item.orderReceiverName = order.orderReceiverName;
        item.orderPhoneNumber = order.orderPhoneNumber;
        return item;
      } else {
        return item;
      }
    });
    const updateResponse = await axios.patch(`${BASE_URL}/order/${id}`, {
      ordersHistory: updatedOrdersHistory,
    });
    Swal.fire({
      title: "Success",
      text: "Order updated successfully.",
      icon: "success",
      confirmButtonColor: "#0C68F4",
    });
    return updateResponse.data;
  } catch (error) {
    console.log("Failed to update order:", error);
    Swal.fire({
      title: "Error",
      text: "Something went wrong.",
      icon: "error",
    });
  }
};
