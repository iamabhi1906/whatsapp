"use client";

import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./google-login.module.css";
import {
  Google,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  signInWithEmailPassword,
  signInWithGoogle,
  signUpWithEmailPassword,
} from "@/features/users/user.action";

export default function GoogleLogin() {
  const { loading } = useSelector((state: RootState) => state.users);
  const { error } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleClick = () => {
    dispatch(signInWithGoogle());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSignUp) {
      dispatch(signUpWithEmailPassword({ email, password, displayName }));
      return;
    }
    dispatch(signInWithEmailPassword({ email, password }));
  };

  const switchMode = () => {
    setIsSignUp((current) => !current);
    setPassword("");
  };

  return (
    <Box className={styles.page}>
      <Paper className={styles.card} elevation={0}>
        <Box className={styles.brand}>
          <Box className={styles.logo}>
            <LockOutlined fontSize="small" />
          </Box>
          <Typography className={styles.appName}>WhatsApp</Typography>
        </Box>
        <Box className={styles.heading}>
          <Typography variant="h5" className={styles.title}>
            {isSignUp ? "Create your account" : "Welcome back"}
          </Typography>
          <Typography className={styles.subtitle}>
            {isSignUp
              ? "Start chatting in a few seconds."
              : "Sign in to continue your conversations."}
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
          {isSignUp && (
            <TextField
              label="Name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              required
              fullWidth
            />
          )}
          <TextField
            label="Email address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
            autoComplete="email"
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            fullWidth
            autoComplete={isSignUp ? "new-password" : "current-password"}
            helperText={isSignUp ? "Use at least 6 characters." : undefined}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((current) => !current)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {error && (
            <Alert severity="error" className={styles.alert}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            className={styles.primaryButton}
            disabled={loading}
          >
            {loading ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}
          </Button>
        </Box>

        <Divider className={styles.divider}>or</Divider>
        <Button
          startIcon={<Google />}
          variant="outlined"
          className={styles.googleButton}
          onClick={handleClick}
          disabled={loading}
        >
          Continue with Google
        </Button>
        <Typography className={styles.switchText}>
          {isSignUp ? "Already have an account?" : "New to WhatsApp?"}
          <Button
            onClick={switchMode}
            className={styles.switchButton}
            disabled={loading}
          >
            {isSignUp ? "Sign in" : "Create account"}
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}
