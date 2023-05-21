import { createSlice } from "@reduxjs/toolkit";
const newLocal = localStorage.getItem("cartItems");
const initialState: any = {
  ItemsToCart: newLocal !== null ? JSON.parse(newLocal) : [],
  totalPrice: [],
};

const CartItemSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setCartItem(state, action) {
      const itemsObject = action.payload;

      itemsObject === null
        ? (state.ItemsToCart = [])
        : state.ItemsToCart.push(itemsObject);
    },

    setIncreaseQuanitity(state, action) {
      const selectedItem = action.payload;
      const totalQuantity = selectedItem.quantity + 1;
      const updatedItemToCart = [...state.ItemsToCart];
      const indexNumber = state.ItemsToCart.findIndex(
        (item: any) => item.productId === selectedItem.productId
      );
      const rest = state.ItemsToCart[indexNumber];
      updatedItemToCart[indexNumber] = {
        ...rest,
        quantity: Number(selectedItem.quantity) + 1,
        totalPrice: Number(selectedItem.price) * Number(totalQuantity),
      };
      state.ItemsToCart = updatedItemToCart;
    },

    setDecreaseQuanitity(state, action) {
      const selectedItem = action.payload;
      const totalQuantity =
        selectedItem.quantity > 1
          ? selectedItem.quantity - 1
          : selectedItem.quantity;
      const updatedItemToCart = [...state.ItemsToCart];
      const indexNumber = state.ItemsToCart.findIndex(
        (item: any) => item.productId === selectedItem.productId
      );
      const rest = state.ItemsToCart[indexNumber];
      updatedItemToCart[indexNumber] = {
        ...rest,
        quantity:
          Number(selectedItem.quantity) > 1
            ? Number(selectedItem.quantity) - 1
            : selectedItem.quantity,
        totalPrice: Number(selectedItem.price) * Number(totalQuantity),
      };

      state.ItemsToCart = updatedItemToCart;
    },

    deleteItemToCartHandler(state, action) {
      const deleteItem = state.ItemsToCart.filter(
        (item: any) => item.productId !== action.payload.productId
      );
      state.ItemsToCart = deleteItem;
    },
  },
});

export const {
  setCartItem,
  setIncreaseQuanitity,
  setDecreaseQuanitity,
  deleteItemToCartHandler,
} = CartItemSlice.actions;
export default CartItemSlice.reducer;
