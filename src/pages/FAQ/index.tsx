import FAQ from "@/components/FAQ/components";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/layout/mainLayout";

const FAQPage: NextPageWithLayout = () => {
  return <FAQ />;
};

FAQPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default FAQPage;
