import React, { useState } from "react";
import BreadCrumbs from "../../shared/bread-crumbs";
import { Stack } from "@mui/material";
import AccountSideBar from "./account-side-bar";
import AccountBody from "./account-body";

export default function Account() {
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
        <AccountSideBar tab={tab} setTab={setTab} />
        <AccountBody tab={tab} />
      </Stack>
    </>
  );
}
