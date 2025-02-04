import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    userDetails: {
      email: "No email Id ",
      name: "Guest",
      role: "user",
    },
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { setLoggedIn, setUserDetails } = userSlice.actions;
