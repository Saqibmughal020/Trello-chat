import React, { useState, useEffect } from "react";
import "./LeftSidebar.scss";
import personImage from "../../../src/assets/images/person.jpg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { BsFillPersonFill } from "react-icons/bs";
import { RiTeamFill, RiUserAddFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import AddMemberMain from "../../common/add-member-main/AddMemberMain";
import TotalMember from "../../common/total-member/TotalMember";
import CreateSubGroup from "../../common/create-sub-group/CreateSubGroup";
import RoomDetailHook from "../../hooks/room-detail";
import TokenDecodeHook from "../../hooks/token-decode";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { setIsLoggedIn } from "../../store/slices/auth-account/authAccountSlice";
import { useAppDispatch } from "../../store/store";
import BackgroundLetterAvatars from "../../common/PersonAvatar/PersonAvatar";
const LeftSidebar = (props: any) => {
  // close side navbar on screen size
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [width] = useWindowSize();
  const [addMemeber, setAddMember] = React.useState(false);
  const [teamMember, setTeamMember] = React.useState(false);
  const { decodedToken: decodedToken } = TokenDecodeHook();
  const { roomData: roomData, requestStatus: requestStatus } = RoomDetailHook();
  const [createSubGroup, setCreateSubGroup] = React.useState(false);
  const mobileNavbar =
    width < 600 && props.sidebarToggler
      ? "siderbar-mobile-view position-absolute"
      : "";
  const backDrop =
    width < 600 && props.sidebarToggler ? "side-navbar-backdrop" : "";
  function useWindowSize() {
    const [size, setSize] = useState([0]);
    React.useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }
  //---------------------------------------//
  useEffect(() => {
    props.setSidebarToggler(width > 600);
  }, [width]);
  // ---------------
  const logOutHandler = () => {
    dispatch(setIsLoggedIn(false));
    localStorage.removeItem("userEmail");
    localStorage.removeItem("islogged");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  // nav Link Handler
  //-------------

  // inner Navbar Drop Down
  //------------
  if (decodedToken?.user?.role === "Admin" && requestStatus === "loading")
    return (
      <Box className="sidebar">
        <Box
          className="sidebar-300"
          sx={{
            p: 10,
          }}
        >
          {/* For variant="text", adjust the height via font-size */}
          <Box sx={{ px: 10 }}>
            <Skeleton
              width={"100%"}
              variant="text"
              sx={{ fontSize: "3rem", background: "#dae1f0" }}
            />
          </Box>

          {/* For other variants, adjust the size with `width` and `height` */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Skeleton
              variant="circular"
              width={120}
              height={120}
              sx={{ background: "#dae1f0" }}
            />
          </Box>
          <Box sx={{ px: 5, py: 2 }}>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={40}
              sx={{ background: "#dae1f0" }}
            />
          </Box>
          <Box sx={{ px: 5, py: 1 }}>
            <Skeleton
              variant="text"
              width={"70%"}
              height={60}
              sx={{ background: "#dae1f0" }}
            />
          </Box>
          <Box sx={{ px: 5, py: 1 }}>
            <Skeleton
              variant="text"
              width={"50%"}
              height={60}
              sx={{ background: "#dae1f0" }}
            />
          </Box>
          <Box sx={{ px: 5, py: 1 }}>
            <Skeleton
              variant="text"
              width={"50%"}
              height={60}
              sx={{ background: "#dae1f0" }}
            />
          </Box>
          <Box sx={{ px: 5, py: 1 }}>
            <Skeleton
              variant="text"
              width={"70%"}
              height={60}
              sx={{ background: "#dae1f0" }}
            />
          </Box>
          <Box sx={{ px: 5, py: 1 }}>
            <Skeleton
              variant="text"
              width={"50%"}
              height={60}
              sx={{ background: "#dae1f0" }}
            />
          </Box>
          <Box sx={{ px: 5, py: 1 }}>
            <Skeleton
              variant="text"
              width={"50%"}
              height={60}
              sx={{ background: "#dae1f0" }}
            />
          </Box>
        </Box>
      </Box>
    );
  return (
    <Box className="sidebar">
      {/* backdrop */}
      <Box
        className={backDrop}
        onClick={() => props.setSidebarToggler(false)}
      ></Box>
      {/* end of backdrop */}
      <Box
        className={`${
          props.sidebarToggler ? "sidebar-300" : "sidebar-50"
        } ${mobileNavbar}`}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            fontFamily: "poppins",
            color: "#fff",
            py: 1,
            textAlign: "center",
          }}
          onClick={() => navigate("/")}
        >
          Trello Chat
        </Typography>
        {decodedToken?.user?.role === "Admin" &&
          roomData.map((item: any) => (
            <Box key={item?._id}>
              <Box
                className="sider-bar-header"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <BackgroundLetterAvatars
                  name={item?.roomName}
                  width="130px"
                  height="130px"
                  fontSize={40}
                />

                <Typography
                  sx={{
                    fontWeight: 500,
                    fontFamily: "poppins",
                    color: "#fff",
                    py: 2,
                  }}
                >
                  {item?.roomName}
                </Typography>
              </Box>
              {/* chat description section */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  fontFamily: "poppins",
                  color: "#fff",
                  px: 4,
                }}
              >
                Description
              </Typography>
              <Typography
                sx={{
                  fontFamily: "poppins",
                  color: "#fff",
                  pt: 0.5,
                  px: 4,
                  fontSize: 14,
                }}
              >
                {item?.description ??
                  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque harum rerum dolores sit distinctio explicabo eos deleniti sint debitis esse?"}
              </Typography>
              {/* chat Member section */}
            </Box>
          ))}

        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            fontFamily: "poppins",
            color: "#fff",
            pt: 2,
            pb: 1,
            px: 4,
            textDecoration: "underline",
          }}
        >
          {decodedToken?.user?.role} Info
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            py: 2,
            px: 4,
          }}
        >
          <BackgroundLetterAvatars
            name={decodedToken?.user?.name}
          />
          <Box sx={{ py: 1, px: 2 }}>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 500,
                fontFamily: "poppins",
                color: "#fff",
              }}
              // onClick={() => navigate("/")}
            >
              {decodedToken?.user?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "poppins",
                color: "#fff",
              }}
            >
              {decodedToken?.user?.email}
            </Typography>
          </Box>
        </Box>
        {/* menu section */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            fontFamily: "poppins",
            color: "#fff",
            pt: 5,
            pb: 1,
            px: 4,
            textDecoration: "underline",
          }}
        >
          SUPPORT
        </Typography>
        <Box sx={{ px: 4, pb: 1, pt: 2 }}>
          {decodedToken?.user?.role === "Admin" && (
            <button
              style={{
                border: "none",
                background: "none",
                color: "#fff",
                fontFamily: "poppins",
                fontSize: 16,
                cursor: "pointer",
                display: "flex",
              }}
              onClick={() => setTeamMember(true)}
            >
              <RiTeamFill size={"1.5em"} />
              <span style={{ padding: "0px 10px" }}>Team Members</span>
            </button>
          )}
          {decodedToken?.user?.role === "Admin" && (
            <button
              style={{
                border: "none",
                background: "none",
                color: "#fff",
                fontFamily: "poppins",
                fontSize: 16,
                cursor: "pointer",
                display: "flex",
                paddingTop: "10px",
              }}
            >
              <MdGroups size={"1.5em"} />
              <span style={{ padding: "0px 10px" }}>Sub Groups</span>
            </button>
          )}
          {decodedToken?.user?.role === "Admin" && (
            <button
              style={{
                border: "none",
                background: "none",
                color: "#fff",
                fontFamily: "poppins",
                fontSize: 16,
                cursor: "pointer",
                display: "flex",
                paddingTop: "10px",
              }}
              onClick={() => setCreateSubGroup(true)}
            >
              <IoCreate size={"1.5em"} />
              <span style={{ padding: "0px 10px" }}>Create New Sub Groups</span>
            </button>
          )}

          <button
            style={{
              border: "none",
              background: "none",
              color: "#fff",
              fontFamily: "poppins",
              fontSize: 16,
              cursor: "pointer",
              display: "flex",
              paddingTop: "10px",
            }}
          >
            <BiLogOut size={"1.5em"} />
            <span style={{ padding: "0px 10px" }} onClick={logOutHandler}>
              Log out
            </span>
          </button>
        </Box>
      </Box>
      {decodedToken?.user?.role === "Admin" && (
        <>
          <TotalMember openModel={teamMember} setOpenModel={setTeamMember} />
          <CreateSubGroup
            openModel={createSubGroup}
            setOpenModel={setCreateSubGroup}
          />
        </>
      )}
    </Box>
  );
};

export default LeftSidebar;
