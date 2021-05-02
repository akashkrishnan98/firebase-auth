import { Button, Link, Box } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { IFile } from "../../interface/app-interface";
import useStyles from "./Dashboard.Styles";

interface IFileProps {
  file?: IFile;
}
const File: React.FC<IFileProps> = ({ file }) => {
  const classes = useStyles();

  return (
    <Link target="_blank" color="secondary" href={file?.url || "/"}>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.fileButton}
      >
        <Box component="span" mr={1}>
          <FontAwesomeIcon icon={faFile} />
        </Box>{" "}
        {file?.name}
      </Button>
    </Link>
  );
};

export default File;
