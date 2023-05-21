import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import jwt_decode from "jwt-decode";

const TokenDecodeHook = () => {
  const [decodedToken, setDecodedToken] = useState<any>([]);

  useEffect(() => {
    const token: any = localStorage.getItem("accessToken");
    const tokenDecoded = jwt_decode(token);
    setDecodedToken(tokenDecoded);
  }, []);
  return {
    decodedToken: decodedToken,
  };
};

export default TokenDecodeHook;
