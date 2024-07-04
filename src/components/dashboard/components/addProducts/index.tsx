import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import { usePostData } from "../../hook";
import { IProduct } from "@/components/home/hooks/types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import closeCircle from "@/assets/images/close-circle.png";

interface AddProductsProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

function AddProducts({ setIsModalOpen }: AddProductsProps) {
  const [disabled, setDisabled] = useState(true);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const { mutate } = usePostData();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IProduct>();

  useEffect(() => {
    if (base64Image) {
      setValue("thumbnailImage", base64Image);
    }
  }, [base64Image, setValue]);

  const onSubmit = (formData: IProduct) => {
    const data = {
      ...formData,
      id: formData.id ? +formData.id : 0,
      price: formData.price ? +formData.price : 0,
      customerRating: Math.round(Math.random() * 5 * 10) / 10,
      numReviews: Math.floor(Math.random() * 5000),
      upc: Math.random().toString(36).substring(7),
      currency: "USD",
      availableOnline: Math.random() < 0.5,
      availableInStore: Math.random() < 0.5,
      seller: "Random Seller",
      sellerId: "random123",
      largeImage: "https://example.com/random-large-image.jpg",
    };

    if (!disabled) {
      data.discount = {
        percent: formData.discount?.percent,
        startDate: formData.discount?.startDate,
        endDate: formData.discount?.endDate,
      };
    }

    mutate(data, {
      onSuccess: (response: any) => {
        if (
          response.message === "Product with the same ID or name already exists"
        ) {
          toast.warning(response.message);
        } else {
          toast.success("Product added successfully");
          setIsModalOpen(false);
          reset();
        }
      },
      onError: (error: any) => {
        toast.error(`Product not added successfully: ${error.message}`);
        console.error(error);
      },
    });
    console.log(data);
  };

  const handleClick = () => {
    setDisabled((prev) => !prev);
    if (disabled) {
      setValue("discount.percent", 0);
      setValue("discount.startDate", "");
      setValue("discount.endDate", "");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveUploadedImage = () => {
    setBase64Image(null);
    setValue("thumbnailImage", "");
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <Stack
          sx={{ justifyContent: "space-between", mb: "20px" }}
          direction={"row"}
        >
          <Box flexGrow={1}></Box>
          <Box
            onClick={() => setIsModalOpen(false)}
            sx={{ cursor: "pointer" }}
            component={"img"}
            src={closeCircle.src}
          ></Box>
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic-id"
              label="Product ID"
              variant="outlined"
              {...register("id", {
                required: "ID is required",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "ID must be a number",
                },
              })}
              error={!!errors.id}
              helperText={errors.id?.message}
            />
            <TextField
              fullWidth
              id="outlined-basic-name"
              label="Product Name"
              variant="outlined"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth
              id="outlined-basic-category"
              label="Category"
              variant="outlined"
              {...register("categoryName", {
                required: "Category is required",
              })}
              error={!!errors.categoryName}
              helperText={errors.categoryName?.message}
            />
            <TextField
              fullWidth
              id="outlined-basic-category"
              label="Brand"
              variant="outlined"
              {...register("brandName", {
                required: "Brand name is required",
              })}
              error={!!errors.brandName}
              helperText={errors.brandName?.message}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic-price"
              label="Available Quantity"
              variant="outlined"
              {...register("availableQuantity", {
                required: "Available quantity is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Available quantity must be a valid number",
                },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
            <TextField
              fullWidth
              id="outlined-basic-price"
              label="Price"
              variant="outlined"
              {...register("price", {
                required: "Price is required",
                pattern: {
                  value: /^[0-9]+([.][0-9]{1,2})?$/,
                  message:
                    "Price must be a valid number (up to 2 decimal places)",
                },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <TextField
              fullWidth
              id="outlined-basic-description"
              label="Description"
              variant="outlined"
              {...register("longDescription", {
                required: "Description is required",
              })}
              error={!!errors.longDescription}
              helperText={errors.longDescription?.message}
            />
            <TextField
              fullWidth
              id="outlined-basic-intro"
              label="Intro"
              variant="outlined"
              {...register("shortDescription", {
                required: "Intro is required",
              })}
              error={!!errors.shortDescription}
              helperText={errors.shortDescription?.message}
            />
          </Box>
          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            defaultValue={base64Image}
            {...register("thumbnailImage", {
              required: "Image URL is required",
            })}
            error={!!errors.thumbnailImage}
            helperText={errors.thumbnailImage?.message}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {base64Image && (
              <>
                Image uploaded:
                <Box
                  onClick={() => handleRemoveUploadedImage()}
                  sx={{ cursor: "pointer", color: "red", width: "20px" }}
                  component={"img"}
                  src={closeCircle.src}
                ></Box>
                <Box
                  component={"img"}
                  src={base64Image}
                  sx={{ width: "60px" }}
                ></Box>
                <Typography sx={{ wordBreak: "break-all" }}>
                  {base64Image.slice(0, 30)}...
                </Typography>
              </>
            )}
          </Box>
          <FormControlLabel
            sx={{
              display: "block",
            }}
            control={
              <Switch
                checked={!disabled}
                onChange={handleClick}
                name="disabled"
                color="primary"
              />
            }
            label="Discount"
          />
          <Accordion sx={{ width: "100%", mx: "auto" }} disabled={disabled}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography sx={{ fontSize: "16px", color: "#717171" }}>
                Discount
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <TextField
                  fullWidth
                  id="outlined-basic-percent"
                  label="Percent"
                  variant="outlined"
                  {...register("discount.percent", {
                    pattern: {
                      value: /^[0-9]+([.][0-9]{1,2})?$/,
                      message:
                        "Percent must be a valid number (up to 2 decimal places)",
                    },
                  })}
                  error={!!errors.discount?.percent}
                  helperText={errors.discount?.percent?.message}
                />
                <TextField
                  fullWidth
                  id="outlined-basic-start-date"
                  label="Start Date"
                  variant="outlined"
                  type="date"
                  {...register("discount.startDate")}
                  disabled={disabled}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  id="outlined-basic-end-date"
                  label="End Date"
                  variant="outlined"
                  type="date"
                  {...register("discount.endDate")}
                  disabled={disabled}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ width: "100%", mx: "auto" }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography sx={{ fontSize: "16px", color: "#717171" }}>
                Dimensions
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <TextField
                  fullWidth
                  id="outlined-basic-width"
                  label="Width"
                  variant="outlined"
                  {...register("dimensions.width", {
                    pattern: {
                      value: /^[0-9]+([.][0-9]{1,2})?$/,
                      message:
                        "Width must be a valid number (up to 2 decimal places)",
                    },
                    required: "Width is required",
                  })}
                  error={!!errors.dimensions?.width}
                  helperText={errors.dimensions?.width?.message}
                />
                <TextField
                  fullWidth
                  id="outlined-basic-height"
                  label="Height"
                  variant="outlined"
                  {...register("dimensions.height", {
                    pattern: {
                      value: /^[0-9]+([.][0-9]{1,2})?$/,
                      message:
                        "Height must be a valid number (up to 2 decimal places)",
                    },
                    required: "Height is required",
                  })}
                  error={!!errors.dimensions?.height}
                  helperText={errors.dimensions?.height?.message}
                />
                <TextField
                  fullWidth
                  id="outlined-basic-depth"
                  label="Depth"
                  variant="outlined"
                  {...register("dimensions.depth", {
                    pattern: {
                      value: /^[0-9]+([.][0-9]{1,2})?$/,
                      message:
                        "Depth must be a valid number (up to 2 decimal places)",
                    },
                    required: "Depth is required",
                  })}
                  error={!!errors.dimensions?.depth}
                  helperText={errors.dimensions?.depth?.message}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<CancelIcon />}
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SendIcon />}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default AddProducts;
