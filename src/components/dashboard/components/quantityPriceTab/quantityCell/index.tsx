import { Box, TableCell, TextField } from "@mui/material";
import React, { useState } from "react";

export default function QuantityCell({ row, register }) {
  const [quantitysRowToBeEdited, setQuantitysRowToBeEdited] = useState<
    number | null
  >(null);

  const handleQuantityCellClick = (rowId: number) => {
    setQuantitysRowToBeEdited(rowId);
  };

  return (
    <TableCell sx={{ width: "120px" }} align="left">
      {quantitysRowToBeEdited === row.id ? (
        <TextField
          sx={{
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
          id={`availableQuantity-${row.id}`}
          {...register(`availableQuantity-${row.id}`)}
          defaultValue={row.availableQuantity}
          autoFocus
        />
      ) : (
        <Box onClick={() => handleQuantityCellClick(row.id)}>
          {row.availableQuantity}
        </Box>
      )}
    </TableCell>
  );
}
