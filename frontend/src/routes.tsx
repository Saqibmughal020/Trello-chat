import React, { lazy, Suspense, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "./store/store";
import AuthGuard from "./components/AuthGuard";
import GuestGuard from "./components/GuestGuard";

const AdminRoutes = [
  {
    path: "/",
    component: lazy(
      () => import("./components/Admin/AdminDashboard/AdminDashboard")
    ),
  },
  {
    path: "/404",
    component: lazy(() => import("./components/Error404/Error")),
  },
  {
    path: "*",
    component: () => <Navigate to="/404" />,
  },
  {
    guard: "guest",
    path: "/login",
    component: lazy(() => import("./components/Auth/LogIn/Login")),
  },
  {
    guard: "guest",
    path: "/order-history",
    component: lazy(
      () => import("./components/Admin/OrderHistory/OrderHistory")
    ),
  },
  {
    guard: "guest",
    path: "/product-history",
    component: lazy(
      () => import("./components/Admin/ProductHistory/ProductHistory")
    ),
  },
];

const routesData = [
  {
    guard: AuthGuard,
    path: "/",
    component: () => <Navigate to="/dashboard" />,
    layout: Layout,
  },
  {
    path: "/404",
    component: lazy(() => import("./components/Error404/Error")),
  },
  {
    path: "*",
    component: () => <Navigate to="/404" />,
  },
  {
    guard: AuthGuard,
    path: "/dashboard",
    component: lazy(() => import("./components/dashboard/Dashboard")),
    layout: Layout,
  },
  {
    guard: GuestGuard,
    path: "/login",
    component: lazy(() => import("./components/Auth/LogIn/Login")),
  },
  {
    guard: GuestGuard,
    path: "/verify-otp",
    component: lazy(() => import("./components/Auth/verify-otp/VerifyOtp")),
  },
  {
    guard: AuthGuard,
    path: "/frequently-asked-question",
    component: lazy(() => import("./components/Question/Question")),
    layout: Layout,
  },
  {
    guard: AuthGuard,
    path: "/contact-us",
    component: lazy(() => import("./components/ContactUs/ContactUs")),
    layout: Layout,
  },
];

const renderRoutes = (routesData: any) =>
  routesData ? (
    <Suspense>
      <Routes>
        {routesData.map((item: any) => {
          const Guard = item?.guard || Fragment;
          const Layout = item?.layout || Fragment;
          const Component = item?.component;
          return (
            <Route
              key={item.component}
              path={item.path}
              element={
                <Guard>
                  <Layout>
                    <Component />
                  </Layout>
                </Guard>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  ) : null;
function CutomRoutes() {
  const [updateRoutes, setUpdateRoutes] = React.useState(routesData);
  const newLocal = localStorage.getItem("isAdmin");
  const adminlogged = newLocal !== null ? JSON.parse(newLocal) : false;
  // const routesUpdateFunction = () => {
  //   const updatedRoutes =
  //     isloggedIn === true
  //       ? routesData.filter((item: any) => item?.guard !== "guest")
  //       : routesData;
  //   setUpdateRoutes(updatedRoutes);
  // };
  // React.useEffect(() => {
  //   routesUpdateFunction();
  // }, [isloggedIn]);

  return renderRoutes(adminlogged ? AdminRoutes : routesData);
}

export default CutomRoutes;
