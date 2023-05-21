import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import "./Layout.scss";
import { Box } from "@mui/material";
import { useAppSelector } from "../store/store";
import TokenDecodeHook from "../hooks/token-decode";
const Layout = ({ children }: any) => {
  const [sidebarToggler, setSidebarToggler] = useState<any>(true);
  const [activeItem, setActiveItem] = React.useState<boolean>(false);
  const { userRole } = useAppSelector((item) => item.authReducer);
  const { decodedToken: decodedToken } = TokenDecodeHook();

  const sidebarTogglerHandler = () => {
    setActiveItem(false);
    setSidebarToggler(!sidebarToggler);
  };
  const setActiveItemList = (val: any) => {
    setActiveItem(val);
  };

  return (
    <Box className="layout">
      <Box className="layout-inner">
        <Box
          className="layout-sidebar"
          sx={{ background: "#051639", height: "100vh" }}
        >
          <LeftSidebar
            setSidebarToggler={setSidebarToggler}
            sidebarToggler={sidebarToggler}
            sidebarTogglerHandler={sidebarTogglerHandler}
            activeItem={activeItem}
            setActiveItemList={setActiveItemList}
          />
        </Box>
        <Header />
        <Box
          className={sidebarToggler ? "layout-content" : "layout-content-close"}
        >
          <Box className="outlet outlet-system-admin">
            {children}
            <Outlet />
          </Box>
        </Box>
      </Box>
      {/* <Box className="layout-footer">
        <Footer />
      </Box> */}
    </Box>
  );
};

export default Layout;
