import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "../../../../UI/StyledTextField/StyledTextField.scss";
import { StyledTextField } from "../../../../UI/StyledTextField/StyledTextField";
import Typography from "@mui/material/Typography";
import AccountsDetailHook from "../../../../hooks/accounts-detail";
import { useAppDispatch } from "../../../../store/store";
import { setIsLoggedIn } from "../../../../store/slices/auth-account/authAccountSlice";
import { setLoggedInfo } from "../../../../store/slices/auth-account/authAccountSlice";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, InputLabel, Link } from "@mui/material";
import { endpoints } from "../../../../config";
import { apiPostRequest } from "../../../../helpers";
import { useSnackbar } from "notistack";
import { logInAccountSchema, LoginAccountInitialValues } from "./LoginFormData";
import CreateRoom from "../create-room/CreateRoom";
import { REQUEST_STATUS } from "../../../../constants/request-status";
import { AiFillDelete } from "react-icons/ai";

const LoginForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [openRoom, setOpenRoom] = React.useState(false);
  const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.IDEL);
  const onSubmitHandler = async (payload: any) => {
    setRequestStatus(REQUEST_STATUS.LOADING);
    const payloadData = localStorage.getItem("roomId")
      ? { roomId: localStorage.getItem("roomId"), ...payload }
      : payload;
    let message = null;
    try {
      const res: any = await apiPostRequest(endpoints.authlogin, payloadData);
      const { data, status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar(data?.message || "Otp send Successfully", {
            variant: "success",
          });
          setRequestStatus(REQUEST_STATUS.SUCCESS);
          localStorage.setItem("otpmail", payload.email);
          localStorage.removeItem("roomId");
          navigate("/verify-otp");
          break;
        default:
          setRequestStatus(REQUEST_STATUS.FAILURE);
          message = data?.message || "Something Went Wrong";
          enqueueSnackbar(data?.message, {
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
    initialValues: LoginAccountInitialValues,
    validationSchema: logInAccountSchema,
    onSubmit: (values) => {
      onSubmitHandler(values);
    },
  });
  const deleteRoomIdHandler = () => {
    localStorage.removeItem("roomId");
    window.location.reload();
  };
  return (
    <Box sx={{ minHeight: 450 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={requestStatus === "loading"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
        LogIn
      </Typography>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <InputLabel
            id={"name"}
            sx={{ color: "#051639", fontWeight: 500, fontFamily: "poppins" }}
          >
            Name
          </InputLabel>
          <StyledTextField
            fullWidth
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ my: 2 }}
          />
          <InputLabel
            id={"email"}
            sx={{ color: "#051639", fontWeight: 500, fontFamily: "poppins" }}
          >
            Email
          </InputLabel>
          <StyledTextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ my: 2 }}
          />
          {localStorage.getItem("roomId") && (
            <Box sx={{ display: "flex", justifyContent: "right", py: 2 }}>
              <Typography
                sx={{
                  color: "#198754",
                  textAlign: "center",
                  fontFamily: "poppins",
                  fontWeight: 500,
                }}
              >
                Your Room is Created
              </Typography>
              <Box
                sx={{ cursor: "pointer", px: 2 }}
                onClick={deleteRoomIdHandler}
              >
                <AiFillDelete size={22} color={"#051639"} />
              </Box>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              type="submit"
              // loading={requestStatus==="loading"}
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
              LogIn
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              // variant="outlined"
              type="button"
              sx={{
                borderRadius: "10px",
                fontSize: 20,
                textTransform: "none",
                fontFamily: "poppins",
                color: "#011339",
                borderColor: "#011339",
                "&:hover": {
                  color: "#011339",
                  borderColor: "#011339",
                },
              }}
              onClick={() => setOpenRoom(true)}
            >
              Want To Create Room ?
            </Button>
          </Box>
        </form>
      </Box>
      <CreateRoom openModel={openRoom} setOpenModel={setOpenRoom} />
    </Box>
  );
};

export default LoginForm;
