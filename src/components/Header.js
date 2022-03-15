import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useAuth } from "context/utils/AuthContext";
import Typography from "@mui/material/Typography";
import { Link } from "react-location";
import "Routes/styles.css";

const Header = () => {
  const { logout } = useAuth();
  // remove the dfault state cause of warn
  const [setError] = useState("");
  const margin10 = { margin: 10 };

  async function logOut() {
    try {
      //setError("");
      await logout();
    } catch {
      setError("La déconnexion a échoué");
    }
  }

  return (
    <AppBar position="static">
      <Toolbar className="nav">
        {/* <img
            className='nav__logo'
            src='/images/DashTrade-logo.png'
            alt='Logo DashTrade'
            style={margin}
          /> */}
        <div className="nav-left">
          <Typography variant="h5" component="div" style={margin10}>
            DashTrade
          </Typography>
          <Link to="/">
            <Typography variant="h6" component="div" style={margin10}>
              Dashboard
            </Typography>
          </Link>
          <Link to="/admin">
            <Typography variant="h6" component="div" style={margin10}>
              Admin
            </Typography>
          </Link>
        </div>
        <div className="nav-right">
          <img
            style={{ cursor: "pointer" }}
            className="nav__avatar"
            src="/images/logout_icon_151219.png"
            alt="Déconnexion"
            onClick={logOut}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
