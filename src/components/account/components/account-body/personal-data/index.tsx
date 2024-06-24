import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import username from "@/assets/images/personal-data-icons/username.svg";
import email from "@/assets/images/personal-data-icons/email.svg";
import phonenumber from "@/assets/images/personal-data-icons/phonenumber.svg";
import password from "@/assets/images/personal-data-icons/password.svg";
import address from "@/assets/images/personal-data-icons/address.svg";
import postalcode from "@/assets/images/personal-data-icons/postalcode.svg";
import PersonalDataField from "./personal-data-field";
import { IUser } from "@/layout/navbar/hooks/types";
import TabTitle from "../../tab-title";

type PersonalDataProps = {
  data: IUser;
};

export default function PersonalData({ data }: PersonalDataProps) {
  return (
    <Box>
      <TabTitle
        firstTitle={"Identification"}
        secondTitle={"Verify your identity"}
      />
      <Grid sx={{ width: "808px" }} container spacing={2}>
        <Grid item xs={6}>
          <PersonalDataField
            title={"Full Name"}
            icon={username}
            data={data?.userName}
          />
        </Grid>
        <Grid item xs={6}>
          <PersonalDataField
            title={"E-mail Address"}
            icon={email}
            data={data?.email}
          />
        </Grid>
        <Grid item xs={6}>
          <PersonalDataField
            title={"Phone number"}
            icon={phonenumber}
            data={data?.phoneNumber ? data.phoneNumber : "---"}
          />
        </Grid>
        <Grid item xs={6}>
          <PersonalDataField
            title={"Password"}
            icon={password}
            data={data?.password}
          />
        </Grid>
        <Grid item xs={6}>
          <PersonalDataField
            title={"Address"}
            icon={address}
            data={data?.address ? data.address : "---"}
          />
        </Grid>
        <Grid item xs={6}>
          <PersonalDataField
            title={"Postal Code"}
            icon={postalcode}
            data={data?.postalCode ? data.postalCode : "---"}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
