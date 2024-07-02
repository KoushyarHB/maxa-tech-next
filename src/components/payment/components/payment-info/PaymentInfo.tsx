import paypal from "@/assets/images/payment-images/paypal.svg";
import { useGetUserInfo } from "@/components/checkout/hook";
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
import { useState } from "react";
const options = [
  {
    label: "Credit card",
    value: "option1",
  },
  {
    label: <Box component={"img"} src={paypal.src} />,
    value: "option2",
  },
];

export default function PaymentInfo() {
  const [selectedValue, setSelectedValue] = useState("");
  const { data: usersInfo } = useGetUserInfo();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue((event.target as HTMLInputElement).value);
  };

  return (
    <Stack direction={"column"}>
      <Card sx={{ width: "624px", height: "289px", padding: 1, paddingX: 2 }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h6" mb={0.5}>
                Payment
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup value={selectedValue} onChange={handleChange}>
                  {options.map((option) => (
                    <Box
                      key={option.value}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#F6F6F6",
                        paddingY: 0.4,
                        px: 1,
                        marginBottom: 1,
                        borderRadius: "8px",
                      }}
                    >
                      <FormControlLabel
                        value={option.value}
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography fontSize="14px" fontWeight={"300"}>
                              {option.label}
                            </Typography>
                          </Box>
                        }
                      />
                    </Box>
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" mb={0.5}>
                Billing address
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#F6F6F6",
                  px: 1.5,
                  py: 1.5,
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "300",
                }}
                width={"full"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                {usersInfo ? usersInfo.address : "address"}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Link href={"/checkout"} className="text-xl text-[#0C68F4] mx-5 my-8 ">
        Return to checkout
      </Link>
    </Stack>
  );
}
