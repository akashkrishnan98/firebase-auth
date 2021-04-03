import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import useStyles from "../../styles/Form.Styles";
import { FORM_LABELS } from "../../configs/label-config";
import { useAuth } from "../../contexts/AuthContext";
import PATHS from "../../configs/routes-config";
import { useSnackBar } from "../../contexts/SnackBarContext";
import CenteredComponent from "../CenteredComponent";

const ForgotPassword: React.FC = () => {
  const { setSnackbarMessage } = useSnackBar();
  const { passwordReset } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (emailRef.current) {
      setLoading(true);
      try {
        await passwordReset(emailRef.current.value);
        setSnackbarMessage({
          message: FORM_LABELS.SUCCESS_PASSWORD_RESET_REQUEST,
        });
      } catch {
        setSnackbarMessage({
          message: FORM_LABELS.ERROR_PASSWORD_RESET,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const classes = useStyles();

  return (
    <CenteredComponent>
      <Box className={classes.root}>
        <Box className={classes.formContainer}>
          <Typography variant="h4" align="center">
            {FORM_LABELS.PASSWORD_RESET}
          </Typography>
          <form onSubmit={(event) => handlePasswordReset(event)}>
            <Grid container spacing={3} alignItems="center" justify="center">
              <Grid item xs={12}>
                <Box>
                  <TextField
                    id="email"
                    label={FORM_LABELS.EMAIL}
                    type="email"
                    inputRef={emailRef}
                    className={classes.inputFields}
                    required
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    className={`${classes.inputFields}`}
                    disabled={loading}
                  >
                    {loading && <CircularProgress color="inherit" size={16} />}
                    <Typography className={classes.submitButtonText}>
                      {FORM_LABELS.RESET_PASSWORD}
                    </Typography>
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box textAlign="center">
                  <Button>
                    <Link to={PATHS.LOGIN} className={classes.links}>
                      {FORM_LABELS.LOGIN}
                    </Link>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box mt={2}>
          <Typography align="center">
            {FORM_LABELS.NEW_ACCOUNT}{" "}
            <Link to={PATHS.SIGN_UP} className={classes.links}>
              {FORM_LABELS.SIGN_UP}
            </Link>
          </Typography>
        </Box>
      </Box>
    </CenteredComponent>
  );
};

export default ForgotPassword;
