import axios from "axios";
import React from "react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import { REQUEST_STATUS } from "../constants/request-status";
import { apiGetRequest } from "../helpers";
import { endpoints } from "../config";
const RoomDetailHook = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.IDEL);
  //   const accountUpdated = useAppSelector(
  //     (item) => item.authReducer.accountCreated
  //   );
  const [roomUserData, setUserRoomData] = useState([]);

  //   const roomData = async () => {
  //     try {
  //       const res: any = await axios.get(`${""}/auth-signup.json`);
  //       const { status } = res;
  //       const data = await res.data;
  //       switch (status) {
  //         case 200:
  //           let recieveData: any = [];
  //           for (const key in data) {
  //             recieveData.push({
  //               id: key,
  //               firstName: data[key].firstName,
  //               lastName: data[key].lastName,
  //               email: data[key].email,
  //               userName: data[key].userName,
  //               password: data[key].password,
  //               confirmPassword: data[key].confirmPassword,
  //               isAdmin: data[key]?.isAdmin,
  //             });
  //           }
  //           setAccounts(recieveData);
  //           break;
  //         default:
  //           enqueueSnackbar("Some Thing Went Wrong", {
  //             variant: "error",
  //           });
  //           break;
  //       }
  //     } catch (error) {
  //       enqueueSnackbar("Some Thing Went Wrong", {
  //         variant: "error",
  //       });
  //     }
  //   };
  const roomData = async () => {
    setRequestStatus(REQUEST_STATUS.LOADING);
    let message = null;
    try {
      const res: any = await apiGetRequest(endpoints.getRoomData);
      const { data, status } = res;
      switch (status) {
        case 200:
          setRequestStatus(REQUEST_STATUS.SUCCESS);
          setUserRoomData(data?.response?.room);
          break;
        default:
          setRequestStatus(REQUEST_STATUS.FAILURE);
          break;
      }
    } catch (error: any) {
        console.log(error)
    } 
  };
  useEffect(() => {
    roomData();
  }, []);
  return {
    roomData: roomUserData,
    requestStatus: requestStatus,
  };
};

export default RoomDetailHook;
