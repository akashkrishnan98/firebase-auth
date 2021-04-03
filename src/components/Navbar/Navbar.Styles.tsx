import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
}));

export default useStyles;
