import accessories from "@/assets/images/categories-images/accessories.png";
import camera from "@/assets/images/categories-images/camera.png";
import gaming from "@/assets/images/categories-images/gaming.png";
import laptop from "@/assets/images/categories-images/laptop.png";
import smartPhone from "@/assets/images/categories-images/smartphone.png";
import smartWatch from "@/assets/images/categories-images/smartwatch.png";
import { Box, Container } from "@mui/material";
import CategoryCard from "./category-card";

const categories = [
  {
    id: "1",
    image: accessories,
    title: "Accessories",
    url: "accessories",
  },
  {
    id: "2",
    image: camera,
    title: "Camera",
    url: "camera",
  },
  {
    id: "3",
    image: laptop,
    title: "Laptop",
    url: "laptop",
  },
  {
    id: "4",
    image: smartPhone,
    title: "Smart Phone",
    url: "smart-phone",
  },
  {
    id: "5",
    image: gaming,
    title: "Gaming",
    url: "gaming",
  },
  {
    id: "6",
    image: smartWatch,
    title: "Smart Watch",
    url: "smart-watch",
  },
];

export default function CategoriesBox() {
  return (
    <Container disableGutters>
      <Box
        sx={{
          marginBottom: "48px",
          display: "flex",
          gap: 1,
          justifyContent: "center",
        }}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            image={category.image}
            title={category.title}
            url={category.url}
          />
        ))}
      </Box>
    </Container>
  );
}
