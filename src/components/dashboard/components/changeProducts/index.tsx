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
  IconButton,
  Modal,
  Box,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditProducts from "../edit-modal"; // Adjust the import based on your file structure
import { useGetAllProductsToDashboard } from "@/components/dashboard/hook/index";
import { IProduct } from "@/components/home/hooks/types";
import Swal from "sweetalert2";
import { BASE_URL } from "@/constants/urls";
import axios from "axios";

const ChangeProducts: React.FC = () => {
  const { data, isLoading, error } = useGetAllProductsToDashboard();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  async function handleDelete(id: number) {
    const result = await Swal.fire({
      title: "Sure you want to delete this item?",
      text: "This action is irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I'm sure",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/products/${id}`);
        Swal.fire({
          title: "Deleted",
          text: "Item was deleted successfully.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong.",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Canceled",
        text: "Deletion canceled.",
        icon: "info",
      });
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">NameProducts</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Actions</TableCell>
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
                  <TableCell align="center">${row.price.toFixed(2)}</TableCell>
                  <TableCell align="center">{row.categoryName}</TableCell>
                  <TableCell align="center">{row.brandName}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id!)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <EditProducts
            product={selectedProduct}
            setIsModalOpen={setIsModalOpen}
          />
        </Box>
      </Modal>
    </Paper>
  );
};

export default ChangeProducts;
