import { Box, Grid } from "@mui/material";
import React from "react";
import TabTitle from "../../tab-title";
import { useGetUserWishlist } from "@/components/account/hooks";
import Card from "@/components/shared/card/components";

export default function Wishlist() {
  const { data: itemsInUserWishlist } = useGetUserWishlist();

  return (
    <Box>
      <TabTitle
        firstTitle={"Wish list"}
        secondTitle={"See your favorite items here"}
      />
      <Grid
        container
        spacing={0}
        sx={{
          maxWidth: "912px",
          margin: "0 auto",
        }}
      >
        {itemsInUserWishlist?.map((item) => (
          <Grid sx={{ mb: "20px" }} item key={item.id} xs={12} sm={6} md={4}>
            <Card cardProps={item} hoverMode={{ hoverMode: "productHover" }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
