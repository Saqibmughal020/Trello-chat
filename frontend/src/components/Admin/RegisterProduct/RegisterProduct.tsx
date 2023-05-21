import React from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import { useSnackbar } from "notistack";
import axios from "axios";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { StyledTextField } from "../../../UI/StyledTextField/StyledTextField";
import {
  RegisterProductInitialValues,
  RegisterProductSchema,
} from "./RegisterData";
import Button from "@mui/material/Button";
import "./RegisterProduct.scss";
import { convertToBase64 } from "./convertToBase64";
const RegisterProduct = () => {
  const [producSizeVal, setProductSizeVal] = React.useState("");
  const [sizeHandler, setSizeHandler] = React.useState<any>([]);
  const [fileUpload, setFileUploaded] = React.useState<any>("");
  const [previewImage, setpreviewImage] = React.useState<any>("");
  const [fieldErrors, setfieldsError] = React.useState<any>(false);
  const { enqueueSnackbar } = useSnackbar();

  const fileUploadHandler = async (e: any) => {
    setpreviewImage(URL.createObjectURL(e.target.files[0]));
    const base64 = await convertToBase64(e.target.files[0]);
    setFileUploaded(base64);
  };
  const options = [
    { name: "All", category: "all" },
    { name: "kits", category: "kits" },
    { name: `Shin Guard`, category: "shinGuard" },
    { name: `Soccer Ball`, category: "football" },
    { name: "Gloves", category: "gloves" },
    { name: `Water Bottle`, category: "bottle" },
    { name: `Soccer Cleats`, category: "sneaker" },
  ];
  const addSizeHandler = () => {
    producSizeVal !== ""
      ? setSizeHandler((item: any) => {
          return [...item, producSizeVal];
        })
      : setSizeHandler(sizeHandler);
    setProductSizeVal("");
  };
  const handleSubmit = async (onSubmitData: any) => {
    // setRequestStatusGet(REQUEST_STATUS.LOADING);

    try {
      const res: any = await axios.post(
        `${""}/product-list.json`,
        onSubmitData
      );
      const { status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar("new Product Added Successfully", {
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
    } finally {
      console.log("in ideal State");
    }
  };
  const formik = useFormik({
    initialValues: RegisterProductInitialValues,
    validationSchema: RegisterProductSchema,
    onSubmit: (values: any, { resetForm }: any) => {
      const productValues = {
        ...values,
        image: fileUpload,
        productSize: sizeHandler,
      };
      if (previewImage !== "" && sizeHandler.length > 1) {
        handleSubmit(productValues);
        resetForm({ values: "" });
      } else {
        enqueueSnackbar("Please fill out the form", {
          variant: "error",
        });
      }
    },
  });

  return (
    <Box sx={{ borderRadius: 10, background: "#fff", p: 4 }}>
      <Box sx={{ mt: 5 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <StyledTextField
                fullWidth
                name="productName"
                label="Product Name"
                value={sizeHandler.length > 0 ? "" : formik.values.productName}
                onChange={formik.handleChange}
                error={
                  formik.touched.productName &&
                  Boolean(formik.errors.productName)
                }
                helperText={
                  formik.touched.productName && formik.errors.productName
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{
                    color:
                      formik.touched.category && Boolean(formik.errors.category)
                        ? "error.main"
                        : "#154128",
                    fontFamily: "poppins",
                    fontSize: 15,
                  }}
                >
                  Select Category
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  name="category"
                  label="Select Category"
                  id="demo-simple-select"
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                  onChange={formik.handleChange}
                  value={formik.values.category}
                  sx={{
                    ".MuiOutlinedInput-notchedOutline": {
                      borderRadius: "10px",
                      borderColor: "#154128",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#154128",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#154128",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "#154128 !important",
                    },
                  }}
                >
                  {options.map((data: any) => {
                    return (
                      <MenuItem value={data.category} key={data.category}>
                        {data.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {formik.touched.category && Boolean(formik.errors.category) && (
                  <Typography
                    variant="body2"
                    sx={{ fontSize: 12, color: "error.main", pt: 0.5, pl: 2 }}
                  >
                    {formik.errors.category}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <StyledTextField
                fullWidth
                name="price"
                label="Product Price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <StyledTextField
                fullWidth
                name="productSize"
                label="Product Sizes"
                type="text"
                value={producSizeVal}
                onChange={(event) => setProductSizeVal(event?.target.value)}
                error={fieldErrors && sizeHandler.length < 1}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddCircleOutlineIcon
                        sx={{
                          cursor: "pointer",
                          color:
                            fieldErrors && sizeHandler.length < 1
                              ? "error.main"
                              : "#154128",
                          textAlign: "end",
                        }}
                        onClick={() => addSizeHandler()}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {fieldErrors && sizeHandler.length < 1 && (
                <Typography
                  variant="body2"
                  sx={{ fontSize: 12, color: "error.main", pt: 0.5, pl: 2 }}
                >
                  Please Select Sizes of Product
                </Typography>
              )}
              <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
                {sizeHandler.length > 0 &&
                  sizeHandler.map((item: any, index: any) => (
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "poppins",
                        background: "#154128",
                        color: "#fff",
                        p: 0.5,
                        mt: 1,
                        mx: 0.5,
                        borderRadius: 2,
                      }}
                      key={index}
                    >
                      {item}
                    </Typography>
                  ))}
              </Box>
            </Grid>
            <Grid item sm={7} xs={12} mt={3}>
              <Box
                sx={{
                  textAlign: "start",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "poppins",
                    color:
                      fieldErrors && previewImage === ""
                        ? "error.main"
                        : "#154128",
                  }}
                >
                  Upload Product Image
                </Typography>
                <Box>
                  <TextField
                    error={fieldErrors && previewImage === ""}
                    type="file"
                    id="files"
                    name="electronicSignature"
                    onChange={fileUploadHandler}
                    sx={{ width: "80%" }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    m: "5px 0px",
                    fontFamily: "poppins",
                    color:
                      fieldErrors && previewImage === ""
                        ? "error.main"
                        : "#154128",
                  }}
                >
                  Supported Format 'png', 'jpg', 'jpeg'
                </Typography>
              </Box>
              {previewImage && (
                <Box
                  sx={{
                    mt: 4,
                    pl: 5,
                    width: "100px",
                    height: "100px",
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src={previewImage} alt="Thumb" />
                </Box>
              )}
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                fontSize: 20,
                textTransform: "none",
                fontFamily: "poppins",
                background: "#154127",
                borderRadius: "10px",
                "&:hover": {
                  background: " #154127",
                },
              }}
              onClick={() => setfieldsError(true)}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterProduct;
