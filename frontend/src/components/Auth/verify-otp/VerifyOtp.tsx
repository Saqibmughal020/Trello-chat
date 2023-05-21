import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { StyledTextField } from "../../../UI/StyledTextField/StyledTextField";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../../store/store";
import {
  setIsLoggedIn,
  setLoggedInfo,
  setUserData,
} from "../../../store/slices/auth-account/authAccountSlice";
import { Box, Card, CardContent, InputLabel, Link } from "@mui/material";
import { endpoints } from "../../../config";
import { apiPostRequest } from "../../../helpers";
import { useSnackbar } from "notistack";
import { OtpSchema, VerifyOTPInitialValue } from "./VerifyOtpSchema";
import { REQUEST_STATUS } from "../../../constants/request-status";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { setToken } from "../../../helpers/Tokens";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.IDEL);

  //------------------------------------------
  const resendOTPHandler = async () => {
    setRequestStatus(REQUEST_STATUS.LOADING);
    let message = null;
    try {
      const res: any = await apiPostRequest(endpoints.resendOTP, {
        email: localStorage.getItem("otpmail"),
      });
      const { data, status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar(data?.response.message, {
            variant: "success",
          });
          setRequestStatus(REQUEST_STATUS.SUCCESS);
          break;
        default:
          setRequestStatus(REQUEST_STATUS.FAILURE);
          message = data?.response.message || "Something Went Wrong";
          enqueueSnackbar(message, {
            variant: "error",
          });
          break;
      }
    } catch (error: any) {
      setRequestStatus(REQUEST_STATUS.FAILURE);
      message = error;
    }
  };
  //------------------------------------------

  const onSubmitHandler = async (values: any) => {
    setRequestStatus(REQUEST_STATUS.LOADING);
    let message = null;
    try {
      const res: any = await apiPostRequest(endpoints.otpVerification, {
        otp: Number(values.otp),
        email: localStorage.getItem("otpmail"),
      });
      const { data, status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar(data?.response.message, {
            variant: "success",
          });
          setRequestStatus(REQUEST_STATUS.SUCCESS);
          setToken(data?.response.token);
          dispatch(setIsLoggedIn(true));
          dispatch(setLoggedInfo(String(localStorage.getItem("otpmail"))));
          dispatch(setUserData(data?.response));
          localStorage.setItem("islogged", String(true));
          localStorage.setItem(
            "userEmail",
            String(localStorage.getItem("otpmail"))
          );
          localStorage.removeItem("otpmail");
          navigate("/");
          break;
        default:
          setRequestStatus(REQUEST_STATUS.FAILURE);
          message = data?.response.message || "Something Went Wrong";
          enqueueSnackbar(message, {
            variant: "error",
          });
          break;
      }
    } catch (error: any) {
      message = error?.response?.data?.err?.message || "Something Went Wrong";
      setRequestStatus(REQUEST_STATUS.FAILURE);
      enqueueSnackbar(message, {
        variant: "error",
      });
    }
  };
  const formik = useFormik({
    initialValues: VerifyOTPInitialValue,
    validationSchema: OtpSchema,
    onSubmit: (values) => {
      onSubmitHandler(values);
    },
  });
  return (
    <Box
      sx={{
        flexGrow: 1,
        px: 10,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        background: "#011339",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={requestStatus === "loading"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Card
        sx={{
          minWidth: 800,
          margin: "auto",
          borderRadius: "20px",
          background: "#dae1f0",
          boxShadow: " 0px 4px 25px rgba(168, 215, 255, 0.4)",
        }}
      >
        <CardContent>
          <Box sx={{ minHeight: 400 }}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                fontFamily: "poppins",
                fontWeight: 500,
                color: "#011339",
                pt: 5,
              }}
            >
              Wellcome to Trello Chat
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#011339",
                textAlign: "center",
                fontFamily: "poppins",
                fontWeight: 500,
                pt: 5,
              }}
            >
              Verify OTP
            </Typography>
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <InputLabel
                  id={"email"}
                  sx={{
                    color: "#051639",
                    fontWeight: 500,
                    fontFamily: "poppins",
                  }}
                >
                  Enter OTP
                </InputLabel>
                <StyledTextField
                  fullWidth
                  name="otp"
                  label="OTP"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  error={formik.touched.otp && Boolean(formik.errors.otp)}
                  helperText={formik.touched.otp && formik.errors.otp}
                  sx={{ my: 2 }}
                />
                <Typography
                  onClick={resendOTPHandler}
                  sx={{
                    cursor: "pointer",
                    color: "#011339",
                    textAlign: "end",
                    fontFamily: "poppins",
                    fontWeight: 500,
                    py: 2,
                    pr: 2,
                  }}
                >
                  Resend OTP
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      fontSize: 20,
                      textTransform: "none",
                      fontFamily: "poppins",
                      background: "#011339",
                      borderRadius: "10px",
                      "&:hover": {
                        background: " #011339",
                      },
                    }}
                  >
                    Verify OTP
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VerifyOtp;
