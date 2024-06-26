import { BASE_URL } from "@/constants/urls";
import axios from "axios";
import {
  ICart,
  ICartProducts,
  IUser,
  IUserSignInForm,
  IWishlist,
} from "../hooks/types";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

export const signUpNewUser = async (
  newUserData: IUser,
  cartData: ICart,
  wishlistData: IWishlist
) => {
  try {
    const existingUsersDatabase = await axios.get(`${BASE_URL}/users`);
    const existingUsers = existingUsersDatabase.data;
    const emailExists = existingUsers.some(
      (user: IUser) => user.email === newUserData.email
    );
    if (emailExists) {
      throw new Error("This email is already registered.");
    }
    const userResponse = await axios.post(`${BASE_URL}/users`, newUserData);
    const cartResponse = await axios.post(`${BASE_URL}/cart`, cartData);
    const wishlistResponse = await axios.post(
      `${BASE_URL}/wishlist`,
      wishlistData
    );
    return {
      user: userResponse.data,
      cart: cartResponse.data,
      wishlist: wishlistResponse.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && !error.response) {
      throw new Error("Network error, please try again later.");
    }
    throw error;
  }
};

export const signInUser = async (data: IUserSignInForm) => {
  try {
    const usersDatabase = await axios.get(`${BASE_URL}/users`);
    const userInDataBase = usersDatabase.data.find(
      (item: IUser) => item.email === data.email
    );
    if (!userInDataBase || userInDataBase.password !== data.password) {
      throw new Error("You've entered an envalid email/password combination.");
    }
    return userInDataBase;
  } catch (error) {
    if (axios.isAxiosError(error) && !error.response) {
      throw new Error("Network error, please try again later.");
    }
    throw error;
  }
};

export const getUserInfo = async () => {
  const userId = fetchIdCookie();
  const userRole = fetchRoleCookie();
  const userInfoResponse = await axios.get(`${BASE_URL}/users/${userId}`);
  const userInfo = userInfoResponse.data;
  return { userInfo: userInfo, userRole: userRole };
};

export const getCartItems = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/cart/${userId}`);
  return response.data.cartProducts;
};

export const getCartItemDetails = async (productId: number) => {
  const response = await axios.get(`${BASE_URL}/products/${productId}`);
  return response.data;
};

export const removeCartItem = async (productId: number): Promise<any> => {
  try {
    const userId = fetchIdCookie();
    const cartResponse = await axios.get(`${BASE_URL}/cart/${userId}`);
    const cartData = cartResponse.data.cartProducts;
    const remainingCartProducts = cartData.filter(
      (product: ICartProducts) => product.productId !== productId
    );
    const updateResponse = await axios.patch(`${BASE_URL}/cart/${userId}`, {
      cartProducts: remainingCartProducts,
    });
    return updateResponse.data;
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error;
  }
};

export const increaseCartItemQuantity = async (
  productId: number
): Promise<any> => {
  try {
    const userId = fetchIdCookie();
    const cartResponse = await axios.get(`${BASE_URL}/cart/${userId}`);
    const cartData = cartResponse.data.cartProducts;
    const productResponse = await axios.get(
      `${BASE_URL}/products/${productId}`
    );
    const productAvailableQuantity = productResponse.data.availableQuantity;
    const updatedCartProducts = cartData.map((product: ICartProducts) => {
      if (product.productId === productId) {
        if (product.quantity < productAvailableQuantity) {
          product.quantity++;
        }
      }
      return product;
    });
    const updateResponse = await axios.patch(`${BASE_URL}/cart/${userId}`, {
      cartProducts: updatedCartProducts,
    });
    return updateResponse.data;
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error;
  }
};

export const decreaseCartItemQuantity = async (
  productId: number
): Promise<any> => {
  try {
    const userId = fetchIdCookie();
    const cartResponse = await axios.get(`${BASE_URL}/cart/${userId}`);
    const cartData = cartResponse.data.cartProducts;
    const updatedCartProducts = cartData.map((product: ICartProducts) => {
      if (product.productId === productId) {
        if (product.quantity > 1) {
          product.quantity--;
        }
      }
      return product;
    });
    const updateResponse = await axios.patch(`${BASE_URL}/cart/${userId}`, {
      cartProducts: updatedCartProducts,
    });
    return updateResponse.data;
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error;
  }
};

export const calculateTotal = async () => {
  try {
    const userId = fetchIdCookie();
    const cartResponse = await axios.get(`${BASE_URL}/cart/${userId}`);
    const cartData = cartResponse.data.cartProducts;

    if (!cartData) {
      throw new Error("Cart data is undefined");
    }

    const productDetailsPromises = cartData.map((product: ICartProducts) => {
      return axios
        .get(`${BASE_URL}/products/${product.productId}`)
        .then((response) => ({
          quantity: product.quantity,
          price: response.data.price,
          discountPercentage: response.data.discount.percent,
        }));
    });
    const productDetails = await Promise.all(productDetailsPromises);
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalPayable = 0;
    productDetails.map((item) => (totalPrice += item.price * item.quantity));
    productDetails.map(
      (item) =>
        (totalDiscount +=
          item.price * item.quantity * (item.discountPercentage / 100))
    );
    totalPayable = totalPrice - totalDiscount;
    console.log(totalPayable.toFixed(2));
    return [
      +totalPrice.toFixed(2),
      +totalDiscount.toFixed(2),
      +totalPayable.toFixed(2),
    ];
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error;
  }
};

// Cookie functions
export const fetchAccessCookie = () => {
  return getCookie("access") === "true";
};

export const fetchIdCookie = () => {
  return getCookie("userId");
};

export const fetchRoleCookie = () => {
  return getCookie("role");
};

export const setAccessCookie = (value: boolean) => {
  const accessValue = value ? "true" : "false";
  setCookie("access", accessValue, { maxAge: 3600, path: "/" });
};

export const setIdCookie = (value: number) => {
  setCookie("userId", String(value), { maxAge: 3600, path: "/" });
};

export const setRoleCookie = (value: string) => {
  setCookie("role", String(value), { maxAge: 3600, path: "/" });
};

export const removeAccessCookie = () => {
  deleteCookie("access", { path: "/" });
};

export const removeIdCookie = () => {
  deleteCookie("userId", { path: "/" });
};

export const removeRoleCookie = () => {
  deleteCookie("role", { path: "/" });
};
