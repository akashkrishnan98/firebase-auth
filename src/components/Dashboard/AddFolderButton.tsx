import React, { useRef, useState } from "react";
import { Button, Modal, Box, TextField, Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import useStyles from "./Dashboard.Styles";
import { DASHBOARD_LABELS } from "../../configs/label-config";
import { FIREBASE_DRIVE_DB } from "../../utils/auth-utils";
import { useSnackBar } from "../../contexts/SnackBarContext";
import { useAuth } from "../../contexts/AuthContext";
import { IFolder } from "../../interface/app-interface";
import { ROOT_FOLDER } from "../../configs/app-config";

interface IAddFolderButtonProps {
  folder?: IFolder | null;
}

export const AddFolderButton: React.FC<IAddFolderButtonProps> = ({
  folder,
}) => {
  const { currentUser } = useAuth();
  const classes = useStyles();
  const { setSnackbarMessage } = useSnackBar();
  const [open, setOpen] = useState(false);
  const fileNameRef = useRef<HTMLInputElement>(null);

  const handleAddFolder = async () => {
    if (fileNameRef.current) {
      try {
        const path = folder?.path ? [...folder?.path] : [];
        if (folder && folder !== ROOT_FOLDER) {
          path.push({ name: folder.name, id: folder.id || "" });
        }

        FIREBASE_DRIVE_DB.folders.add({
          name: fileNameRef.current.value,
          parentId: folder?.id || null,
          userId: currentUser?.uid || null,
          path,
          createdAt: FIREBASE_DRIVE_DB.getCurrentTimestamp(),
        } as IFolder);
        setSnackbarMessage({ message: DASHBOARD_LABELS.SUCCESS_ADD_FOLDER });
        // fileNameRef.current.value = "";
      } catch {
        setSnackbarMessage({
          message: DASHBOARD_LABELS.ERROR_ADD_FOLDER,
          type: "error",
        });
      }
    }
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" size="large" onClick={handleOpen}>
        <FontAwesomeIcon icon={faFolderPlus} size="lg" />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.modal}>
          <form>
            <Grid container spacing={2} justify="flex-end">
              <Grid item xs={12}>
                <TextField
                  className={classes.modalInput}
                  id="add-folder"
                  inputRef={fileNameRef}
                  label={DASHBOARD_LABELS.FOLDER_NAME}
                />
              </Grid>
              <Grid item xs={12}>
                <Box textAlign="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.modalButton}
                    onClick={handleClose}
                  >
                    {DASHBOARD_LABELS.CLOSE_MODAL}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.modalButton}
                    onClick={handleAddFolder}
                    // disabled={
                    //   !(fileNameRef.current && fileNameRef.current.value)
                    // }
                  >
                    {DASHBOARD_LABELS.ADD_FOLDER}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};
