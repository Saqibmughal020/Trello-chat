import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Skeleton } from "@mui/material";
import personImage from "../../../src/assets/images/person.jpg";
import { IoCreate } from "react-icons/io5";
import ChatBox from "../ChatBox/ChatBox";
import { REQUEST_STATUS } from "../../constants/request-status";
import { apiGetRequest } from "../../helpers";
import { endpoints } from "../../config";
import { io } from "socket.io-client";
import { useAppSelector } from "../../store/store";
import BackgroundLetterAvatars from "../../common/PersonAvatar/PersonAvatar";
const Dashboard = () => {
  const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.IDEL);
  const { authToken } = useAppSelector((item) => item.authReducer);
  const [roomGroupData, setGroupData] = useState<any>([]);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [groupDetailView, setGroupDetailView] = useState<any>(null);
  const [socketIo, setSocketIo] = useState<any>(null);
  const { groupCreate } = useAppSelector((item) => item.apiHitSlice);

  // useEffect(() => {
  //   const socket = io("http://localhost:303", {
  //     transports: ["websocket"],
  //     query: {
  //       authorization: authToken,
  //     },
  //   });
  //   socket?.on("connect", () => {
  //     console.log("Socket connected!");
  //   });

  //   socket?.on("disconnect", () => {
  //     console.log("Socket disconnected!");
  //   });
  //   setSocketIo()
  // }, [authToken]);

  const roomData = async () => {
    setRequestStatus(REQUEST_STATUS.LOADING);
    let message = null;
    try {
      const res: any = await apiGetRequest(endpoints.groupsData);
      const { data, status } = res;
      switch (status) {
        case 200:
          setRequestStatus(REQUEST_STATUS.SUCCESS);
          setGroupData(data?.response?.groupsDetail);
          break;
        default:
          setRequestStatus(REQUEST_STATUS.FAILURE);
          break;
      }
    } catch (error: any) {
      console.log(error);
      setRequestStatus(REQUEST_STATUS.FAILURE);
    }
  };
  const selectedGroupHandler = (values: any) => {
    setSelectedGroup(values);
    setGroupDetailView(false);
  };
  useEffect(() => {
    roomData();
    groupCreate && window.location.reload();
  }, [groupCreate]);
  if (requestStatus === "loading")
    return (
      <Box sx={{ height: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box
              sx={{
                background: "#dae1f0",
                height: "90vh",
                overflowY: "auto",
                borderBottomRightRadius: 22,
                borderTopRightRadius: 22,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                }}
              >
                <Skeleton
                  variant="text"
                  width={"70%"}
                  height={60}
                  sx={{ background: "#c1c1c1" }}
                />
                <Box>
                  <Skeleton
                    variant="text"
                    width={"30px"}
                    height={60}
                    sx={{ background: "#c1c1c1" }}
                  />
                </Box>
              </Box>
              <Box sx={{ px: 2, display: "flex", pt: 4 }}>
                <Skeleton
                  variant="circular"
                  width={50}
                  height={50}
                  sx={{ background: "#c1c1c1" }}
                />
                <Box sx={{ width: "80%" }}>
                  <Skeleton
                    variant="text"
                    width={"100%"}
                    height={30}
                    sx={{ background: "#c1c1c1", ml: 3 }}
                  />
                  <Skeleton
                    variant="text"
                    width={"100%"}
                    height={30}
                    sx={{ background: "#c1c1c1", ml: 3 }}
                  />
                </Box>
              </Box>
              <Box sx={{ px: 2, display: "flex", pt: 4 }}>
                <Skeleton
                  variant="circular"
                  width={50}
                  height={50}
                  sx={{ background: "#c1c1c1" }}
                />
                <Box sx={{ width: "80%" }}>
                  <Skeleton
                    variant="text"
                    width={"100%"}
                    height={30}
                    sx={{ background: "#c1c1c1", ml: 3 }}
                  />
                  <Skeleton
                    variant="text"
                    width={"100%"}
                    height={30}
                    sx={{ background: "#c1c1c1", ml: 3 }}
                  />
                </Box>
              </Box>
              <Box sx={{ px: 2, display: "flex", pt: 4 }}>
                <Skeleton
                  variant="circular"
                  width={50}
                  height={50}
                  sx={{ background: "#c1c1c1" }}
                />
                <Box sx={{ width: "80%" }}>
                  <Skeleton
                    variant="text"
                    width={"100%"}
                    height={30}
                    sx={{ background: "#c1c1c1", ml: 3 }}
                  />
                  <Skeleton
                    variant="text"
                    width={"100%"}
                    height={30}
                    sx={{ background: "#c1c1c1", ml: 3 }}
                  />
                </Box>
              </Box>
              <Box sx={{ px: 2, display: "flex", pt: 4 }}>
                <Skeleton
                  variant="circular"
                  width={50}
                  height={50}
                  sx={{ background: "#c1c1c1" }}
                />
                <Box sx={{ width: "80%" }}>
                  <Skeleton
                    variant="text"
                    width={"100%"}
                    height={30}
                    sx={{ background: "#c1c1c1", ml: 3 }}
                  />
                  <Skeleton
                    variant="text"
                    width={"100%"}
                    height={30}
                    sx={{ background: "#c1c1c1", ml: 3 }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={9} sx={{ mt: 2, pr: 5 }}></Grid>
        </Grid>
      </Box>
    );
  return (
    <Box sx={{ height: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box
            sx={{
              background: "#dae1f0",
              height: "90vh",
              overflowY: "auto",
              borderBottomRightRadius: 22,
              borderTopRightRadius: 22,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontFamily: "poppins",
                  color: "#051639",
                  py: 4,
                }}
                // onClick={() => navigate("/")}
              >
                Sub Groups
              </Typography>
              <Box sx={{ cursor: "pointer" }}>
                <IoCreate size={22} color={"#051639"} />
              </Box>
            </Box>
            {roomGroupData.length === 0 && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                    color: "#686868",
                    py: 4,
                  }}
                  // onClick={() => navigate("/")}
                >
                  No Group Exist
                </Typography>
              </Box>
            )}

            {roomGroupData[0]?.groupsData.map((item: any) => (
              <Box
                key={item?._id}
                sx={{
                  background: selectedGroup?._id === item?._id ? "#051639" : "",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  py: 2,
                  pl: 2,
                  borderTop: "1px solid #f6f8fc",
                }}
                onClick={() => selectedGroupHandler(item)}
              >
                <BackgroundLetterAvatars name={item?.groupName} />
                <Box sx={{ py: 1, px: 2 }}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontFamily: "poppins",
                      color:
                        selectedGroup?._id === item?._id ? "#fff" : "#051639",
                    }}
                    // onClick={() => navigate("/")}
                  >
                    {item?.groupName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      fontFamily: "poppins",
                      color:
                        selectedGroup?._id === item?._id ? "#fff" : "#051639",
                    }}
                    // onClick={() => navigate("/")}
                  >
                    <span>Description :</span> {item?.groupDiscription}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={9} sx={{ mt: 2, pr: 5 }}>
          {selectedGroup && (
            <ChatBox
              groupData={selectedGroup}
              groupDetailView={groupDetailView}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
