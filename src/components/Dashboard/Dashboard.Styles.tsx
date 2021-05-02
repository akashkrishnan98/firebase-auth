import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    position: "absolute",
    top: "30%",
    left: "50%",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[500]}`,
    padding: theme.spacing(2, 4, 3),
    transform: "translate(-50%, -50%)",
  },

  breadcrumb: {
    flexGrow: 1,
  },

  path: {
    display: "flex",
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },

  modalInput: {
    width: "100%",
  },

  modalButton: {
    marginLeft: "16px",
  },

  folderButton: {
    textTransform: "initial",
  },

  fileButton: {
    textTransform: "initial",

    a: {
      textDecoration: "none",
    },
  },
}));

export default useStyles;
