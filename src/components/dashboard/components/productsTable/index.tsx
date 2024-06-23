import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IProduct } from "@/components/home/hooks/types";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import DataSaverOnOutlinedIcon from "@mui/icons-material/DataSaverOnOutlined";
import Swal from "sweetalert2";
import { BASE_URL } from "@/constants/urls";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditProducts from "../editModal";
import AddProducts from "../addModal";
import { useGetAllDashboardProducts } from "../../hook";

export default function ProductsTable() {
  const { data, isLoading, error } = useGetAllDashboardProducts();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedProduct, setSelectedProduct] = React.useState<IProduct | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

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
    setIsEditModalOpen(true);
  };

  async function handleDelete(id: number) {
    console.log(id);
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
          text: "Item was deleted successfuly.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Someething went wrong.",
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

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
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

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: "35px",
          borderRadius: "10px",
          mb: "15px",
        }}
      >
        <Typography sx={{ pl: "15px", fontWeight: "medium", fontSize: "20px" }}>
          Add Product
        </Typography>
        <Button onClick={handleAdd}>
          <DataSaverOnOutlinedIcon fontSize="large" color="success" />
        </Button>
      </Box>
      <Box>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">Product Name</TableCell>
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
                      <TableCell align="center">
                        ${row.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">{row.categoryName}</TableCell>
                      <TableCell align="center">{row.brandName}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleEdit(row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(row.id)}>
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
          <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
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
                setIsModalOpen={setIsEditModalOpen}
              />
            </Box>
          </Modal>
          <Modal open={isAddModalOpen} onClose={handleCloseAddModal}>
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
              <AddProducts />
            </Box>
          </Modal>
        </Paper>
      </Box>
    </Box>
  );
}
