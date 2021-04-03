import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@material-ui/core";
import useStyles from "./Navbar.Styles";
import { DASHBOARD_LABELS, FORM_LABELS } from "../../configs/label-config";
import { Link, useHistory } from "react-router-dom";
import PATHS from "../../configs/routes-config";
import { useAuth } from "../../contexts/AuthContext";
import { useSnackBar } from "../../contexts/SnackBarContext";

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const { setSnackbarMessage } = useSnackBar();
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setSnackbarMessage({ message: FORM_LABELS.SUCCESS_LOGOUT });
      history.push(PATHS.LOGIN);
    } catch {
      setSnackbarMessage({ message: FORM_LABELS.ERROR_LOGOUT, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.logo}>
              {DASHBOARD_LABELS.CANISTER}
            </Typography>
            <Box px={4}>
              <Typography>
                <Link to={PATHS.USER_PROFILE} className={classes.link}>
                  {DASHBOARD_LABELS.PROFILE}
                </Link>
              </Typography>
            </Box>
            <Button
              onClick={handleLogout}
              variant="contained"
              color="secondary"
              disabled={loading}
            >
              {DASHBOARD_LABELS.LOGOUT}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
