import { AppBar, Toolbar } from "@mui/material";
import { logo } from "../utils/constants";
import { Link } from "react-router-dom";
import Search from "./Search";

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar
        sx={{ justifyContent: "space-between", bgcolor: "background.default" }}
      >
        <Link to={"/"}>
          <img src={logo} alt="logo" height={45} />
        </Link>
        <Search />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
