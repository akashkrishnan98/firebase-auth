import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import useStyles from "../../styles/Form.Styles";
import { FORM_LABELS } from "../../configs/label_config";
import { useAuth } from "../../contexts/AuthContext";
import PATHS from "../../configs/routes_config";
import { useSnackBar } from "../../contexts/SnackBarContext";

const Loginform: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  const { setSnackbarMessage } = useSnackBar();

  const [emailRef, passwordRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailRef.current && passwordRef.current) {
      setLoading(true);
      try {
        await login(emailRef.current.value, passwordRef.current.value);
        setSnackbarMessage({ message: FORM_LABELS.SUCCESS_LOGIN });
        history.push(PATHS.DASHBOARD);
      } catch {
        setSnackbarMessage({
          message: FORM_LABELS.ERROR_SIGNING_IN,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.formContainer}>
        <Typography variant="h4" align="center">
          {FORM_LABELS.LOGIN}
        </Typography>
        <form onSubmit={(event) => handleLogin(event)}>
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
                <TextField
                  id="pasword"
                  label={FORM_LABELS.PASSWORD}
                  type="password"
                  inputRef={passwordRef}
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
                  className={`${classes.inputFields} ${classes.submitButton}`}
                  disabled={loading}
                >
                  {loading && <CircularProgress color="inherit" size={16} />}
                  <Typography className={classes.submitButtonText}>
                    {FORM_LABELS.LOGIN}
                  </Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="center">
                <Button>
                  <Link to={PATHS.FORGOT_PASSWORD} className={classes.links}>
                    {FORM_LABELS.FORGOT_PASSWORD}
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
  );
};

export default Loginform;
