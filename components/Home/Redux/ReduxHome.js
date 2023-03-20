import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allpackages: [],
  allpendingbalance: 0,
  Allpendingorder: 0,
  Allpendingrefund: 0,
  Allrequestpass: 0,
};

export const offerapp = createSlice({
  name: "offerapp",
  initialState,
  reducers: {
    setallpackages: (state, action) => {
      state.allpackages = action.payload;
    },
    setallpendingbalance: (state, action) => {
      state.allpendingbalance = action.payload;
    },
    setAllpendingorder: (state, action) => {
      state.Allpendingorder = action.payload;
    },
    setAllpendingrefund: (state, action) => {
      state.Allpendingrefund = action.payload;
    },
    setAllrequestpass: (state, action) => {
      state.Allrequestpass = action.payload;
    },
  },
});

export const {
  setallpackages,
  setallpendingbalance,
  setAllpendingrefund,
  setAllpendingorder,
  setAllrequestpass,
} = offerapp.actions;

// Selectors

export const selectallpackages = (state) => state.offerapp.allpackages;
export const selectallpendingbalance = (state) =>
  state.offerapp.allpendingbalance;
export const selectAllpendingorder = (state) => state.offerapp.Allpendingorder;
export const selectAllpendingrefund = (state) =>
  state.offerapp.Allpendingrefund;
export const selectAllrequestpass = (state) => state.offerapp.Allrequestpass;

export default offerapp.reducer;
