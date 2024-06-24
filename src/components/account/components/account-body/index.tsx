import { Box } from "@mui/material";
import PersonalData from "./personal-data";
import Orders from "./orders";
import Wishlist from "./wishlist";
import Discounts from "./discounts";
import SecurityAndAccess from "./security-and-access";
import Notifications from "./notifications";
import useTabStore from "@/stores/useTabStore";

export default function AccountBody() {
  const { tab } = useTabStore();
  return (
    <>
      <Box sx={{ pt: "24px", pl: "24px" }}>
        {tab === "Personal Data" && <PersonalData />}
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
