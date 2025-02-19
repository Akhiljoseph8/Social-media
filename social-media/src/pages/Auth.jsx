import React, { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { userRegister, userLogin } from "../services/allApis";
import { toast } from "react-toastify";
import { tokenAuthContext } from "../Context_api/AuthContext";
import { useNavigate } from "react-router-dom";

function Auth() {
  const { setAuthStatus } = useContext(tokenAuthContext);
  const [status, setStatus] = useState(true);
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();
  const changeStatus = () => setStatus(!status);


  const handleRegister = async () => {
    const { username, password, email, phone } = data;
    if (!username || !password || !email || !phone) {
      toast.warning("Invalid Inputs!! Enter valid data!!");
    } else {
      const result = await userRegister(data);
      if (result.status === 200) {
        toast.success("Registration successful");
        setData({ username: "", password: "", email: "", phone: "" });
        window.location.reload();
      } else {
        toast.error(result.response.data);
      }
    }
  };


  const handleLogin = async () => {
    const { password, email } = data;
    if (!password || !email) {
      toast.warning("Invalid Inputs!! Enter valid data!!");
    } else {
      const result = await userLogin({ email, password });
      if (result.status === 200) {
        toast.success("Login successful");
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("username", result.data.user);
        sessionStorage.setItem("userId", result.data.userId);
        setAuthStatus(true);

        navigate("/feed");
      } else {
        toast.error(result.response.data);
      }
    }
  };

  
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "90vh" }}
    >
      <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Grid container justifyContent="center" mb={2}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
              alt="auth"
              width={60}
            />
          </Grid>
          <Typography variant="h5" gutterBottom>
            {status ? "Login" : "Register"}
          </Typography>
          {!status && (
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              variant="outlined"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {!status && (
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              type="number"
              variant="outlined"
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={status ? handleLogin : handleRegister}
            >
              {status ? "Login" : "Register"}
            </Button>
            <Button color="secondary" onClick={changeStatus}>
              {status ? "New User?" : "Already a User?"}
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Auth;
