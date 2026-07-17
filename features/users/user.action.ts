import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./users.types";
import { userAuthService } from "@/services/user-auth";

export const signInWithGoogle = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("user/auth/signin", async (_, { rejectWithValue }) => {
  try {
    const user = await userAuthService.signInWithGoogle();
    return user;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Google sign-in failed",
    );
  }
});
