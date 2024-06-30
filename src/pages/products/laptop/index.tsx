import { categoryArray } from "@/components/product/components/category-filter-button";
import Products from "@/components/product/components";
import React from "react";
import { NextPageWithLayout } from "../../_app";
import MainLayout from "@/layout/mainLayout";

const LaptopPage: NextPageWithLayout = () => {
  return <Products productCategory={categoryArray.at(2)?.name}></Products>;
};

LaptopPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default LaptopPage;
