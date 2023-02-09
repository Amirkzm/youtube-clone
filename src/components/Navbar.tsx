import { AppBar, Toolbar } from "@mui/material";
import { logo } from "../utils/constants";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Link to={"/"}>
          <img src={logo} alt="logo" height={45} />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
