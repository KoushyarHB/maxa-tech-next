import address from "@/assets/images/personal-data-icons/address.svg";
import email from "@/assets/images/personal-data-icons/email.svg";
import password from "@/assets/images/personal-data-icons/password.svg";
import phoneNumber from "@/assets/images/personal-data-icons/phonenumber.svg";
import postalCode from "@/assets/images/personal-data-icons/postalcode.svg";
import userName from "@/assets/images/personal-data-icons/username.svg";
import { useGetUserInfo } from "@/components/account/hooks";
import { Box, Grid } from "@mui/material";
import TabTitle from "../../tab-title";
import PersonalDataField from "./personal-data-field";

export default function PersonalData() {
  const { data } = useGetUserInfo();
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
            icon={userName}
            data={data?.userName}
            fieldType={"userName"}
          />
        </Grid>
        <Grid item xs={6}>
          <PersonalDataField
            title={"E-mail Address"}
            icon={email}
            data={data?.email}
            fieldType={"email"}
          />
        </Grid>
        <Grid item xs={6}>
          <PersonalDataField
            title={"Phone Number"}
            icon={phoneNumber}
            data={data?.phoneNumber ? data.phoneNumber : "---"}
            fieldType={"phoneNumber"}
          />
        </Grid>
        <Grid item xs={6}>
          <PersonalDataField
            title={"Password"}
            icon={password}
            data={data?.password}
            fieldType={"password"}
          />
        </Grid>
        <Grid item xs={6}>
          <PersonalDataField
            title={"Address"}
            icon={address}
            data={data?.address ? data.address : "---"}
            fieldType={"address"}
          />
        </Grid>
        <Grid item xs={6}>
          <PersonalDataField
            title={"Postal Code"}
            icon={postalCode}
            data={data?.postalCode ? data.postalCode : "---"}
            fieldType={"postalCode"}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
