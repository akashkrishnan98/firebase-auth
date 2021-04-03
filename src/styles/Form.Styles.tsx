import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: "auto",
  },
  formContainer: {
    border: `1px solid ${theme.palette.grey[300]}`,
    maxWidth: "500px",
    padding: "40px 30px",
  },

  inputFields: {
    width: "100%",
  },

  links: {
    textDecoration: "none",
  },

  submitButtonText: {
    padding: "8px",
  },

  submitButton: {
    padding: "10px",
  },

  userInfo: {
    padding: "20px 0",
  },
}));

export default useStyles;
