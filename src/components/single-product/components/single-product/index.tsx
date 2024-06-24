import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { CheckCircleRounded } from "@mui/icons-material";
import { IProduct } from "@/components/home/hooks/types";

import frameDelivery from "@/assets/images/single-product-assets/frameDelivery.svg";
import heart from "@/assets/images/single-product-assets/heart.svg";
import heartFill from "@/assets/images/heart-fill.svg";
import notification from "@/assets/images/single-product-assets/notification.svg";
import directboxSend from "@/assets/images/single-product-assets/directbox-send.svg";
import star from "@/assets/images/single-product-assets/Star.svg";
import { useIsInWishlist } from "@/components/shared/card/hooks";
import { addToWishlist } from "@/components/shared/card/services";

export default function SingleProduct({ product }: { product: IProduct }) {
  const { data: isInWishlist, invalidate } = useIsInWishlist(product?.id);
  const handleAddToWishList = async () => {
    await addToWishlist(product.id);
    invalidate();
  };
  const [selectedColor, setSelectedColor] = React.useState("neutral");
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value);
  };

  return (
    <Box display={"flex"} gap={"24px"} marginTop={"40px"}>
      <Box
        width={"496px"}
        height={"433px"}
        display={"flex"}
        flexDirection={"column"}
        gap={"24px"}
      >
        <Box
          sx={{
            backgroundImage: `url(${product?.thumbnailImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            minWidth: "300px",
          }}
          width={"100%"}
          height="338px"
        >
          <Box
            width={"20px"}
            display={"flex"}
            gap={"12px"}
            flexDirection={"column"}
          >
            <Box
              onClick={handleAddToWishList}
              component={"img"}
              src={isInWishlist ? heartFill.src : heart.src}
            />
            <Box component={"img"} src={notification.src} />
            <Box component={"img"} src={directboxSend.src} />
          </Box>
        </Box>
      </Box>
      <Box
        width={"343px"}
        height={"397px"}
        display={"flex"}
        flexDirection={"column"}
        gap={"32px"}
      >
        <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
          <Box>
            <Box>
              <Typography fontSize={"20px"}>{product?.name}</Typography>
            </Box>
            <Box display={"flex"} gap={"16px"}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                height={"24px"}
                borderRadius={"4px"}
                color={"white"}
                bgcolor={"#063A88"}
                px={"10px"}
                py={"7px"}
              >
                <Box
                  sx={{ marginBottom: "2px", marginRight: "4px" }}
                  component={"img"}
                  src={star.src}
                  height={"12px"}
                  width={"12px"}
                ></Box>
                <Typography sx={{ mt: "2px" }}>
                  {product?.customerRating}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box color={"#717171"}>sold {product?.numReviews}</Box>
            </Box>
          </Box>
          <Box component={"img"} src={frameDelivery.src} width={"327px"}></Box>
          <Box
            fontSize={"16px"}
            display={"flex"}
            gap={"40px"}
            alignItems={"center"}
          >
            <Typography>Select color</Typography>
            <Box display={"flex"}>
              <FormControl sx={{ display: "flex" }} component="fieldset">
                <RadioGroup
                  sx={{ display: "flex" }}
                  aria-label="color"
                  name="color"
                  value={selectedColor}
                  onChange={handleColorChange}
                >
                  <Box>
                    <FormControlLabel
                      value="black"
                      control={
                        <Radio
                          sx={{
                            color: "#959595",
                            "&.Mui-checked": { color: "#959595" },
                          }}
                          checkedIcon={<CheckCircleRounded />}
                        />
                      }
                      label={undefined}
                    />
                    <FormControlLabel
                      value="neutral"
                      control={
                        <Radio
                          sx={{
                            color: "#525252",
                            "&.Mui-checked": { color: "#525252" },
                          }}
                          checkedIcon={<CheckCircleRounded />}
                        />
                      }
                      label={undefined}
                    />
                  </Box>
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} width={"288px"} height={"160px"}>
          <Box
            width={"188px"}
            display={"flex"}
            flexDirection={"column"}
            gap={"16px"}
            color={"#717171"}
            paddingLeft={"24px"}
          >
            <li>Brand</li>
            <li>Model name</li>
          </Box>
          <Box
            width={"104px"}
            display={"flex"}
            flexDirection={"column"}
            gap={"16px"}
          >
            <dl>{product?.brandName}</dl>
            <dl>{product?.name.split(" ")[1]}</dl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
