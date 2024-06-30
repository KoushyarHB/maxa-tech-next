import Payment from "@/components/payment/components/Payment";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/layout/mainLayout";

const PaymentPage: NextPageWithLayout = () => {
  return <Payment />;
};

PaymentPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default PaymentPage;
