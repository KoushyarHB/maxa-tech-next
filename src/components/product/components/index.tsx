import BreadCrumbs from "@/components/shared/bread-crumbs";
import { Box, Typography } from "@mui/material";
import { StaticImageData } from "next/dist/shared/lib/get-img-props";
import { useEffect, useState } from "react";
import { useGetAllProducts } from "../hooks";
import CategoryFilterButton, { categoryArray } from "./category-filter-button";
import ProductCards from "./products";
import Sidebar from "./sidebar";
import SortProduct from "./sort-products";

type ProductPropsType = {
  productCategory?: string;
};

function Products({ productCategory }: ProductPropsType) {
  const [category, setCategory] = useState(productCategory);
  const { data, isLoading } = useGetAllProducts(category);

  const baseBreadCrumbsArray = [
    ["Home", "/"],
    ["Products", "/products"],
  ];
  const breadCrumbsArray = productCategory
    ? [
        ...baseBreadCrumbsArray,
        [
          productCategory,
          `/products/${
            categoryArray.find((item) => item.name === productCategory)
              ?.routeName
          }`,
        ],
      ]
    : baseBreadCrumbsArray;

  const [headImageSrc, setHeadImageSrc] = useState<
    StaticImageData | undefined
  >();

  useEffect(() => {
    if (productCategory === "Smart Phone") {
      setHeadImageSrc(categoryArray.at(0)?.image);
    }
    if (productCategory === "Camera") {
      setHeadImageSrc(categoryArray.at(1)?.image);
    }
    if (productCategory === "Laptop") {
      setHeadImageSrc(categoryArray.at(2)?.image);
    }
    if (productCategory === "Smart Watch") {
      setHeadImageSrc(categoryArray.at(3)?.image);
    }
    if (productCategory === "Gaming") {
      setHeadImageSrc(categoryArray.at(4)?.image);
    }
    if (productCategory === "Accessories") {
      setHeadImageSrc(categoryArray.at(5)?.image);
    }
  }, [productCategory]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <BreadCrumbs array={breadCrumbsArray} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {productCategory ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            width={"100%"}
            height={300}
            mb={"48px"}
          >
            <Box
              sx={{
                backgroundImage: `url(${headImageSrc?.src})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center top",
                backgroundSize: "cover",
                width: "100%",
                height: "300px",
                borderRadius: "24px",
              }}
            >
              <Typography p={10} fontWeight={"700"} fontSize={"70px"}>
                {productCategory}
              </Typography>
            </Box>
          </Box>
        ) : (
          <CategoryFilterButton setCategory={setCategory} />
        )}
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
