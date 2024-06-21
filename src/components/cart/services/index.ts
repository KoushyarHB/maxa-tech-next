import { IProduct } from "@/components/home/hooks/types";
import { BASE_URL } from "@/constants/urls";
import axios from "axios";

function shuffleArray(array: IProduct[]): IProduct[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function getProduct(): Promise<IProduct[]> {
  const res = await axios.get(`${BASE_URL}/products?&_limit=4`);
  console.log(res.data);
  return shuffleArray(res.data);
}
