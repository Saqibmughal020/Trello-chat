import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../store/store";
function GuestGuard({ children }: any) {
  const navigate = useNavigate();
  const { isloggedIn } = useAppSelector((store) => store.authReducer);
  // const isToken = localStorage.getItem("accessToken");
  // If Token is Already in Store then It should REDIRECT TO Dashbard
  useEffect(() => {
    if (isloggedIn) {
      return navigate("/dashboard");
    }
  }, [isloggedIn, navigate]);
  // If Token is Already in Store then It should REDIRECT TO Dashbard

  return children;
}

export default GuestGuard;
