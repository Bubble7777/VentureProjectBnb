import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    wallet: "",
  },
  reducers: {
    addToWallet: (state, action) => {
      state.wallet = action.payload;
    },
  },
});

export const { addToWallet } = walletSlice.actions;
export default walletSlice.reducer;
