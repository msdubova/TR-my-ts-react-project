import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Nav from "../Nav/Nav";
import Logo from "../Logo/Logo";
const Header: React.FC = () => {
  return (
    <>
      <AppBar position="static" sx={{ background: "#333D29" }}>
        <Toolbar>
          <Logo />
          <Typography variant="h6">Oak Cinema</Typography>
          <Nav />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
