import { Box, TableCell, TextField } from "@mui/material";
import React, { useState } from "react";

export default function PriceCell({
  row,
  register,
  pricesRowToBeEdited,
  setPricesRowToBeEdited,
  setPriceRowsToBeUpdated,
  priceRowsToBeUpdated,
}) {
  // const [pricesRowToBeEdited, setPricesRowToBeEdited] = useState<number | null>(
  //   null
  // );
  const [priceHasChanged, setPriceHasChanged] = useState(false);
  const [price, setPrice] = useState(row.price);

  // const handlePriceCellClick = (rowId: number) => {
  //   setPricesRowToBeEdited(rowId);
  // };

  function detectPriceChange(prc: string) {
    // console.log(+price);
    console.log(prc);
    if (row.price !== +prc) {
      setPriceHasChanged(true);
      setPriceRowsToBeUpdated(priceRowsToBeUpdated.add(`price-${row.id}`));
    } else {
      setPriceHasChanged(false);
    }
  }
  const handlePriceCellClick = (rowId: number, onBlurFunction: () => void) => {
    setPricesRowToBeEdited(rowId);
    onBlurFunction();
  };

  function blurChange() {
    console.log("hi");
    // setPricesRowToBeEdited(null);
  }
  // console.log(priceHasChanged);
  return (
    <TableCell align="center">
      {pricesRowToBeEdited === row.id ? (
        <TextField
          // focused={pricesRowToBeEdited === row.id }
          // autoFocus
          onBlur={blurChange}
          // sx={{
          //   textAlign: "center",
          //   "& fieldset": {
          //     border: "none",
          //     textAlign: "center",
          //   },
          //   border: "solid 1px red",
          //   width: "100%",
          //   backgroundColor: priceHasChanged ? "red" : null,
          //   borderRadius: "4px",
          //   "& input[type=number]": {
          //     MozAppearance: "textfield",
          //     WebkitAppearance: "textfield",
          //   },
          //   "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
          //     {
          //       WebkitAppearance: "none",
          //       margin: 0,
          //     },
          //   "& input[type=number]::-moz-spin-button": {
          //     MozAppearance: "none",
          //     margin: 0,
          //   },
          // }}
          type="number"
          id={`price-${row.id}`}
          {...register(`price-${row.id}`)}
          // defaultValue={row.price?.toFixed(2)}
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            detectPriceChange(e.target.value);
          }}
          variant="outlined"
        />
      ) : (
        <Box
          onClick={() => handlePriceCellClick(row.id, blurChange)}
          sx={{ backgroundColor: priceHasChanged ? "red" : null }}
        >
          {price}
        </Box>
      )}
    </TableCell>
  );
}
