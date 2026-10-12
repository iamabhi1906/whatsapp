import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./users.types";
import {
  signInWithEmailPassword,
  signInWithGoogle,
  signUpWithEmailPassword,
} from "./user.action";

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
    const pending = (state: UserState) => {
      state.loading = true;
      state.error = "";
    };
    const fulfilled = (state: UserState, action: { payload: UserState["user"] }) => {
      state.loading = false;
      state.user = action.payload;
    };
    const rejected = (state: UserState, action: { payload?: string }) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong";
    };

    builder
      .addCase(signInWithGoogle.pending, pending)
      .addCase(signInWithGoogle.fulfilled, fulfilled)
      .addCase(signInWithGoogle.rejected, rejected)
      .addCase(signInWithEmailPassword.pending, pending)
      .addCase(signInWithEmailPassword.fulfilled, fulfilled)
      .addCase(signInWithEmailPassword.rejected, rejected)
      .addCase(signUpWithEmailPassword.pending, pending)
      .addCase(signUpWithEmailPassword.fulfilled, fulfilled)
      .addCase(signUpWithEmailPassword.rejected, rejected);
  },
});

export const { logout } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
