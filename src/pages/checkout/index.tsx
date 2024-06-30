import Checkout from "@/components/checkout/components/Checkout";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/layout/mainLayout";

const CheckoutPage: NextPageWithLayout = () => {
  return <Checkout />;
};

CheckoutPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default CheckoutPage;
