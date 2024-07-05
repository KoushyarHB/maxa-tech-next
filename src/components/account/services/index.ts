import { IProduct } from "@/components/home/hooks/types";
import { BASE_URL } from "@/constants/urls";
import { IOrder } from "@/layout/navbar/hooks/types";
import { fetchIdCookie } from "@/layout/navbar/services";
import axios from "axios";
import { toast } from "react-toastify";
import { UpdateUserInfoParams, UserInfo } from "../hooks/types";

export const getUserInfo = async () => {
  const userId = fetchIdCookie();
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  return response.data;
};

export const getUserOrdersHistory = async (orderTab: string) => {
  const userId = fetchIdCookie();
  const response = await axios.get(`${BASE_URL}/order/${userId}`);
  const userOrdersHistory = response.data.ordersHistory;
  if (orderTab === "") {
    return userOrdersHistory;
  }
  const filteredOrderHistory = userOrdersHistory.filter(
    (item: IOrder) => item.orderStatus === orderTab.toLocaleLowerCase()
  );
  return filteredOrderHistory;
};

export const updateUserInfo = async ({
  newData,
  modalType,
}: UpdateUserInfoParams) => {
  try {
    const userId = fetchIdCookie();
    const userResponse = await axios.get<UserInfo>(
      `${BASE_URL}/users/${userId}`
    );
    const userInfo = userResponse.data;
    let updatedUserInfo;
    switch (modalType) {
      case "userName":
        updatedUserInfo = { ...userInfo, userName: newData };
        break;
      case "email":
        updatedUserInfo = { ...userInfo, email: newData };
        break;
      case "password":
        updatedUserInfo = { ...userInfo, password: newData };
        break;
      case "address":
        updatedUserInfo = { ...userInfo, address: newData };
        break;
      case "postalCode":
        updatedUserInfo = { ...userInfo, postalCode: newData };
        break;
      case "phoneNumber":
        updatedUserInfo = { ...userInfo, phoneNumber: newData };
        break;
      default:
        updatedUserInfo = userInfo;
        break;
    }

    const updateUserResponse = await axios.put<UserInfo>(
      `${BASE_URL}/users/${userId}`,
      updatedUserInfo
    );

    let toastString;
    switch (modalType) {
      case "userName":
        toastString = "user name";
        break;
      case "email":
        toastString = "email address";
        break;
      case "password":
        toastString = "password";
        break;
      case "address":
        toastString = "home address";
        break;
      case "postalCode":
        toastString = "address postal code";
        break;
      case "phoneNumber":
        toastString = "phone number";
        break;
      default:
        toastString = "personal information";
        break;
    }
    toast.success(`Your ${toastString} was updates successfully`);
    return updateUserResponse.data;
  } catch (error) {
    toast.error("Error updating your personal information");
    console.log(error);
  }
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
