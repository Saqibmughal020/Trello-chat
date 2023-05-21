// import OrderPlaced from "../../../hooks/order-placed";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Paper from "@mui/material/Paper";
// import ProductListHook from "../../../hooks/product-list";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";

const ProductHistory = () => {
  // const { productListData: productListData } = ProductListHook();
  // const [isData, setIsData] = React.useState(productListData);
  const { enqueueSnackbar } = useSnackbar();
  const deleteApiData = async (data: any) => {
    try {
      const res: any = await axios.delete(
        `${""}/product-list/${data.productId}.json`
      );
      const { status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar("Product is deleted ", {
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

  const deleteHandler = (value: any) => {
    // const rest = isData.filter(
    //   (item: any) => item?.productId !== value.productId
    // );
    // setIsData(rest);
    deleteApiData(value);
  };

  return (
    <Box className="page-style frequenlty-asked-question">
      <Box sx={{ p: 10, pt: 15 }}>
        <Typography variant="h4" sx={{ fontFamily: "poppins", color: "#fff" }}>
          Total Number Products
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
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Product ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "poppins",
                      fontWeight: 600,
                      color: "#154128",
                    }}
                  >
                    Action
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

export default ProductHistory;
