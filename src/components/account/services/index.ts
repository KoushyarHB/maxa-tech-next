import { BASE_URL } from "@/constants/urls";
import { fetchIdCookie } from "@/layout/navbar/services";
import axios from "axios";

export const getUserInfo = async () => {
  const userId = fetchIdCookie();
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  return response.data;
};
