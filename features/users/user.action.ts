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

export const signInWithEmailPassword = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("user/auth/email-signin", async ({ email, password }, { rejectWithValue }) => {
  try {
    return await userAuthService.signInWithEmailPassword(email, password);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Email sign-in failed",
    );
  }
});

export const signUpWithEmailPassword = createAsyncThunk<
  User,
  { email: string; password: string; displayName: string },
  { rejectValue: string }
>("user/auth/email-signup", async ({ email, password, displayName }, { rejectWithValue }) => {
  try {
    return await userAuthService.signUpWithEmailPassword(email, password, displayName);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Account creation failed",
    );
  }
});
