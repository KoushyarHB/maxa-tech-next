// import { Box, TableCell, TextField } from "@mui/material";
// import React, { useState } from "react";

// export default function QuantityCell({ row, register }) {
//   const [quantitysRowToBeEdited, setQuantitysRowToBeEdited] = useState<
//     number | null
//   >(null);

//   const handleQuantityCellClick = (rowId: number) => {
//     setQuantitysRowToBeEdited(rowId);
//   };

//   return (
//     <TableCell sx={{ width: "120px" }} align="left">
//       {quantitysRowToBeEdited === row.id ? (
//         <TextField
//           sx={{
//             "& fieldset": {
//               border: "none",
//               textAlign: "center",
//             },
//             width: "100%",
//             backgroundColor: "#AECDFB",
//             borderRadius: "4px",
//             "& input[type=number]": {
//               MozAppearance: "textfield",
//               WebkitAppearance: "textfield",
//             },
//             "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
//               {
//                 WebkitAppearance: "none",
//                 margin: 0,
//               },
//             "& input[type=number]::-moz-spin-button": {
//               MozAppearance: "none",
//               margin: 0,
//             },
//           }}
//           type="number"
//           id={`availableQuantity-${row.id}`}
//           {...register(`availableQuantity-${row.id}`)}
//           defaultValue={row.availableQuantity}
//           autoFocus
//         />
//       ) : (
//         <Box onClick={() => handleQuantityCellClick(row.id)}>
//           {row.availableQuantity}
//         </Box>
//       )}
//     </TableCell>
//   );
// }

import { Box, TableCell, TextField } from "@mui/material";
import { useState } from "react";

export default function QuantityCell({
  row,
  register,
  quantityRowToBeEdited,
  setQuantityRowToBeEdited,
  setQuantityRowsToBeUpdated,
  quantityRowsToBeUpdated,
}) {
  // const [priceHasChanged, setPriceHasChanged] = useState(false);
  const [quantity, setQuantity] = useState(row.availableQuantity);

  function detectQuantityChange(prc: string) {
    if (row.quantity !== +prc) {
      // setquantityHasChanged(true);
      setQuantityRowsToBeUpdated(
        quantityRowsToBeUpdated.add(`quantity-${row.id}`)
      );
    } else {
      // setquantityHasChanged(false);
    }
  }

  const handleQuantityCellClick = (rowId: number) => {
    setQuantityRowToBeEdited(rowId);
  };

  return (
    <TableCell align="center">
      {quantityRowToBeEdited === row.id ? (
        <TextField
          type="number"
          id={`quantity-${row.id}`}
          {...register(`quantity-${row.id}`)}
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            detectQuantityChange(e.target.value);
          }}
          variant="outlined"
        />
      ) : (
        <Box
          onClick={() => handleQuantityCellClick(row.id)}
          // sx={{ backgroundColor: priceHasChanged ? "red" : null }}
        >
          {quantity}
        </Box>
      )}
    </TableCell>
  );
}
