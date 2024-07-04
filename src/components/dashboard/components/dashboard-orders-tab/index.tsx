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
import { useGetAllOrders, useGetAllProductsToDashboard } from "../../hook";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditProducts from "../edit-modal";
import AddProducts from "../addProducts";
import { handleDelete } from "../../services";
import EditOrder from "../order-edit-modal";
import { IDashboardOrder } from "../../hook/type";

export default function DahsboardOrdersTab() {
  const { data, isLoading, error } = useGetAllOrders();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [isOrderEditModalOpen, setIsOrderEditModalOpen] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsOrderEditModalOpen(true);
  };

  const handleCloseModalEdit = () => {
    setIsOrderEditModalOpen(false);
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
    <Box>
      <Box>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "#cacaca" }} align="center">
                    User Id
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#cacaca" }} align="left">
                    Order Code
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#cacaca" }} align="left">
                    Placement Date
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#cacaca" }} align="center">
                    Order Total
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#cacaca" }} align="center">
                    Order Status
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#cacaca" }} align="center">
                    Receiver Name
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
                    <TableRow hover key={row.userId}>
                      <TableCell align="center">{row.userId}</TableCell>
                      <TableCell align="left">{row.orderCode}</TableCell>
                      <TableCell align="left">
                        {row.orderPlacementDate}
                      </TableCell>
                      <TableCell align="center">${row.orderTotal}</TableCell>
                      <TableCell align="center">{row.orderStatus}</TableCell>
                      <TableCell align="center">
                        {row.orderReceiverName}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleEdit(row)}>
                          <EditIcon />
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
            sx={{ mt: "10px" }}
          />
          <Modal open={isOrderEditModalOpen} onClose={handleCloseModalEdit}>
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
              <EditOrder
                order={selectedOrder}
                setIsOrderEditModalOpen={setIsOrderEditModalOpen}
              />
            </Box>
          </Modal>
        </Paper>
      </Box>
    </Box>
  );
}
