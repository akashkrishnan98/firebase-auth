import React from "react";
import useStyles from "./CenteredComponent.Styles";

const CenteredComponent: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default CenteredComponent;
