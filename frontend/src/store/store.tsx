import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartItemSlice from "./slices/cart-item/cartItem.slice";
import authAccountSlice from "./slices/auth-account/authAccountSlice";
import apiHitSlice from "./slices/api-hit/apiHitSlice";
const store = configureStore({
  reducer: {
    cartItemReducer: cartItemSlice,
    authReducer: authAccountSlice,
    apiHitSlice: apiHitSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
// Export a hook that can be reused to resolve types
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export default store;
