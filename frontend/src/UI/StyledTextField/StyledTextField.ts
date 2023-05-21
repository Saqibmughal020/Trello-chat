import React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: "#051639",
    "& fieldset": {
      color: "#051639",
      fontFamily: "poppins",
      borderColor: "#051639",
    },
    "&:hover fieldset": {
      color: "#051639",
      borderColor: "#051639",
    },
    "&.Mui-focused fieldset": {
      color: "#051639",
      borderColor: "#051639",
    },
  },
});
