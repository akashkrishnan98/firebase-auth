import React from "react";
import { Box, Grid } from "@material-ui/core";
import Navbar from "../Navbar";
import { AddFolderButton } from "./AddFolderButton";
import useFolder from "../../hooks/useFolder";
import Folder from "./Folder";
import { useLocation, useParams } from "react-router";
import PathBreadcrumb from "./PathBreadcrumb";
import useStyles from "./Dashboard.Styles";
import File from "./File";
import { IFolder } from "../../interface/app-interface";
import AddFileButton from "./AddFileButton";

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const { folderId } = useParams<{ folderId: string }>();
  const { state = { folder: undefined } } = useLocation<{ folder: IFolder }>();
  const { folder, childFolders, files } = useFolder(folderId, state.folder);

  return (
    <>
      <Navbar />
      <Box px={3} py={2}>
        <Box component="span" pb={1.2} mb={2.5} className={classes.path}>
          <PathBreadcrumb folder={folder} />
          <AddFileButton folder={folder} />
          <AddFolderButton folder={folder} />
        </Box>
        <Grid container>
          {childFolders?.map((childFolder) => (
            <Box component="span" m={1} key={`${folder?.id}-${childFolder.id}`}>
              <Folder folder={childFolder} />
            </Box>
          ))}

          {files?.map((file) => (
            <Box component="span" m={1} key={`${folder?.id}-${file.id}`}>
              <File file={file} />
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
