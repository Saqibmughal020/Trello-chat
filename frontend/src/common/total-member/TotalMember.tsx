import React from "react";
import { CustomModel } from "../custom-model";
import { Box, Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AiFillDelete } from "react-icons/ai";
import { TotalMemberData } from "./totalMemberData";
const TotalMember = ({ openModel, setOpenModel }: any) => {
  return (
    <CustomModel
      open={openModel}
      setOpen={setOpenModel}
      styleModal={{
        minHeight: 500,
        height: 500,
        width: { xs: "90%", sm: "60%", md: "40%", xl: "20%" },
        overflowY: "scroll",
      }}
    >
      <Grid container spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // px: 1,
            pt: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              color: "#051639",
              fontSize: "24px",
              fontWeight: 600,
            }}
          >
            Total Member in Main Group
          </Typography>
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
        </Box>
        <Grid item xs={2} sx={{ textAlign: "end" }}></Grid>
        <Grid item xs={12}>
          {TotalMemberData.map((item) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
                width: "100%",
              }}
              key={item}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontFamily: "poppins",
                  color: "#051639",
                  py: 4,
                }}
                // onClick={() => navigate("/")}
              >
                {item}
              </Typography>
              <Box sx={{ cursor: "pointer", pr: 2 }}>
                <AiFillDelete size={22} color={"#051639"} />
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
    </CustomModel>
  );
};

export default TotalMember;
