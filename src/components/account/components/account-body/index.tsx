import { Box } from "@mui/material";
import PersonalData from "./personal-data";
import Orders from "./orders";
import Wishlist from "./wishlist";

type AccountBodyProps = {
  tab: string;
};

export default function AccountBody({ tab }: AccountBodyProps) {
  return (
    <>
      <Box sx={{ p: "24px" }}>
        {tab === "Personal Data" && <PersonalData />}
        {tab === "Orders" && <Orders />}
        {tab === "Wishlist" && <Wishlist />}
        {tab === "Discounts" && <PersonalData />}
        {tab === "Security & Access" && <PersonalData />}
        {tab === "Notifications" && <PersonalData />}
        {tab === "Contact Us" && <PersonalData />}
        {tab === "Log Out" && <PersonalData />}
      </Box>
    </>
  );
}
