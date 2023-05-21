import { useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function AuthGuard({ children }: any) {
  const [isLoading, setLoading] = useState(true);
  const { isloggedIn } = useAppSelector((store) => store.authReducer);
  const navigate = useNavigate();
  const isToken = localStorage.getItem("accessToken");

  // If Token is not inValid in Store then It should REDIRECT TO LOGIN
  useEffect(() => {
    if (!isloggedIn) {
      return navigate("/login");
    }
    setLoading(false);
  }, [isToken, isloggedIn, navigate]);
  // If Token is not inValid then It should REDIRECT TO LOGIN

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return children;
}

export default AuthGuard;
