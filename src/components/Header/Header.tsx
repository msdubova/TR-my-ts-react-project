import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <>
      <AppBar position="static" sx={{ background: "#333D29" }}>
        <Toolbar>
          <Typography variant="h6">Oak Cinema</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
