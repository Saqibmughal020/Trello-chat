import React from "react";
import { CustomModel } from "../custom-model";
import { Grid, Typography, InputLabel, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StyledTextField } from "../../UI/StyledTextField/StyledTextField";
import { useFormik } from "formik";
import {
  CreateGroupInitialValues,
  CreateGroupSchema,
} from "./CreateGroupInitialValue";
import { useAppSelector } from "../../store/store";
import { useSnackbar } from "notistack";
import SocketConnectionHook from "../../hooks/socket-connection-hook";
import { setGroupCreateApiHit } from "../../store/slices/api-hit/apiHitSlice";
import { useAppDispatch } from "../../store/store";
import io from "socket.io-client";
// import { TeamMemberInitialValues, TeamMemberSchema } from "./TeamMemberSchema";
const CreateSubGroup = ({ openModel, setOpenModel }: any) => {
  const { enqueueSnackbar } = useSnackbar();

  // const socketConnection = io();
  const { socketConnection: socketConnection } = SocketConnectionHook();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    socketConnection?.on("success", async (data: any) => {
      enqueueSnackbar(data?.success || "group created successfully", {
        variant: "success",
      });
      dispatch(setGroupCreateApiHit(true));
      setOpenModel(false);
      console.log(data, "group Created");
    });
    socketConnection?.on("error", async (data: any) => {
      enqueueSnackbar(data?.error || "failed to Create group", {
        variant: "error",
      });
      console.log(data, "group Created");
    });

    return () => {
      socketConnection?.off("success");
    };
  }, [socketConnection]);

  const onSubmitHandler = async (value: any) => {
    const createGroupPromise = new Promise((resolve, reject) => {
      socketConnection?.emit(
        "createGroup",
        JSON.stringify({
          groupName: value.groupName,
          groupDiscription: value.groupDiscription,
        }),
        (data: any) => {
          resolve(data);
        }
      );
    });
    formik.resetForm();
    const amitFunction = await createGroupPromise;
  };

  const formik = useFormik({
    initialValues: CreateGroupInitialValues,
    validationSchema: CreateGroupSchema,
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
              Create New Group
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
              id={"email"}
              sx={{ color: "#051639", fontWeight: 500, fontFamily: "poppins" }}
            >
              Group Name
            </InputLabel>
            <StyledTextField
              fullWidth
              name="groupName"
              label="Group Name"
              value={formik.values.groupName}
              onChange={formik.handleChange}
              error={
                formik.touched.groupName && Boolean(formik.errors.groupName)
              }
              helperText={formik.touched.groupName && formik.errors.groupName}
              sx={{ my: 2 }}
            />
            <InputLabel
              id={"groupDiscription"}
              sx={{ color: "#051639", fontWeight: 500, fontFamily: "poppins" }}
            >
              Group Description
            </InputLabel>
            <StyledTextField
              fullWidth
              name="groupDiscription"
              label="Group Description"
              value={formik.values.groupDiscription}
              onChange={formik.handleChange}
              error={
                formik.touched.groupDiscription &&
                Boolean(formik.errors.groupDiscription)
              }
              helperText={
                formik.touched.groupDiscription &&
                formik.errors.groupDiscription
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
                Create Group
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </CustomModel>
  );
};

export default CreateSubGroup;
