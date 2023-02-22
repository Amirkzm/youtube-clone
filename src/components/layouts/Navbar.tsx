import { AppBar, Box, Drawer, IconButton, Stack, Toolbar } from "@mui/material";
import { logo } from "../../utils/constants";
import { Link } from "react-router-dom";
import Search from "../Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (
    <AppBar>
      <Toolbar
        sx={{ justifyContent: "space-between", bgcolor: "background.default" }}
      >
        <Stack direction={"row"}>
          <Box sx={{ display: { lg: "none" } }}>
            <IconButton
              edge="start"
              color="primary"
              aria-label="open drawer"
              onClick={() => setShowDrawer(true)}
              sx={{
                mr: 2,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={"left"}
              open={showDrawer}
              onClose={() => setShowDrawer(false)}
              sx={{
                "& .MuiPaper-root": {
                  bgcolor: "common.black",
                  backgroundImage: "none",
                },
              }}
            >
              <Box
                onClick={() => setShowDrawer(false)}
                onKeyDown={() => setShowDrawer(false)}
              >
                <Sidebar />
              </Box>
            </Drawer>
          </Box>
          <Link to={"/"}>
            <img src={logo} alt="logo" height={45} />
          </Link>
        </Stack>
        <Search />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
