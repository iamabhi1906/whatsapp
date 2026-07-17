"use client";

import { Box, Button, Typography } from "@mui/material";
import styles from "./google-login.module.css";
import { Google } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { signInWithGoogle } from "@/features/users/user.action";

export default function GoogleLogin() {
  const { loading } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(signInWithGoogle());
  };

  return (
    <Box className={styles.page}>
      {loading ? (
        <Typography>Loading....!!</Typography>
      ) : (
        <Button
          startIcon={<Google />}
          variant="contained"
          onClick={handleClick}
        >
          Continue with google
        </Button>
      )}
    </Box>
  );
}
