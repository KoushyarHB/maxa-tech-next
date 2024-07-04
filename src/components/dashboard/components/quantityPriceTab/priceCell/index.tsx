import { Box, TableCell, TextField } from "@mui/material";
import { useState } from "react";

export default function PriceCell({
  row,
  register,
  priceRowToBeEdited,
  setPriceRowToBeEdited,
  setPriceRowsToBeUpdated,
  priceRowsToBeUpdated,
}) {
  // const [priceHasChanged, setPriceHasChanged] = useState(false);
  const [price, setPrice] = useState(row.price);

  function detectPriceChange(prc: string) {
    if (row.price !== +prc) {
      // setPriceHasChanged(true);
      setPriceRowsToBeUpdated(priceRowsToBeUpdated.add(`price-${row.id}`));
    } else {
      // setPriceHasChanged(false);
    }
  }

  const handlePriceCellClick = (rowId: number) => {
    setPriceRowToBeEdited(rowId);
  };

  return (
    <TableCell align="center">
      {priceRowToBeEdited === row.id ? (
        <TextField
          type="number"
          id={`price-${row.id}`}
          {...register(`price-${row.id}`)}
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            detectPriceChange(e.target.value);
          }}
          variant="outlined"
        />
      ) : (
        <Box
          onClick={() => handlePriceCellClick(row.id)}
          // sx={{ backgroundColor: priceHasChanged ? "red" : null }}
        >
          {price}
        </Box>
      )}
    </TableCell>
  );
}
