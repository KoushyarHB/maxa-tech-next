import { Box } from "@mui/material";
import PersonalData from "./personal-data";
import Orders from "./orders";
import Wishlist from "./wishlist";
import { IUser } from "@/layout/navbar/hooks/types";
import Discounts from "./discounts";
import SecurityAndAccess from "./security-and-access";
import Notifications from "./notifications";

type AccountBodyProps = {
  data: IUser;
  tab: string;
};

export default function AccountBody({ data, tab }: AccountBodyProps) {
  return (
    <>
      <Box sx={{ pt: "24px", pl: "24px" }}>
        {tab === "Personal Data" && <PersonalData data={data} />}
        {tab === "Orders" && <Orders />}
        {tab === "Wishlist" && <Wishlist />}
        {tab === "Discounts" && <Discounts />}
        {tab === "Security & Access" && <SecurityAndAccess />}
        {tab === "Notifications" && <Notifications />}
        {tab === "Contact Us" && <PersonalData />}
        {tab === "Log Out" && <PersonalData />}
      </Box>
    </>
  );
}
