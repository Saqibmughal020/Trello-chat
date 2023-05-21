import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { useSnackbar } from "notistack";
const OrderHistory = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState("");
  const [checkId, set_Id] = React.useState("");
  const expandHandler = (val: any) => {
    set_Id(val);
    setOpen(!open);
  };
  const selectedData = ["Pending", "Cancel", "Done", "InProgress"];
  const updateOrderData = async (data: any) => {
    try {
      const res: any = await axios.put(`""/order-placed.json`, data);
      const { status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar("Product Status is Updated", {
            variant: "success",
          });
          break;
        default:
          enqueueSnackbar("Some Thing Went Wrong", {
            variant: "error",
          });
          break;
      }
    } catch (error) {
      enqueueSnackbar("Some Thing Went Wrong", {
        variant: "error",
      });
    } 
  };

  // const handleChange = (event: any, val: any, id: any) => {
  //   const updatedCartStatus = [...allBookedOrder];
  //   const selectedUser = allBookedOrder.find((item: any) => item.id === id);
  //   const itemIndex = selectedUser?.orderPlacedItems.findIndex(
  //     (item: any) => item.productId === val.productId
  //   );
  //   const newTodo = [...selectedUser?.orderPlacedItems];
  //   const restVal = selectedUser.orderPlacedItems[itemIndex];
  //   newTodo[itemIndex] = {
  //     ...restVal,
  //     status: event.target.value as string,
  //   };
  //   const indexNumber = allBookedOrder.findIndex((item: any) => item.id === id);
  //   const rest = allBookedOrder[indexNumber];
  //   updatedCartStatus[indexNumber] = {
  //     ...rest,
  //     orderPlacedItems: newTodo,
  //   };
  //   setSize(event.target.value as string);
  //   updateOrderData(updatedCartStatus);
  // };

  return (
    <Box className="page-style frequenlty-asked-question">
      <Box sx={{ p: 10, pt: 15 }}>
        <Typography variant="h4" sx={{ fontFamily: "poppins", color: "#fff" }}>
          Total Number of Order
        </Typography>
        <Box
          sx={{
            mt: 4,
            borderRadius: 10,
            background: "#fff",
            p: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    ID
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderHistory;
