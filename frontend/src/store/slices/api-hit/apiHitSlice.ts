import { createSlice } from "@reduxjs/toolkit";
const newLocal = localStorage.getItem("islogged");

const initialState: any = {
  groupCreate: false,
};

const APIHits = createSlice({
  name: "header",
  initialState,
  reducers: {
    setGroupCreateApiHit(state, action) {
      state.groupCreate = action.payload;
    },
  },
});

export const { setGroupCreateApiHit } = APIHits.actions;
export default APIHits.reducer;
