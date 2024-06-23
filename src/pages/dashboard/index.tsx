import Dashboard from "@/components/dashboard/components";
import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/layout/mainLayout";

const DashboardPage: NextPageWithLayout = () => {
  return <Dashboard />;
};

DashboardPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default DashboardPage;
