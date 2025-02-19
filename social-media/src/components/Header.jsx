import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
} from "@mui/material";
import { Search, AccountCircle, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976D2" }}>
          Feed
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            background: "#f0f2f5",
            px: 1,
            borderRadius: 2,
          }}
        >
          <Search sx={{ color: "#555" }} />
          <InputBase placeholder="Search..." sx={{ ml: 1 }} />
        </Box>
        <IconButton onClick={() => navigate("/feed")}>
          <Home sx={{ fontSize: 30, color: "#333" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
