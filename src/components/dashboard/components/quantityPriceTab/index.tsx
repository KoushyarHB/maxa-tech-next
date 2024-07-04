import { IProduct } from "@/components/home/hooks/types";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import {
  useGetAllProductsToDashboard,
  useUpdatePrices,
  useUpdateQuantities,
} from "../../hook";
import PriceCell from "./priceCell";
import QuantityCell from "./quantityCell";

export default function QuantityPriceTab() {
  const { data, isLoading, error } = useGetAllProductsToDashboard();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { register, handleSubmit } = useForm();
  const [priceRowToBeEdited, setPriceRowToBeEdited] = useState<number | null>(
    null
  );
  const [priceRowsToBeUpdated, setPriceRowsToBeUpdated] = useState(new Set());
  const [quantityRowToBeEdited, setQuantityRowToBeEdited] = useState<
    number | null
  >(null);
  const [quantityRowsToBeUpdated, setQuantityRowsToBeUpdated] = useState(
    new Set()
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const priceUpdateMutation = useUpdatePrices();
  const quantityUpdateMutation = useUpdateQuantities();

  const onSubmit = (data: IProduct) => {
    // let dataToBeUpdated = [];
    // for (let key in data) {
    //   if (priceRowsToBeUpdated.has(key)) {
    //     dataToBeUpdated.push([key.split("-")[1], data[key]]);
    //   }
    // }
    // console.log(dataToBeUpdated);
    // priceUpdateMutation.mutate(dataToBeUpdated);
    // setPriceRowToBeEdited(null);
    let dataToBeUpdatedForPrices = [];
    let dataToBeUpdatedForQuantities = [];

    for (let key in data) {
      if (priceRowsToBeUpdated.has(key)) {
        dataToBeUpdatedForPrices.push([key.split("-")[1], data[key]]);
      }
      if (quantityRowsToBeUpdated.has(key)) {
        dataToBeUpdatedForQuantities.push([key.split("-")[1], data[key]]);
      }
    }

    console.log("Price data to be updated:", dataToBeUpdatedForPrices);
    console.log("Quantity data to be updated:", dataToBeUpdatedForQuantities);

    priceUpdateMutation.mutate(dataToBeUpdatedForPrices);
    quantityUpdateMutation.mutate(dataToBeUpdatedForQuantities);

    setPriceRowToBeEdited(null);
    setQuantityRowToBeEdited(null);
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
                  <TableCell sx={{ width: "150px" }} align="center">
                    Quantity
                  </TableCell>
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
                        priceRowToBeEdited={priceRowToBeEdited}
                        setPriceRowToBeEdited={setPriceRowToBeEdited}
                        setPriceRowsToBeUpdated={setPriceRowsToBeUpdated}
                        priceRowsToBeUpdated={priceRowsToBeUpdated}
                      />
                      <QuantityCell
                        row={row}
                        register={register}
                        quantityRowToBeEdited={quantityRowToBeEdited}
                        setQuantityRowToBeEdited={setQuantityRowToBeEdited}
                        setQuantityRowsToBeUpdated={setQuantityRowsToBeUpdated}
                        quantityRowsToBeUpdated={quantityRowsToBeUpdated}
                      />
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
