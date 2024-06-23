import SingleProductWidget from "@/components/single-product/components";
import MainLayout from "@/layout/mainLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React from "react";

const SingleProductPage: NextPageWithLayout = () => {
  return <SingleProductWidget />;
};

SingleProductPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default SingleProductPage;
