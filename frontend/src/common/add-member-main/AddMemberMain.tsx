import React from "react";
import { CustomModel } from "../custom-model";
import { Grid, Typography, InputLabel, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StyledTextField } from "../../UI/StyledTextField/StyledTextField";
import { useFormik } from "formik";
import { TeamMemberInitialValues, TeamMemberSchema } from "./TeamMemberSchema";
import SocketConnectionHook from "../../hooks/socket-connection-hook";
import { useSnackbar } from "notistack";
const AddMemberMain = ({ openModel, setOpenModel, groupId }: any) => {
  const { socketConnection: socketConnection } = SocketConnectionHook();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    openModel &&
      socketConnection?.on("error", async (data: any) => {
        console.log(data, "error");
        enqueueSnackbar(data?.error || "failed to add member", {
          variant: "error",
        });
      });
    setOpenModel(false);
    return () => {
      openModel && socketConnection?.off("error");
    };
  }, [socketConnection]);

  React.useEffect(() => {
    openModel &&
      socketConnection?.on("success", async (data: any) => {
        console.log(data, "success");
        setOpenModel(false);
        enqueueSnackbar(
          data?.success || "member added successfully successfully",
          {
            variant: "success",
          }
        );
      });

    return () => {
      openModel && socketConnection?.off("success");
    };
  }, [socketConnection]);

  const formik = useFormik({
    initialValues: TeamMemberInitialValues,
    validationSchema: TeamMemberSchema,
    onSubmit: (values) => {
      socketConnection?.emit(
        "addMembersToGroup",
        JSON.stringify({
          groupId: groupId,
          member: values.email,
        })
      );
      socketConnection.on("addMembersToGroup", (data: any) => {
        try {
          console.log(data);
        } catch (error: any) {
          socketConnection?.on("error", (error: any) => {
            console.log(error.message);
          });
        }
      });
      // socketConnection?.on("addMembersToGroup", async (data: any) => {
      //   try {
      //     console.log(data, "checl data");
      //   } catch (error) {
      //     socketConnection?.on("error", (error: any) => {
      //       error.message;
      //     });
      //   }
      // });
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
              Add Team Member to Main Group
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
                Send Invitation
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </CustomModel>
  );
};

export default AddMemberMain;
