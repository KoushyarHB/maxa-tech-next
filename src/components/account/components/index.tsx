import useTabStore from "@/stores/useTabStore";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BreadCrumbs from "../../shared/bread-crumbs";
import { useGetUserInfo } from "../hooks";
import AccountBody from "./account-body";
import AccountSideBar from "./account-side-bar";

export default function Account() {
  const { tab } = useTabStore();
  const { refetch } = useGetUserInfo();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === "/account") {
        refetch();
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, refetch]);

  return (
    <>
      <BreadCrumbs
        array={[
          ["Home", "/"],
          ["Account", "/account"],
          [tab, ""],
        ]}
      />
      <Stack direction={"row"}>
        <AccountSideBar />
        <Box sx={{ flexGrow: 1 }}>
          <AccountBody />
        </Box>
      </Stack>
    </>
  );
}
