import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { StaticImageData } from "next/image";
import Link from "next/link";

interface CategoriesType {
  id?: number;
  image?: StaticImageData;
  title?: string;
  url: string;
}

export default function CategoryCard({ image, title, url }: CategoriesType) {
  const imgSrc = image ? image.src : "";
  return (
    <Link href={`/products/${url}`}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          m: 1,
        }}
      >
        <CardActionArea>
          <Box sx={{ px: 3 }} component="img" src={imgSrc} alt="category" />
          <CardContent>
            <Typography
              gutterBottom
              variant="body1"
              component="h6"
              color="GrayText"
              sx={{
                fontSize: 16,
                textAlign: "center",
                ":hover": { textDecoration: "underline" },
              }}
            >
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
