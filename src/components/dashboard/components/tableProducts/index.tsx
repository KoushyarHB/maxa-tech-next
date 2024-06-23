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
import { useGetAllProductsToDashboard } from "../../hook";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditProducts from "../modalEdit";
import AddProducts from "../addProducts";
import { handleDelete } from "../../services";

export default function TableProducts() {
  const { data, isLoading, error } = useGetAllProductsToDashboard();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedProduct, setSelectedProduct] = React.useState<IProduct | null>(
    null
  );
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = React.useState(false);

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
    setIsModalEditOpen(true);
  };

  const handleCloseModalEdit = () => {
    setIsModalEditOpen(false);
  };
  const handleCloseModalAdd = () => {
    setIsModalAddOpen(false);
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
    setIsModalAddOpen(true);
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
                  <TableCell sx={{ backgroundColor: "#cacaca" }} align="center">
                    ID
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#cacaca" }} align="left">
                    Image
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#cacaca" }} align="left">
                    NameProducts
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#cacaca" }} align="center">
                    Price
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#cacaca" }} align="center">
                    Category
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#cacaca" }} align="center">
                    Brand
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#cacaca" }} align="center">
                    Actions
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
          <Modal open={isModalEditOpen} onClose={handleCloseModalEdit}>
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
                borderRadius: "5px",
              }}
            >
              <EditProducts
                product={selectedProduct}
                setIsModalOpen={setIsModalEditOpen}
              />
            </Box>
          </Modal>
          <Modal open={isModalAddOpen} onClose={handleCloseModalAdd}>
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
                borderRadius: "5px",
              }}
            >
              <AddProducts setIsModalOpen={setIsModalAddOpen} />
            </Box>
          </Modal>
        </Paper>
      </Box>
    </Box>
  );
}
