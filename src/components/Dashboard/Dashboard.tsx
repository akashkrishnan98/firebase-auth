import React from "react";
import { Box } from "@material-ui/core";
import Navbar from "../Navbar";
import { AddFolderButton } from "./AddFolderButton";
import useFolder from "../../hooks/useFolder";
import Folder from "./Folder";
import { useLocation, useParams } from "react-router";
import PathBreadcrumb from "./PathBreadcrumb";
import useStyles from "./Dashboard.Styles";
import { IFolder } from "../../interface/app-interface";
import AddFileButton from "./AddFileButton";

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const { folderId } = useParams<{ folderId: string }>();
  const { state = { folder: undefined } } = useLocation<{ folder: IFolder }>();
  const { folder, childFolders } = useFolder(folderId, state.folder);

  return (
    <>
      <Navbar />
      <Box px={3} py={2}>
        <Box component="span" pb={1.2} mb={2.5} className={classes.path}>
          <PathBreadcrumb folder={folder} />
          <AddFileButton folder={folder} />
          <AddFolderButton folder={folder} />
        </Box>
        {childFolders?.map((childFolder) => (
          <Box component="span" m={1} key={`${folder?.id}-${childFolder.id}`}>
            <Folder folder={childFolder} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Dashboard;
