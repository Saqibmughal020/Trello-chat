import { createSlice } from "@reduxjs/toolkit";
const newLocal = localStorage.getItem("islogged");

const initialState: any = {
  accountCreated: false,
  isloggedIn: newLocal !== null ? JSON.parse(newLocal) : false,
  loggedInfo: localStorage.getItem("userEmail")
    ? localStorage.getItem("userEmail")
    : "",
  isAdmin: false,
  userData: {},
  authToken: localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : "",
  userRole: "",
  socketConnection: null,
};

const AuthAccount = createSlice({
  name: "header",
  initialState,
  reducers: {
    setAccountCreated(state, action) {
      state.accountCreated = action.payload;
    },

    setIsLoggedIn(state, action) {
      state.isloggedIn = action.payload;
    },

    setLoggedInfo(state, action) {
      state.loggedInfo = action.payload;
    },
    setUserData(state, action) {
      const payloadData = action.payload;
      state.userData = action.payload;
      state.authToken = payloadData?.token;
      state.userRole = payloadData?.role;
    },
    setSocketConnection(state, action) {
      state.socketConnection = action.payload;
    },
  },
});

export const {
  setAccountCreated,
  setIsLoggedIn,
  setLoggedInfo,
  setUserData,
  setSocketConnection,
} = AuthAccount.actions;
export default AuthAccount.reducer;
