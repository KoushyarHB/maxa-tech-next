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
  TextField,
  Button,
} from "@mui/material";
import { useGetAllDashboardProducts } from "@/components/dashboard/hook/index";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import PriceCell from "./priceCell";
import QuantityCell from "./quantityCell";

export default function QuantityPriceTab() {
  const { data, isLoading, error } = useGetAllDashboardProducts();
  const { register, handleSubmit } = useForm();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function onSubmit(data: any) {
    console.log(data);
  }

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
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>Error loading data</div>
      </Box>
    );
  }

  const rows = data || [];

  return (
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
                    <PriceCell row={row} register={register} />
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
  );
}
