import { Box, Stack, Typography } from "@mui/material";
import Card from "../shared/card/components";

export default function Cart() {
    
  return (
    <Box>
      <Box></Box>
      <Stack direction={"row"}></Stack>
      <Stack direction={"column"}>
        <Typography>
          Customers who viewed items in your browsing history also viewed
        </Typography>
        <Card cardProps={{}} hoverMode={{hoverMode:"productHover"}}/>
      </Stack>
    </Box>
  );
}
