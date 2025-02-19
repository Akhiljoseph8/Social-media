import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import Header from "../components/Header";

const Profile = ({ user }) => {
  const loggedInUser = sessionStorage.getItem("username");

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card>
          <CardHeader
            avatar={
              <Avatar
                src={loggedInUser ? loggedInUser.charAt(0).toUpperCase() : "?"}
                alt={loggedInUser}
              />
            }
            title={loggedInUser}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Welcome back, {loggedInUser}!
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Profile;
