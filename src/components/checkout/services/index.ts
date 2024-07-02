import { BASE_URL } from "@/constants/urls";
import { fetchIdCookie } from "@/layout/navbar/services";
import axios from "axios";

export async function getUserInfo() {
  const userId = fetchIdCookie();
  const url = `${BASE_URL}/users/${userId}`;
  const { data } = await axios.get(url);
  return data;
}
