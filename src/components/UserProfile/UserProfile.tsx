import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "../../styles/Form.Styles";
import { FORM_LABELS } from "../../configs/label-config";
import { useAuth } from "../../contexts/AuthContext";
import { useSnackBar } from "../../contexts/SnackBarContext";
import PATHS from "../../configs/routes-config";
import CenteredComponent from "../CenteredComponent";

const UserProfile: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { setSnackbarMessage } = useSnackBar();
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const handleRedirect = () => {
    history.push(PATHS.UPDATE_PROFILE);
  };

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
    <CenteredComponent>
      <Box className={classes.root}>
        <Box className={classes.formContainer}>
          <Box>
            <Typography variant="h4" align="center">
              {FORM_LABELS.USER_PROFILE}
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={12}>
              <Box className={classes.userInfo}>
                <Typography>
                  {FORM_LABELS.EMAIL}
                  {": "} {currentUser?.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  className={`${classes.inputFields} ${classes.submitButton}`}
                  onClick={() => handleRedirect()}
                >
                  {FORM_LABELS.UPDATE_PROFILE}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="center" pt={1}>
                <Button
                  className={classes.submitButton}
                  onClick={() => handleLogout()}
                  color="primary"
                >
                  {loading && <CircularProgress color="inherit" size={16} />}
                  {FORM_LABELS.LOGOUT}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </CenteredComponent>
  );
};

export default UserProfile;
