import { Box, TextField } from "@mui/material";
import styles from "./search.module.css";

export default function ChatSearch() {
  return (
    <Box className={styles.box}>
      <TextField
        fullWidth
        className={styles.input}
        placeholder="Search or start a new chat"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: `30px`,
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(194, 189, 184, 0.15)",
            alignItems: "center",
            display: "flex",
            fontSize: "14px",

            "& fieldset": {
              borderColor: "transparent",
              borderRadius: `30px`,
            },
            "&:hover fieldset": {
              borderColor: "rgba(194, 189, 184, 0.3)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1daa61",
              borderWidth: "2px",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "9px 50px 14px",
            alignItems: "center",
          },
        }}
      />
      <Box className={styles.searchIcon}>
        <svg
          viewBox="0 0 24 24"
          height="20"
          width="20"
          preserveAspectRatio="xMidYMid meet"
          fill="#686765"
        >
          <title>ic-search</title>
          <path
            fill="#686765"
            d="M9.5 16a6.27 6.27 0 0 1-4.61-1.89A6.27 6.27 0 0 1 3 9.5c0-1.82.63-3.35 1.89-4.61A6.27 6.27 0 0 1 9.5 3c1.82 0 3.35.63 4.61 1.89A6.27 6.27 0 0 1 16 9.5a6.1 6.1 0 0 1-1.3 3.8l5.6 5.6c.18.18.27.42.27.7 0 .28-.09.52-.27.7a.95.95 0 0 1-.7.27.95.95 0 0 1-.7-.27l-5.6-5.6A5.96 5.96 0 0 1 9.5 16Zm0-2c1.25 0 2.31-.44 3.19-1.31A4.34 4.34 0 0 0 14 9.5c0-1.25-.44-2.31-1.31-3.19A4.34 4.34 0 0 0 9.5 5c-1.25 0-2.31.44-3.19 1.31A4.34 4.34 0 0 0 5 9.5c0 1.25.44 2.31 1.31 3.19A4.34 4.34 0 0 0 9.5 14Z"
          ></path>
        </svg>
      </Box>
    </Box>
  );
}
