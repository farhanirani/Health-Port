import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";

import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Button from "@material-ui/core/Button";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import AndroidIcon from "@material-ui/icons/Android";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import ButtonBase from "@material-ui/core/ButtonBase";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ChatIcon from "@material-ui/icons/Chat";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { userData, setUserData } = useContext(UserContext);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    alert("Successfully logged out!");
    history.push("/");
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const login = () => {
    handleMenuClose();
    history.push("/login");
  };
  const signup = () => {
    handleMenuClose();
    history.push("/signup");
  };
  const forum = () => {
    handleMenuClose();
    history.push("/forum");
  };
  const dashboard = () => {
    handleMenuClose();
    history.push("/messages");
  };
  const home = () => {
    handleMenuClose();
    history.push("/");
  };
  const chatbot = () => {
    handleMenuClose();
    history.push("/chatbot");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Login</MenuItem>
      <MenuItem onClick={handleMenuClose}>Signup</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={chatbot}
        style={{ textAlign: "center", alignItems: "center" }}
      >
        <IconButton aria-label="show 4 new mails" color="inherit">
          <AndroidIcon />
        </IconButton>
        <p>ChatBot</p>
      </MenuItem>
      <MenuItem
        style={{ textAlign: "center", alignItems: "center" }}
        onClick={forum}
      >
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <NotificationsIcon />
        </IconButton>
        <p>Forum</p>
      </MenuItem>
      {userData.user ? (
        <>
          <MenuItem
            style={{ textAlign: "center", alignItems: "center" }}
            onClick={dashboard}
          >
            <IconButton color="inherit">
              <ChatIcon />
            </IconButton>
            <p>Messages</p>
          </MenuItem>

          <MenuItem
            style={{ textAlign: "center", alignItems: "center" }}
            onClick={logout}
          >
            <IconButton color="inherit">
              <LockIcon />
            </IconButton>
            <p>Logout</p>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem
            style={{ textAlign: "center", alignItems: "center" }}
            onClick={login}
          >
            <IconButton color="inherit">
              <LockOpenIcon />
            </IconButton>
            <p>Login</p>
          </MenuItem>

          <MenuItem
            style={{ textAlign: "center", alignItems: "center" }}
            onClick={signup}
          >
            <IconButton color="inherit">
              <HowToRegIcon />
            </IconButton>
            <p>Sign up</p>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <ButtonBase focusRipple key="Logo" onClick={home}>
              <LocalHospitalIcon />
              <Typography
                className={classes.title}
                variant="h6"
                noWrap
                style={{ marginLeft: 5 }}
              >
                HealthPort
              </Typography>
            </ButtonBase>
            {/* <div className={classes.search} style={{ marginLeft: "10%" }}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div> */}
            <div className={classes.grow} />
            <div
              className={classes.sectionDesktop}
              flexWrap="nowrap"
              alignItems="flex-end"
            >
              <IconButton aria-label="show 4 new mails" color="inherit">
                <AndroidIcon />
              </IconButton>
              <ButtonBase color="inherit" onClick={chatbot}>
                <Box>ChatBot</Box>
              </ButtonBase>
              <IconButton
                aria-label="show 11 new notifications"
                color="inherit"
              >
                <NotificationsIcon />
              </IconButton>
              <ButtonBase color="inherit" onClick={forum}>
                <Box>Forum</Box>
              </ButtonBase>

              {userData.user ? (
                <>
                  <IconButton color="inherit">
                    <ChatIcon />
                  </IconButton>
                  <ButtonBase color="inherit" onClick={dashboard}>
                    <Box>Messages</Box>
                  </ButtonBase>
                  <IconButton color="inherit">
                    <LockIcon />
                  </IconButton>
                  <ButtonBase color="inherit" onClick={logout}>
                    <Box>Logout</Box>
                  </ButtonBase>
                </>
              ) : (
                <>
                  <IconButton color="inherit">
                    <LockOpenIcon />
                  </IconButton>
                  <ButtonBase color="inherit" onClick={login}>
                    <Box>Login</Box>
                  </ButtonBase>
                  <IconButton color="inherit">
                    <HowToRegIcon />
                  </IconButton>
                  <ButtonBase color="inherit" onClick={signup}>
                    <Box>Signup</Box>
                  </ButtonBase>
                </>
              )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </>
  );
}
