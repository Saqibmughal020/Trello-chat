import React from "react";
import { REQUEST_STATUS } from "../../../constants/request-status";
import { apiGetRequest } from "../../../helpers";
import { endpoints } from "../../../config";
import { Box, Grid, Typography, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import personImage from "../../../../src/assets/images/person.jpg";
import { AiFillDelete } from "react-icons/ai";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const GroupDetail = ({ groudDataItem, setViewGroupDetail }: any) => {
  const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.IDEL);
  const [roomGroupData, setGroupData] = React.useState<any>([]);

  const roomData = async () => {
    setRequestStatus(REQUEST_STATUS.LOADING);
    let message = null;
    try {
      const res: any = await apiGetRequest(
        `${endpoints.groupMemberData}/${groudDataItem?._id}`
      );
      const { data, status } = res;
      switch (status) {
        case 200:
          setRequestStatus(REQUEST_STATUS.SUCCESS);
          setGroupData(data?.userd[0].membersData);
          break;
        default:
          setRequestStatus(REQUEST_STATUS.FAILURE);
          break;
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    roomData();
  }, [groudDataItem?._id]);
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={5} sx={{ textAlign: "start" }}>
          <KeyboardBackspaceIcon
            sx={{
              fontFamily: "Poppins",
              color: "#051639",
              fontSize: "40px",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => setViewGroupDetail(false)}
          />
        </Grid>
        <Grid item xs={7}>
          <Typography
            sx={{
              color: "#051639",
              fontSize: "24px",
              fontWeight: 600,
            }}
          >
            Group Detail
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={personImage}
              sx={{ width: 100, height: 100 }}
            />
            <Typography
              variant="h5"
              sx={{
                pl: 2,
                fontWeight: 500,
                fontFamily: "poppins",
                color: "#051639",
              }}
              // onClick={() => navigate("/")}
            >
              {groudDataItem?.groupName}
            </Typography>
          </Box>
          <Box
            sx={{
              pt: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                fontFamily: "poppins",
                color: "#fff",
                "& span": {
                  borderRadius: 1,
                  px: 2,
                  py: 0.5,
                  background: "#051639",
                },
              }}
              // onClick={() => navigate("/")}
            >
              <span>Description :</span>
            </Typography>
            <Typography
              sx={{
                pl: 2,
                pt: 2,
                fontWeight: 500,
                fontFamily: "poppins",
                color: "#051639",
              }}
              // onClick={() => navigate("/")}
            >
              {groudDataItem?.groupDiscription}
            </Typography>
          </Box>

          <Box sx={{ pt: 5 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                fontFamily: "poppins",
                color: "#fff",
                "& span": {
                  borderRadius: 1,
                  px: 2,
                  py: 0.5,
                  background: "#051639",
                },
              }}
              // onClick={() => navigate("/")}
            >
              <span>Members :</span>
            </Typography>
            {roomGroupData.map((item: any) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  px: 2,
                  width: "100%",
                }}
                key={item?._id}
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
                  {item?.name}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontFamily: "poppins",
                    color: "#051639",
                    py: 4,
                  }}
                  // onClick={() => navigate("/")}
                >
                  {item?.email}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontFamily: "poppins",
                    color: "#051639",
                    py: 4,
                  }}
                  // onClick={() => navigate("/")}
                >
                  {item?.role}
                </Typography>
                <Box sx={{ cursor: "pointer", pr: 2 }}>
                  <AiFillDelete size={22} color={"#051639"} />
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GroupDetail;
