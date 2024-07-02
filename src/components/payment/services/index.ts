// export interface IOrder {
//     id: number;
//     ordersHistory: {
//       orderCode: number;
//       orderStatus: string;
//       orderPlacementDate: string;
//       orderTotal: number;
//       orderReceiverName: string;
//       orderAddress: string;
//       orderPaymentMethod: string;
//       orderTransactionId: number;
//       orderShippingMethod: string;
//       orderItems: number[];
//     }[];
//   }

import { BASE_URL } from "@/constants/urls";
import { ICartProducts, IOrder } from "@/layout/navbar/hooks/types";
import { fetchIdCookie } from "@/layout/navbar/services";
import useGrandTotalStore from "@/stores/useGrandTotalStore";
import axios from "axios";
import Swal from "sweetalert2";

function generateRandomSevenDigitInteger() {
  let randomInteger = "";
  for (let i = 0; i < 7; i++) {
    randomInteger += Math.floor(Math.random() * 10);
  }
  return parseInt(randomInteger, 10);
}

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

export const placeOrder = async () => {
  try {
    const userId = fetchIdCookie();
    const orderResponse = await axios.get(`${BASE_URL}/order/${userId}`);
    const userOrdersHistory = orderResponse.data.ordersHistory;
    const orderCode = generateRandomSevenDigitInteger();
    const orderStatus = "current";
    const orderPlacementDate = getCurrentDate();
    const { grandTotal } = useGrandTotalStore.getState();
    const orderTotal = grandTotal;
    const userResponse = await axios.get(`${BASE_URL}/users/${userId}`);
    const userInfo = userResponse.data;
    const orderReceiverName = userInfo.userName;
    const orderAddress = userInfo.address;
    const cartResponse = await axios.get(`${BASE_URL}/cart/${userId}`);
    const userCart = cartResponse.data.cartProducts;
    const orderItems: ICartProducts[] = [];
    userCart.map((item: ICartProducts) => orderItems.push(item));
    const newOrder = {
      orderCode,
      orderStatus,
      orderPlacementDate,
      orderTotal,
      orderReceiverName,
      orderAddress,
      orderItems,
    };
    const updatedUserOrdersHistory = [newOrder, ...userOrdersHistory];
    const updateResponse = await axios.put(`${BASE_URL}/order/${userId}`, {
      ordersHistory: updatedUserOrdersHistory,
    });
    const clearCartResponse = await axios.put(`${BASE_URL}/cart/${userId}`, {
      cartProducts: [],
    });
    console.log(clearCartResponse.data);
    Swal.fire({
      title: "Successful Payment",
      text: "Payment was done successfully.",
      icon: "success",
      confirmButtonColor: "#0C68F4",
    });
    return updateResponse.data;
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Payment Failed",
      text: "Unfortunately we have an issue with your payment, try again later.",
      icon: "error",
    });
  }
};
