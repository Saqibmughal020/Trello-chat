import React from "react";
import { CustomModel } from "../../../../common/custom-model";
import { Grid, Typography, InputLabel, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StyledTextField } from "../../../../UI/StyledTextField/StyledTextField";
import { useFormik } from "formik";
import {
  CreateRoomSchema,
  CreateRoomInitialValues,
} from "./CreateRoomFormValue";
import { REQUEST_STATUS } from "../../../../constants/request-status";
import { useSnackbar } from "notistack";
import { apiPostRequest } from "../../../../helpers";
import { endpoints } from "../../../../config";
// import { TeamMemberInitialValues, TeamMemberSchema } from "./TeamMemberSchema";
const CreateRoom = ({ openModel, setOpenModel }: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.IDEL);

  const onSubmitHandler = async (value: any) => {
    setRequestStatus(REQUEST_STATUS.LOADING);
    let message = null;
    try {
      const res: any = await apiPostRequest(endpoints.createRoom, value);
      const { data, status } = res;
      switch (status) {
        case 200:
          enqueueSnackbar(
            data?.response.message || "Room Created Successfully",
            {
              variant: "success",
            }
          );
          setRequestStatus(REQUEST_STATUS.SUCCESS);
          localStorage.setItem("roomId", data?.response?.room?._id);
          setOpenModel(false);
          formik.resetForm();
          break;
        case 400:
          enqueueSnackbar(
            data?.response.message || "Room Already Exist",
            {
              variant: "error",
            }
          );
          break;
        default:
          setRequestStatus(REQUEST_STATUS.FAILURE);
          message = data?.err.message || "Something Went Wrong";
          enqueueSnackbar(message, {
            variant: "error",
          });
          break;
      }
    } catch (error: any) {
      setRequestStatus(REQUEST_STATUS.FAILURE);
      message = error?.response?.data?.err?.message || "Something Went Wrong";
      enqueueSnackbar(message, {
        variant: "error",
      });
    } finally {
    }
  };
  const formik = useFormik({
    initialValues: CreateRoomInitialValues,
    validationSchema: CreateRoomSchema,
    onSubmit: (values) => {
      onSubmitHandler(values);
    },
  });
  return (
    <CustomModel open={openModel} setOpen={setOpenModel}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography
              sx={{
                color: "#051639",
                fontSize: "24px",
                fontWeight: 600,
              }}
            >
              Create Room
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "end" }}>
            <CloseIcon
              sx={{
                fontFamily: "Poppins",
                color: "#051639",
                fontSize: "24px",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => setOpenModel(false)}
            />
          </Grid>
          <Grid item xs={12} sx={{ margin: "auto" }}>
            <InputLabel
              id={"roomName"}
              sx={{ color: "#051639", fontWeight: 500, fontFamily: "poppins" }}
            >
              Room Name
            </InputLabel>
            <StyledTextField
              fullWidth
              name="roomName"
              label="Room Name"
              value={formik.values.roomName}
              onChange={formik.handleChange}
              error={formik.touched.roomName && Boolean(formik.errors.roomName)}
              helperText={formik.touched.roomName && formik.errors.roomName}
              sx={{ my: 2 }}
            />
            <InputLabel
              id={"description"}
              sx={{ color: "#051639", fontWeight: 500, fontFamily: "poppins" }}
            >
              Room Description
            </InputLabel>
            <StyledTextField
              fullWidth
              name="description"
              label="Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              sx={{ my: 2 }}
            />
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
                Create Room
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </CustomModel>
  );
};

export default CreateRoom;
