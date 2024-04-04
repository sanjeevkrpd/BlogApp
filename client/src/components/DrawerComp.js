import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const DrawerComp = () => {
  const [opendrawer, setOpendrawer] = useState(false);
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.removeItem("userId"); // Clear userId from localStorage
    } catch (error) {
      console.log(error);
    }
  };

  const PAGES = [
    { name: "Blogs", link: "/blogs" },
    { name: "My Blogs", link: "/my-blogs" },
    { name: "Create Blog", link: "/create-blog" },
  ];

  return (
    <>
      <Drawer open={opendrawer} onClose={() => setOpendrawer(false)}>
        <List>
          {PAGES.map((page, index) => (
            <ListItemButton key={index} component={Link} to={page.link}>
              <ListItemText>{page.name}</ListItemText>
            </ListItemButton>
          ))}
          {isLogin ? (
            <ListItemButton onClick={handleLogout}>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          ) : (
            <>
              <ListItemButton component={Link} to="/login">
                <ListItemText>Login</ListItemText>
              </ListItemButton>
              <ListItemButton component={Link} to="/register">
                <ListItemText>Register</ListItemText>
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpendrawer(!opendrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
