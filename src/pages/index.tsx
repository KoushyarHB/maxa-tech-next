import Home from "@/components/home/components";
import { NextPageWithLayout } from "./_app";
import MainLayout from "@/layout/mainLayout";

const HomePage: NextPageWithLayout = () => {
  return <Home />;
};

HomePage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
