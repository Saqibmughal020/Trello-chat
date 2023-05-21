import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import RegisterProduct from "../RegisterProduct/RegisterProduct";
const AdminDashboard = () => {
  return (
    <Box
      className="page-style frequenlty-asked-question"
      sx={{ paddingTop: 20 }}
    >
      <Box sx={{ p: 10 }}>
        <Typography variant="h4" sx={{ fontFamily: "poppins", color: "#fff", py:2 }}>
          Register New Product
        </Typography>
        <RegisterProduct />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
