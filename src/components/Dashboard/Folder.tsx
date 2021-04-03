import { Button, Box } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import useStyles from "./Dashboard.Styles";
import React from "react";
import { IFolder } from "../../interface/app-interface";
import { useHistory } from "react-router-dom";

interface IFolderProps {
  folder?: IFolder;
}
const Folder: React.FC<IFolderProps> = ({ folder }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleFolderClick = () => {
    history.push({
      pathname: `/folders/${folder?.id}`,
      state: { folder: folder as IFolder },
    });
  };

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        className={classes.folderButton}
        onClick={handleFolderClick}
      >
        <Box component="span" mr={1}>
          <FontAwesomeIcon icon={faFolder} />
        </Box>
        {folder?.name}
      </Button>
    </>
  );
};

export default Folder;
