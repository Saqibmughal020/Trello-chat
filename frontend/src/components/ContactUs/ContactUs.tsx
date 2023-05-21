import React from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import { useSnackbar } from "notistack";
import axios from "axios";
import { StyledTextField } from "../../UI/StyledTextField/StyledTextField";
import { ContactUsSchema, ContactUsInitialValues } from "./ContactUsData";
import Button from "@mui/material/Button";

const ContactUs = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (onSubmitData: any) => {
    try {
      const res: any = await axios.post(
        `${""}/contact-us.json`,
        onSubmitData
      );
      const { status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar("Your Information is Submitted", {
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

  const formik = useFormik({
    initialValues: ContactUsInitialValues,
    validationSchema: ContactUsSchema,
    onSubmit: (values: any, { resetForm }: any) => {
      handleSubmit(values);
      resetForm({ values: "" });
    },
  });
  return (
    <Box
      className="page-style frequenlty-asked-question"
      sx={{ paddingTop: 20 }}
    >
      <Box sx={{ p: 10 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontFamily: "poppins", color: "#fff" }}
          >
            Contact Us
          </Typography>
          <Box sx={{ py: 4 }}>
            <input value="" placeholder="Search" type="search" />
          </Box>
        </Box>
        <Box sx={{ borderRadius: 10, background: "#fff", p: 4 }}>
          <Box sx={{ mt: 5 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                  <StyledTextField
                    fullWidth
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <StyledTextField
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    name="message"
                    label="Message"
                    type="text"
                    multiline
                    rows={5}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.message && Boolean(formik.errors.message)
                    }
                    helperText={formik.touched.message && formik.errors.message}
                  />
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
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;
