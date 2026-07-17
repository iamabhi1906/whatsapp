import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./users.types";
import { signInWithGoogle } from "./user.action";

const initialState: UserState = {
  user: null,
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.loading = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong";
    });
  },
});

export const { logout } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
