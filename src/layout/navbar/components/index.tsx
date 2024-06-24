import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import logo from "@/assets/images/logo.png";
import { Stack } from "@mui/material";
import AccountMenu from "./account-menu";
import CartMenu from "./cart-menu";
import SearchPopup from "./search-popup";
import Login from "./login";
import Link from "next/link";
import { useAccessCookie } from "../hooks";

const pages = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Blog", "/blog"],
  ["FAQ", "/FAQ"],
  ["About Us", "/about-us"],
];

export default function Navbar() {
  const { data: hasAccess } = useAccessCookie();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "transparent",
          color: "black",
          boxShadow: "none",
          py: "20px",
        }}
      >
        <Container disableGutters sx={{ maxWidth: "1440px" }}>
          <Toolbar disableGutters sx={{ paddingLeft: 0, paddingRight: 0 }}>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link href={"/"}>
                <Box
                  component="img"
                  src={logo.src}
                  alt="Logo"
                  sx={{ height: "63px", width: "56px", marginRight: 2 }}
                />
              </Link>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <Link key={page[0]} href={page[1]}>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography
                          textAlign="center"
                          sx={{ color: "black", textTransform: "none" }}
                        >
                          {page[0]}
                        </Typography>
                      </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </Box>

              <Box
                sx={{
                  flexGrow: 0,
                  display: { xs: "none", md: "flex" },
                }}
              >
                {pages.map((page) => (
                  <Link key={page[0]} href={page[1]}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        mx: "24px",
                        fontSize: "18px",
                        fontWeight: "light",
                        color: "black",
                        display: "block",
                        textTransform: "none",
                      }}
                    >
                      {page[0]}
                    </Button>
                  </Link>
                ))}
              </Box>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={4}
                sx={{ flexGrow: 0 }}
              >
                <SearchPopup />
                <CartMenu />
                {hasAccess ? <AccountMenu /> : <Login />}
              </Stack>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        className="child1"
        sx={{
          height: 2,
          borderRadius: 4,
          backgroundImage:
            "linear-gradient(to right, #81b4ff, #6da1f4, #598ee8, #457cdc, #3069cf, #3069cf, #3069cf, #3069cf, #457cdc, #598ee8, #6da1f4, #81b4ff)",
        }}
      ></Box>
    </>
  );
}
