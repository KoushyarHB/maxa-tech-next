import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  CircularProgress,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import PriceCell from "./priceCell";
import QuantityCell from "./quantityCell";
import { useEditQuantityPrice, useGetAllProductsToDashboard } from "../../hook";
import { IProduct } from "@/components/home/hooks/types";
import { ToastContainer, toast } from "react-toastify";
import { updatePrices } from "../../services";

export default function QuantityPriceTab() {
  const { data, isLoading, error } = useGetAllProductsToDashboard();
  const { register, handleSubmit } = useForm();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pricesRowToBeEdited, setPricesRowToBeEdited] = useState<number | null>(
    null
  );
  const [priceRowsToBeUpdated, setPriceRowsToBeUpdated] = useState(new Set());

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const mutation = useEditQuantityPrice();

  const onSubmit = (data: IProduct) => {
    console.log(data);
    console.log(priceRowsToBeUpdated);
    let dataToBeUpdated = [];
    for (let key in data) {
      if (priceRowsToBeUpdated.has(key)) {
        dataToBeUpdated.push([key.split("-")[1], data[key]]);
      }
      // if (!key) {
      //   dataToBeUpdated.push({ key });
      // }
    }
    console.log(dataToBeUpdated);
    updatePrices(dataToBeUpdated);
    const product = rows?.find((row) => row.id === data.id);

    // console.log(product);
    // console.log(data.id);
    if (product) {
      console.log("ok");
      mutation.mutate(
        { id: product.id, product: data },
        {
          onSuccess: () => {
            toast.success("Product updated successfully");
          },
          onError: () => {
            toast.error("Failed to update product");
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading data, please wait...
        </Typography>
      </Box>
    );
  }

  if (error) {
    console.error("Error loading data:", error);
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          Error loading data: {error.message}
        </Typography>
      </Box>
    );
  }

  const rows = data || [];
  console.log(pricesRowToBeEdited);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "70px" }} align="center">
                    ID
                  </TableCell>
                  <TableCell sx={{ width: "150px" }} align="left">
                    Image
                  </TableCell>
                  <TableCell align="left">Product Name</TableCell>
                  <TableCell sx={{ width: "150px" }} align="center">
                    Price ($)
                  </TableCell>
                  <TableCell align="left">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={row.id}>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="left">
                        <Box
                          component="img"
                          src={row.thumbnailImage}
                          alt="Product"
                          style={{ width: 50, height: 50 }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <PriceCell
                        row={row}
                        register={register}
                        pricesRowToBeEdited={pricesRowToBeEdited}
                        setPricesRowToBeEdited={setPricesRowToBeEdited}
                        setPriceRowsToBeUpdated={setPriceRowsToBeUpdated}
                        priceRowsToBeUpdated={priceRowsToBeUpdated}
                      />
                      <QuantityCell row={row} register={register} />
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "end", mx: "10px" }}>
            <Button
              variant="contained"
              type="submit"
              startIcon={<SendIcon />}
              sx={{
                bgcolor: "#4caf50",
                "&:hover": { bgcolor: "#388e3c" },
                mb: "10px",
                mt: "10px",
              }}
              title="Update Product"
            >
              Update Product
            </Button>
          </Box>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </form>
      <ToastContainer />
    </>
  );
}
