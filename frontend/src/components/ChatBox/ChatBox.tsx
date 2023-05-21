import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import personImage from "../../../src/assets/images/person.jpg";
import { IoSendSharp } from "react-icons/io5";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useFormik } from "formik";
import { StyledTextField } from "../../UI/StyledTextField/StyledTextField";
import io from "socket.io-client";
import { ChatFeed, Message } from "react-chat-ui";
import * as yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { REQUEST_STATUS } from "../../constants/request-status";
import { apiGetRequest } from "../../helpers";
import { endpoints } from "../../config";
import SocketConnectionHook from "../../hooks/socket-connection-hook";
import AddMemberMain from "../../common/add-member-main/AddMemberMain";
import GroupDetail from "./Detail/Detail";
import ChatBoxLoader from "./ChatBoxLoader";
import TokenDecodeHook from "../../hooks/token-decode";
import moment from "moment";
const ChatBox = ({ groupData, groupDetailView }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { socketConnection: socketConnection } = SocketConnectionHook();
  const [messages, setMessages] = useState<any>([]);
  const [requestStatus, setRequestStatus] = React.useState(REQUEST_STATUS.IDEL);
  const [value, setValue] = React.useState("conversation");
  const [addMemeber, setAddMember] = React.useState(false);
  const [viewGroupDetail, setViewGroupDetail] = React.useState(false);
  const { decodedToken: decodedToken } = TokenDecodeHook();

  const open = Boolean(anchorEl);

  React.useEffect(() => {
    socketConnection?.on("success", async (data: any) => {
      console.log(data, "success");
    });
    return () => {
      socketConnection?.off("success");
    };
  }, [socketConnection]);

  React.useEffect(() => {
    socketConnection?.on("conversationGroupMessage", async (data: any) => {
      console.log(data, "conversationGroupMessage");
    });
    return () => {
      socketConnection?.off("conversationGroupMessage");
    };
  }, [socketConnection]);

  React.useEffect(() => {
    socketConnection?.on("sprintGroupMessage", async (data: any) => {
      console.log(data, "sprintGroupMessage");
    });
    return () => {
      socketConnection?.off("sprintGroupMessage");
    };
  }, [socketConnection]);

  React.useEffect(() => {
    socketConnection?.on("error", async (data: any) => {
      console.log(data, "error");
    });

    return () => {
      socketConnection?.off("error");
    };
  }, [socketConnection]);
  
  const groupMessages = async () => {
    setRequestStatus(REQUEST_STATUS.LOADING);
    setMessages([]);
    try {
      const res: any = await apiGetRequest(
        `${endpoints.groupMessages}/${groupData?._id}/${value}`
      );
      const { data, status } = res;
      switch (status) {
        case 200:
          setRequestStatus(REQUEST_STATUS.SUCCESS);
          const messagesRecieve = data?.message.map((item: any) => ({
            senderId: item?.sender?._id,
            id: item?.sender?._id,
            message: item?.message,
            senderName: item?.sender?.name,
            timestamp: item?.createdAt,
          }));
          setMessages(messagesRecieve);
          break;
        default:
          setRequestStatus(REQUEST_STATUS.FAILURE);
          break;
      }
    } catch (error: any) {
      setRequestStatus(REQUEST_STATUS.FAILURE);
    }
  };

  useEffect(() => {
    // groupMessages();
    const intervalId = setInterval(groupMessages, 5000);
    setViewGroupDetail(false);
return () => {
   clearInterval(intervalId);
}
  }, [value, groupData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formik = useFormik({
    initialValues: { sendMessage: "" },

    validationSchema: yup.object({
      sendMessage: yup.string().required(),
    }),
    onSubmit: (values) => {
      const newMessage = new Message({
        id: decodedToken?.user?._id,
        message: values.sendMessage,
        senderName: "me",
        
      });
      // Send the message to the server
      socketConnection?.emit(
        "messageToGroup",
        JSON.stringify({
          message: values.sendMessage,
          groupId: groupData?._id,
          chatType: value,
        })
      );
      // Update the state of messages with the new message
      setMessages([...messages, newMessage]);
      //   onSubmitHandler(values);
      formik.resetForm();
    },
  });
  const addMemberHandler = (event: any) => {
    event.preventDefault();
    setAddMember(true);
    handleClose();
  };
  const groupDetailViewHandler = (event: any) => {
    event.preventDefault();
    setViewGroupDetail(true);
    handleClose();
  };
  if (requestStatus === "idel") return <ChatBoxLoader />;
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        background: "#dae1f0",
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      {/* Chat Box Header */}
      <Box
        sx={{
          position: "sticky",
          height: "10%",
          background: "#051639",
          display: "flex",
          alignItems: "center",
          px: 5,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={personImage}
            sx={{ width: 55, height: 55 }}
          />
          <Typography
            variant="h5"
            sx={{
              pl: 2,
              fontWeight: 500,
              fontFamily: "poppins",
              color: "#fff",
            }}
            // onClick={() => navigate("/")}
          >
            {groupData?.groupName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            sx={{
              color: "#fff",
              fontFamily: "poppons",
              label: {
                color: "#fff",
                ".MuiRadio-root": {
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "&.Mui-checked": {
                    color: "#dae1f0", // change this to your desired active color
                  },
                },
              },
            }}
          >
            <FormControlLabel
              value="conversation"
              control={<Radio />}
              label="Conversation"
            />
            <FormControlLabel
              value="sprint"
              control={<Radio />}
              label="Sprint"
            />
          </RadioGroup>

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon sx={{ color: "#fff", fontSize: 30 }} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={groupDetailViewHandler}>Group Detail</MenuItem>
            <MenuItem onClick={addMemberHandler}>Add Member To Group</MenuItem>
            <MenuItem onClick={groupDetailViewHandler}>Leave Group</MenuItem>
          </Menu>
        </Box>
      </Box>
      {viewGroupDetail ? (
        <GroupDetail
          groudDataItem={groupData}
          setViewGroupDetail={setViewGroupDetail}
        />
      ) : (
        <Box>
          <Box
            sx={{
              maxHeight: "70%",
              height: "600px",
              overflowY: "scroll",
              px: 2,
            }}
          >
            {/* {messages.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
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
                  No Message
                </Typography>
              </Box>
            )} */}
            {/* {messages.length > 0 && (
              <ChatFeed
                messages={messages}
                showSenderName
                bubblesCentered={false}
                showTime={true}
                // Add any additional props you need
              />
            )} */}
            {messages?.map((item: any, index: number) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    item?.id === decodedToken?.user?._id ? "right" : "left",
                }}
              >
                <Box
                  sx={{
                    width: "fit-content",
                    maxWidth: "50%",
                    backgroundColor:
                      item?.id === decodedToken?.user?._id
                        ? "#051639"
                        : "#686868",
                    p: 1,
                    px: 2,
                    my: 1,
                    borderRadius: 4,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      fontFamily: "poppins",
                      color: "#fff",
                    }}
                    // onClick={() => navigate("/")}
                  >
                    {item?.id === decodedToken?.user?._id
                      ? "me"
                      : item?.senderName}
                  </Typography>
                  <Box
                    sx={{
                      "& span": {
                        color: "#fff",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "right",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontFamily: "poppins",
                        color: "#fff",
                      }}
                      // onClick={() => navigate("/")}
                    >
                      {item?.message}
                    </Typography>
                    <span>{moment(String(item?.timestamp)).format(
                        "DD MMMM YYYY HH:mm"
                      )}</span>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  position: "absolute",
                  borderTop: "1px solid",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <StyledTextField
                  fullWidth
                  multiline
                  name="sendMessage"
                  label="Send Message"
                  onChange={formik.handleChange}
                  value={formik.values.sendMessage}
                  error={
                    formik.touched.sendMessage &&
                    Boolean(formik.errors.sendMessage)
                  }
                  helperText={
                    formik.touched.sendMessage && formik.errors.sendMessage
                  }
                  sx={{
                    width: "90%",
                    my: 2,
                    "& fieldset": {
                      fontFamily: "poppins",
                      border: "none",
                      borderColor: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                      borderColor: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                      borderColor: "transparent",
                    },
                  }}
                />
                <Box sx={{ width: "10%", p: 1 }}>
                  <Button
                    id="basic-button"
                    type="submit"
                    sx={{
                      background: "#051639",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 2,
                    }}
                  >
                    <IoSendSharp color="#fff" fontSize={25} />
                  </Button>
                </Box>
              </Box>
            </form>
            <AddMemberMain
              openModel={addMemeber}
              setOpenModel={setAddMember}
              groupId={groupData?._id}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
