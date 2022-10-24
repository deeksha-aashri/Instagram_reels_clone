import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import insta from '../assets/instagramlogo.png'
import Image from 'next/image'
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import { AuthContext } from "../context/auth";

import { useRouter } from "next/router";
import Link from "next/link";


const ResponsiveAppBar = ({userData}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {user}=React.useContext(AuthContext);
   const {logout}=React.useContext(AuthContext);
   const router=useRouter();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
   
    setAnchorElUser(null);
  };
  const handlelogout=async()=>{
    await logout();
    router.push('/login');
  }

  return (
    <AppBar position="static" className="navbar"  sx={{background:"white", overflowX:"hidden", width:"100vw" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Image src={insta} width={200} height={55} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }} className="nav-icons-container">
           <Link href="/" style={{cursor:"pointer"}}>
           <HomeIcon fontSize="large" className="nav-icons" />
           </Link>
            
            <ExploreIcon fontSize="large" className="nav-icons" />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={userData?.downloadURL}
                  sx={{ margin: "0.5rem" }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem  onClick={handleCloseUserMenu}>
                <Link href='/profile'>
                  <Typography textAlign="center">Profile</Typography>
                  </Link>
                </MenuItem>
                <MenuItem  onClick={()=>{
                handlelogout()
                handleCloseUserMenu()
                }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;