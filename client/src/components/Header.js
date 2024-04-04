import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import DrawerComp from "./DrawerComp";

const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // state
  const [value, setValue] = useState();


  // logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">BLOG APP</Typography>
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              {isLogin && (
                <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
                  <Tabs
                    textColor="inherit"
                    value={value}
                    onChange={(e, val) => setValue(val)}
                  >
                    <Tab label="Blogs" component={Link} to="/blogs" />
                    <Tab label="My Blogs" component={Link} to="/my-blogs" />
                    <Tab
                      label="Create Blog"
                      component={Link}
                      to="/create-blog"
                    />
                  </Tabs>
                </Box>
              )}
            </>
          )}
          {!isMatch && (
            <Box display={"flex"} marginLeft="auto">
              {!isLogin ? (
                <>
                  <Button
                    sx={{ margin: 1, color: "white" }}
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    sx={{ margin: 1, color: "white" }}
                    component={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleLogout}
                  sx={{ margin: 1, color: "white" }}
                >
                  Logout
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
