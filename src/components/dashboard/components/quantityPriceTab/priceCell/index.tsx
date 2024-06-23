import { Box, TableCell, TextField } from "@mui/material";
import React, { useState } from "react";

export default function PriceCell({ row, register }) {
  const [pricesRowToBeEdited, setPricesRowToBeEdited] = useState<number | null>(
    null
  );

  const handlePriceCellClick = (rowId: number) => {
    setPricesRowToBeEdited(rowId);
  };

  return (
    <TableCell align="center">
      {pricesRowToBeEdited === row.id ? (
        <TextField
          sx={{
            textAlign: "center",
            "& fieldset": {
              border: "none",
              textAlign: "center",
            },
            width: "100%",
            backgroundColor: "#AECDFB",
            borderRadius: "4px",
            "& input[type=number]": {
              MozAppearance: "textfield",
              WebkitAppearance: "textfield",
            },
            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
              {
                WebkitAppearance: "none",
                margin: 0,
              },
            "& input[type=number]::-moz-spin-button": {
              MozAppearance: "none",
              margin: 0,
            },
          }}
          type="number"
          id={`price-${row.id}`}
          {...register(`price-${row.id}`)}
          defaultValue={row.price.toFixed(2)}
        />
      ) : (
        <Box onClick={() => handlePriceCellClick(row.id)}>
          {row.price.toFixed(2)}
        </Box>
      )}
    </TableCell>
  );
}
