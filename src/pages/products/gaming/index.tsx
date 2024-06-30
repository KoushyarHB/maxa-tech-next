import { categoryArray } from "@/components/product/components/category-filter-button";
import Products from "@/components/product/components";
import React from "react";
import { NextPageWithLayout } from "../../_app";
import MainLayout from "@/layout/mainLayout";

const GamingPage: NextPageWithLayout = () => {
  return <Products productCategory={categoryArray.at(4)?.name}></Products>;
};

GamingPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default GamingPage;
