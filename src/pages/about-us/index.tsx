import AboutUs from "@/components/about-us/components";
import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/layout/mainLayout";

const AboutUsPage: NextPageWithLayout = () => {
  return <AboutUs />;
};

AboutUsPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default AboutUsPage;
