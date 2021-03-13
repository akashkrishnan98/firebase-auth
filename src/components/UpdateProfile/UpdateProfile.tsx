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
import { FORM_LABELS } from "../../configs/label_config";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import PATHS from "../../configs/routes_config";
import { useSnackBar } from "../../contexts/SnackBarContext";

const UpdateProfile: React.FC = () => {
  const history = useHistory();

  const { currentUser, updateEmail, updatePassword } = useAuth();
  const { setSnackbarMessage } = useSnackBar();

  const [emailRef, passwordRef, passwordConfirmRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const promises = [];
    if (
      emailRef.current &&
      emailRef.current.value &&
      emailRef.current.value !== currentUser?.email
    )
      promises.push(updateEmail(emailRef.current.value));

    if (
      passwordRef.current &&
      passwordRef.current.value &&
      passwordConfirmRef.current &&
      passwordConfirmRef.current.value
    ) {
      if (passwordRef.current.value === passwordConfirmRef.current.value)
        promises.push(updatePassword(passwordRef.current.value));
      else
        setSnackbarMessage({
          message: FORM_LABELS.PASSWORD_MISMATCH,
          type: "error",
        });
    }

    if (promises.length) {
      setLoading(true);
      Promise.all(promises)
        .then(() => {
          setSnackbarMessage({ message: FORM_LABELS.SUCCESS_UPDATE_PROFILE });
          history.push(PATHS.DASHBOARD);
        })
        .catch(() => {
          setSnackbarMessage({
            message: FORM_LABELS.ERROR_UPDATE_PROFILE,
            type: "error",
          });
        })
        .finally(() => setLoading(false));
    }
  };

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.formContainer}>
        <Typography variant="h4" align="center">
          {FORM_LABELS.UPDATE_PROFILE}
        </Typography>
        <form onSubmit={(event) => handleProfileUpdate(event)}>
          <Grid container spacing={3} alignItems="center" justify="center">
            <Grid item xs={12}>
              <Box>
                <TextField
                  id="email"
                  label={FORM_LABELS.EMAIL}
                  type="email"
                  inputRef={emailRef}
                  className={classes.inputFields}
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
                    {FORM_LABELS.UPDATE}
                  </Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box mt={2}>
        <Typography align="center">
          <Link to={PATHS.DASHBOARD} className={classes.links}>
            {FORM_LABELS.CANCEL}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default UpdateProfile;
