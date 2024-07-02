import React, { useState } from "react";
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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import { IProduct } from "@/components/home/hooks/types";
import { ToastContainer, toast } from "react-toastify";
import { useEditData } from "../../hook";

interface EditProductsProps {
  product: IProduct | null;
  setIsModalOpen: (isOpen: boolean) => void;
}

function EditProducts({ product, setIsModalOpen }: EditProductsProps) {
  const [disabled, setDisabled] = useState(false);
  const { register, handleSubmit } = useForm<IProduct>({
    defaultValues: product || ({} as IProduct),
  });

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

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              fullWidth
              label="Name Product"
              variant="outlined"
              {...register("name")}
              defaultValue={product?.name || ""}
            />
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              {...register("categoryName")}
              defaultValue={product?.categoryName || ""}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              {...register("longDescription")}
              defaultValue={product?.longDescription || ""}
            />
            <TextField
              fullWidth
              label="Intro"
              variant="outlined"
              {...register("shortDescription")}
              defaultValue={product?.shortDescription || ""}
            />
          </Box>
          <TextField
            fullWidth
            label="ImageUrl"
            variant="outlined"
            {...register("thumbnailImage")}
            defaultValue={product?.thumbnailImage || ""}
          />
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
