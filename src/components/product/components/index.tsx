import { Box, Breadcrumbs, Link } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "./sidebar";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CategoryFilterButton from "./category-filter-button";
import ProductCards from "./products";
import { useGetAllProducts } from "../hooks";
import SortProduct from "./sort-products";

function Products() {
  const [category, setCategory] = useState("");
  const { data, isLoading } = useGetAllProducts(category);
  const breadcrumbs = [
    <Link
      sx={{ fontSize: "18px" }}
      underline="hover"
      key="1"
      color="inherit"
      href="/"
    >
      Home
    </Link>,
    <Link
      sx={{ fontSize: "18px" }}
      underline="hover"
      key="2"
      color="text.primary"
      href="/products"
    >
      Products
    </Link>,
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack sx={{ mb: "48px" }} spacing={2} p={2}>
        <Breadcrumbs
          separator={
            <NavigateNextIcon fontSize="large" sx={{ color: "#717171" }} />
          }
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CategoryFilterButton setCategory={setCategory} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          gap: 1,
        }}
      >
        {/* <Chips /> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          position: "relative",
          gap: "24px",
        }}
      >
        <Box sx={{ width: "288px" }}>
          <Sidebar />
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: 0,
          }}
        >
          <SortProduct />
        </Box>
        <Box
          sx={{
            width: "912px",
            mt: "72px",
          }}
        >
          <ProductCards data={data} isLoading={isLoading} />
        </Box>
      </Box>
    </Box>
  );
}

export default Products;
