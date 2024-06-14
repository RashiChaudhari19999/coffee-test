// src/components/Navbar.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "../images/logo1.png";

const Navbar = ({ isLoggedIn, user, onLogout }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, marginTop: "8px" }}
      >
        <img src={logo} alt="Logo" height={"50px"} width={"150px"} />
      </Typography>
      {isLoggedIn ? (
        <>
          <Typography variant="h6" component="div">
            Welcome, {user}
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>
        </>
      )}
    </Toolbar>
  </AppBar>
);

export default Navbar;
