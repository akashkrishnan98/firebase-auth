import React, { useRef, useState } from "react";
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
import { Link, useHistory } from "react-router-dom";
import PATHS from "../../configs/routes-config";
import { useSnackBar } from "../../contexts/SnackBarContext";
import CenteredComponent from "../CenteredComponent";

const SignUpForm: React.FC = () => {
  const history = useHistory();

  const { signUp } = useAuth();
  const { setSnackbarMessage } = useSnackBar();

  const [emailRef, passwordRef, passwordConfirmRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailRef.current && passwordRef.current && passwordConfirmRef.current) {
      if (passwordRef.current.value === passwordConfirmRef.current.value) {
        setLoading(true);
        try {
          await signUp(emailRef.current.value, passwordRef.current.value);
          setSnackbarMessage({ message: FORM_LABELS.SUCCESS_SIGN_UP });
          history.push(PATHS.DASHBOARD);
        } catch {
          setSnackbarMessage({
            message: FORM_LABELS.ERROR_SIGNING_UP,
            type: "error",
          });
        } finally {
          setLoading(false);
        }
      } else
        setSnackbarMessage({
          message: FORM_LABELS.PASSWORD_MISMATCH,
          type: "error",
        });
    }
  };

  const classes = useStyles();

  return (
    <CenteredComponent>
      <Box className={classes.root}>
        <Box className={classes.formContainer}>
          <Typography variant="h4" align="center">
            {FORM_LABELS.SIGN_UP}
          </Typography>
          <form onSubmit={(event) => handleSignUp(event)}>
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
                  <TextField
                    id="pasword-confirm"
                    label={FORM_LABELS.PASSWORD_CONFIRM}
                    type="password"
                    inputRef={passwordConfirmRef}
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
                      {FORM_LABELS.SIGN_UP}
                    </Typography>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box mt={2}>
          <Typography align="center">
            {FORM_LABELS.EXISTING_ACCOUNT}{" "}
            <Link to={PATHS.LOGIN} className={classes.links}>
              {FORM_LABELS.LOGIN}
            </Link>
          </Typography>
        </Box>
      </Box>
    </CenteredComponent>
  );
};

export default SignUpForm;
