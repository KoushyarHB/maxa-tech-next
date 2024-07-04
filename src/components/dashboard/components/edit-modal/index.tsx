import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import { IProduct } from "@/components/home/hooks/types";
import { ToastContainer, toast } from "react-toastify";
import { useEditData } from "../../hook";
import closeCircle from "@/assets/images/close-circle.png";

interface EditProductsProps {
  product: IProduct | null;
  setIsModalOpen: (isOpen: boolean) => void;
}

function EditProducts({ product, setIsModalOpen }: EditProductsProps) {
  const [disabled, setDisabled] = useState(false);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IProduct>({
    defaultValues: product || ({} as IProduct),
  });

  useEffect(() => {
    if (base64Image) {
      setValue("thumbnailImage", base64Image);
    }
  }, [base64Image, setValue]);

  const mutation = useEditData();

  const onSubmit = (data: IProduct) => {
    if (product) {
      mutation.mutate(
        { id: product.id, product: data },
        {
          onSuccess: () => {
            toast.success("Product updated successfully");
            setIsModalOpen(false);
          },
          onError: () => {
            toast.error("Failed to update product");
          },
        }
      );
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Box sx={{ display: "flex", gap: "10px" }}>
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
          <Box sx={{ display: "flex", gap: "10px" }}>
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
            label="ImageUrl"
            variant="outlined"
            {...register("thumbnailImage")}
            defaultValue={product?.thumbnailImage || ""}
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
            control={
              <Switch
                checked={!disabled}
                onChange={() => setDisabled(!disabled)}
              />
            }
            label="Discount"
          />
          <Accordion disabled={disabled}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography>Discount</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <TextField
                  fullWidth
                  label="Percent"
                  variant="outlined"
                  {...register("discount.percent")}
                  defaultValue={product?.discount?.percent || ""}
                />
                <TextField
                  fullWidth
                  label="Start Date"
                  variant="outlined"
                  {...register("discount.startDate")}
                  defaultValue={product?.discount?.startDate || ""}
                />
                <TextField
                  fullWidth
                  label="End Date"
                  variant="outlined"
                  {...register("discount.endDate")}
                  defaultValue={product?.discount?.endDate || ""}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography>Dimensions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <TextField
                  fullWidth
                  label="Width"
                  variant="outlined"
                  {...register("dimensions.width")}
                  defaultValue={product?.dimensions?.width || ""}
                />
                <TextField
                  fullWidth
                  label="Height"
                  variant="outlined"
                  {...register("dimensions.height")}
                  defaultValue={product?.dimensions?.height || ""}
                />
                <TextField
                  fullWidth
                  label="Depth"
                  variant="outlined"
                  {...register("dimensions.depth")}
                  defaultValue={product?.dimensions?.depth || ""}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              color="error"
              startIcon={<CancelIcon />}
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              startIcon={<SendIcon />}
              sx={{ bgcolor: "#4caf50", "&:hover": { bgcolor: "#388e3c" } }}
            >
              Update Product
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default EditProducts;
