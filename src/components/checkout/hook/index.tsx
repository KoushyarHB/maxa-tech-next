import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../services";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUserInfo(),
    refetchOnWindowFocus: false,
  });
};
