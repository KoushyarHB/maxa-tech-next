import React, { useState } from "react";
import BreadCrumbs from "../../shared/bread-crumbs";
import { Box, Stack } from "@mui/material";
import AccountSideBar from "./account-side-bar";
import AccountBody from "./account-body";
import { useGetUserInfo } from "../hooks";

export default function Account() {
  const { data } = useGetUserInfo();
  const [tab, setTab] = useState("Personal Data");
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
        <AccountSideBar userName={data?.userName} tab={tab} setTab={setTab} />
        <Box sx={{ flexGrow: 1 }}>
          <AccountBody data={data} tab={tab} />
        </Box>
      </Stack>
    </>
  );
}
