import Products from "@/components/product/components";
import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/layout/mainLayout";

const ProductsPage: NextPageWithLayout = () => {
  return <Products />;
};

ProductsPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default ProductsPage;
