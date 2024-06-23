import Account from "@/components/account/components";
import { NextPageWithLayout } from "../_app";
import SecondaryLayout from "@/layout/secondaryLayout";

const AccountPage: NextPageWithLayout = () => {
  return <Account />;
};

AccountPage.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>;
};

export default AccountPage;
