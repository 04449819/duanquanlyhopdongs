import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hopdong: {},
  hopdong1: {},
};

export const ThongTinHopDong = createSlice({
  name: "thongtinhopdong",
  initialState,
  reducers: {
    sethopdong: (state, action) => {
      state.hopdong = action.payload;
    },
    sethopdong1: (state, action) => {
      state.hopdong1 = action.payload;
    },
  },
});

export const { sethopdong, sethopdong1 } = ThongTinHopDong.actions;
export default ThongTinHopDong.reducer;
