import Edit from "@/assets/images/personal-data-icons/edit.svg";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { useGetUserInfo } from "../../hook";
import useShipmentCostStore from "@/stores/useShipmentCostStore";

const options = [
  {
    label: {
      title: "Free Shipping",
      time: "7-30 business days",
    },
    price: "$0",
    value: 0,
  },
  {
    label: {
      title: "Regular Shipping",
      time: "3-14 business days",
    },
    price: "$7.50",
    value: 7.5,
  },
  {
    label: {
      title: "Express Shipping",
      time: "1-3 business days",
    },
    price: "$22.50",
    value: 22.5,
  },
];

const UserInfo: React.FC = () => {
  const { shipmentCost, setShipmentCost } = useShipmentCostStore();
  // const [selectedValue, setSelectedValue] = React.useState(22.5);
  const { data: usersInfo } = useGetUserInfo();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setSelectedValue((event.target as HTMLInputElement).value);
    const chosenShipmentCost = Number((event.target as HTMLInputElement).value);
    setShipmentCost(chosenShipmentCost);
    console.log(chosenShipmentCost);
    // console.log(selectedValue);
  };

  return (
    <Stack direction={"column"}>
      <Card sx={{ width: "624px", height: "507px" }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" mb={0.5}>
                User
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#F6F6F6",
                  pl: 1.5,
                  py: 2,
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "300",
                }}
                width={"full"}
              >
                {usersInfo ? usersInfo.userName : "user"}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" mb={0.5}>
                Ship to
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#F6F6F6",
                  px: 1.5,
                  py: 2,
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "300",
                }}
                width={"full"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                {usersInfo ? usersInfo.address : "address"}
                <Box component={"img"} src={Edit.src} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" mb={0.5}>
                Shipping Method
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup value={shipmentCost} onChange={handleChange}>
                  {options.map((option) => (
                    <Box
                      key={option.value}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        backgroundColor:
                          shipmentCost === option.value ? "#e5eeff" : "#F6F6F6",
                        padding: 1,
                        marginBottom: 1,
                        borderRadius: "8px",
                        border:
                          shipmentCost === option.value
                            ? "1px solid #78ABF9"
                            : "#F6F6F6",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FormControlLabel
                          value={option.value}
                          control={<Radio sx={{ marginTop: -2 }} />}
                          label={
                            <Box>
                              <Typography variant="body1">
                                {option.label.title}
                              </Typography>
                              <Typography variant="body2" color={"#505050"}>
                                {option.label.time}
                              </Typography>
                            </Box>
                          }
                        />
                        <Typography
                          variant="body2"
                          color={"#505050"}
                          sx={{ marginLeft: "auto", marginTop: 2 }}
                        >
                          {option.price}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Link href={"/cart"} className="text-xl text-[#0C68F4] mx-5 my-8 ">
        Return to cart
      </Link>
    </Stack>
  );
};
export default UserInfo;
