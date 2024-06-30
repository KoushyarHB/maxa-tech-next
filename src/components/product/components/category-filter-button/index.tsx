import accessories from "@/assets/images/categories-icons/Accessories.svg";
import camera from "@/assets/images/categories-icons/camera.svg";
import gaming from "@/assets/images/categories-icons/game.svg";
import smartPhone from "@/assets/images/categories-icons/mobile.svg";
import laptop from "@/assets/images/categories-icons/monitor.svg";
import smartWatch from "@/assets/images/categories-icons/watch-status.svg";
import accessories2 from "@/assets/images/category-page-images/acc.png";
import camera2 from "@/assets/images/category-page-images/camera.png";
import gaming2 from "@/assets/images/category-page-images/gaming.png";
import laptop2 from "@/assets/images/category-page-images/laptop.png";
import smartPhone2 from "@/assets/images/category-page-images/smartphone.png";
import smartWatch2 from "@/assets/images/category-page-images/smartwatch.png";
import { Box, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";

export const categoryArray = [
  {
    id: 1,
    src: smartPhone,
    name: "Smart Phone",
    image: smartPhone2,
    routeName: "smart-phone",
  },
  {
    id: 2,
    src: camera,
    name: "Camera",
    image: camera2,
    routeName: "camera",
  },

  {
    id: 3,
    src: laptop,
    name: "Laptop",
    image: laptop2,
    routeName: "laptop",
  },
  {
    id: 4,
    src: smartWatch,
    name: "Smart Watch",
    image: smartWatch2,
    routeName: "smart-watch",
  },
  {
    id: 5,
    src: gaming,
    name: "Gaming",
    image: gaming2,
    routeName: "gaming",
  },
  {
    id: 6,
    src: accessories,
    name: "Accessories",
    image: accessories2,
    routeName: "accessories",
  },
];

function CategoryFilterButton({
  setCategory = () => {},
}: {
  setCategory?: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (name: string) => {
    setActiveCategory(name);
    setCategory(name);
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "32px", mb: "48px" }}>
      {categoryArray.map((item) => (
        <Box
          onClick={() => handleCategoryClick(item.name)}
          key={item.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "108px",
            padding: "8px",
            cursor: "pointer",
            borderBottom:
              activeCategory === item.name ? "3px solid #1b8cee" : "none",
          }}
        >
          <CardMedia
            sx={{ width: "48px", height: "48px" }}
            component="img"
            image={item.src.src}
            alt={item.name}
          />
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            sx={{
              fontSize: "20px",
              color: "#444444",
              fontWeight: "300",
              textAlign: "center",
            }}
          >
            {item.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default CategoryFilterButton;
