import closeCircle from "@/assets/images/close-circle.png";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { IDashboardOrder } from "../../hook/type";
import { useEditOrder } from "../../hook";
import CartItem from "@/components/shared/cart-item/CartItem";

interface EditOrderProps {
  order: IDashboardOrder | null;
  setIsOrderEditModalOpen: (isOpen: boolean) => void;
}

function EditOrder({ order, setIsOrderEditModalOpen }: EditOrderProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: order || ({} as IDashboardOrder),
  });
  console.log(order?.orderItems);

  const orderMutation = useEditOrder();

  const onSubmit = (data: IDashboardOrder) => {
    console.log(data);
    orderMutation.mutate({ id: data.userId, order: data });
    setIsOrderEditModalOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={{ justifyContent: "space-between", mb: "20px" }}
          direction={"row"}
        >
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "28px", fontWeight: "600" }}>
              Order Info:
            </Typography>
          </Box>
          <Box
            onClick={() => setIsOrderEditModalOpen(false)}
            sx={{ cursor: "pointer", width: "36px", height: "36px" }}
            component={"img"}
            src={closeCircle.src}
          ></Box>
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              fullWidth
              id="outlined-basic-name"
              label="User ID"
              variant="outlined"
              {...register("userId")}
              error={!!errors.userId}
              helperText={errors.userId?.message}
              disabled
            />
            <TextField
              fullWidth
              id="outlined-basic-category"
              label="Order Code"
              variant="outlined"
              {...register("orderCode", {
                required: "Order code is required",
              })}
              error={!!errors.orderCode}
              helperText={errors.orderCode?.message}
              disabled
            />
          </Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              fullWidth
              id="outlined-basic-category"
              label="Placement Date"
              variant="outlined"
              {...register("orderPlacementDate", {
                required: "Placement date is required",
              })}
              error={!!errors.orderPlacementDate}
              helperText={errors.orderPlacementDate?.message}
            />
            <TextField
              fullWidth
              id="outlined-basic-description"
              label="Order Total"
              variant="outlined"
              {...register("orderTotal", {
                required: "Order Total is required",
              })}
              error={!!errors.orderTotal}
              helperText={errors.orderTotal?.message}
            />
          </Box>
          <Typography sx={{ fontSize: "28px", fontWeight: "600" }}>
            Order Items:
          </Typography>
          <Grid container>
            {order?.orderItems.map((item) => (
              <Grid item sx={{ mb: "10px" }} xs={6} key={item.productId}>
                <CartItem cartItemProps={item} changeComponent="payment" />
              </Grid>
            ))}
          </Grid>
          <Typography sx={{ fontSize: "28px", fontWeight: "600" }}>
            Receiver Info:
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              sx={{ width: "70%" }}
              id="outlined-basic-description"
              label="Receiver Address"
              variant="outlined"
              {...register("orderAddress", {
                required: "Order Address is required",
              })}
              error={!!errors.orderAddress}
              helperText={errors.orderAddress?.message}
            />
            <TextField
              sx={{ flexGrow: 1 }}
              id="outlined-basic-intro"
              label="Postal Code"
              variant="outlined"
              {...register("orderPostalCode", {
                required: "Receiver name is required",
              })}
              error={!!errors.orderPostalCode}
              helperText={errors.orderPostalCode?.message}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <TextField
              fullWidth
              id="outlined-basic-intro"
              label="Receiver Name"
              variant="outlined"
              {...register("orderReceiverName", {
                required: "Receiver name is required",
              })}
              error={!!errors.orderReceiverName}
              helperText={errors.orderReceiverName?.message}
            />
            <TextField
              fullWidth
              id="outlined-basic-intro"
              label="Phone Number"
              variant="outlined"
              {...register("orderPhoneNumber", {
                required: "Receiver name is required",
              })}
              error={!!errors.orderReceiverName}
              helperText={errors.orderReceiverName?.message}
            />
          </Box>
          <FormControl sx={{ width: "30%" }} error={!!errors.orderStatus}>
            <InputLabel id="order-status-label">Order Status</InputLabel>
            <Select
              labelId="order-status-label"
              id="outlined-basic-status"
              label="Order Status"
              {...register("orderStatus", {
                required: "Order status is required",
              })}
              defaultValue={order?.orderStatus || ""}
            >
              <MenuItem value="current">Current</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="canceled">Canceled</MenuItem>
              <MenuItem value="returned">Returned</MenuItem>
            </Select>
            {errors.orderStatus && (
              <Typography color="error" variant="caption">
                {errors.orderStatus.message}
              </Typography>
            )}
          </FormControl>
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
              onClick={() => setIsOrderEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              startIcon={<SendIcon />}
              sx={{ bgcolor: "#4caf50", "&:hover": { bgcolor: "#388e3c" } }}
            >
              Update Order
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default EditOrder;
