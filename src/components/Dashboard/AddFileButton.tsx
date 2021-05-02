import React, { useEffect, useState } from "react";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, LinearProgress, Typography } from "@material-ui/core";
import { ROOT_FOLDER } from "../../configs/app-config";
import { DASHBOARD_LABELS } from "../../configs/label-config";
import { useAuth } from "../../contexts/AuthContext";
import { useSnackBar } from "../../contexts/SnackBarContext";
import { IFolder, IFile } from "../../interface/app-interface";
import { FIREBASE_DRIVE_DB, FIREBASE_STORAGE } from "../../utils/auth-utils";
import { v4 as uuidV4 } from "uuid";
import ReactDOM from "react-dom";
import Alert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";

interface IAddFileButtonProps {
  folder?: IFolder;
}

interface IUploadingFile {
  id: string;
  name: string;
  progress: number;
  error: boolean;
}
const AddFileButton: React.FC<IAddFileButtonProps> = ({ folder }) => {
  const { currentUser } = useAuth();
  const { setSnackbarMessage } = useSnackBar();
  const [uploadingFiles, setUploadingFiles] = useState<IUploadingFile[]>([]);

  const handleFileUpload = (files: FileList | null) => {
    if (!folder || !files) return;

    const id = uuidV4();
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id, name: file.name, progress: 0, error: false },
    ]);
    const file = files[0];
    console.log("file", file);
    if (!folder || !file) {
      console.log("Returned");
      return;
    }

    let absPath: string = "";

    if (folder && folder.path)
      absPath = `${folder?.path?.map((eachPath) => eachPath.name).join("/")}`;

    const filePath =
      folder === ROOT_FOLDER ? `${absPath}` : `${absPath}/${folder.name}`;

    try {
      const uploadTask = FIREBASE_STORAGE.ref(
        `/files/${currentUser?.uid}/${filePath}/${file.name}`
      ).put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadingFiles((prevUploadingFiles) =>
            prevUploadingFiles.map((uploadingFile) => {
              if (uploadingFile.id === id)
                return { ...uploadingFile, progress };
              return uploadingFile;
            })
          );
        },
        () => {},
        () => {
          setUploadingFiles((prevUploadingFiles) =>
            prevUploadingFiles.filter(
              (uploadingFile) => uploadingFile.id !== id
            )
          );
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            FIREBASE_DRIVE_DB.files.add({
              url,
              name: file.name,
              createdAt: FIREBASE_DRIVE_DB.getCurrentTimestamp(),
              folderId: folder?.id || null,
              userId: currentUser?.uid,
            } as IFile);
          });
        }
      );
      // setSnackbarMessage({ message: DASHBOARD_LABELS.SUCCESS_UPLOAD_FILE });
    } catch {
      setSnackbarMessage({
        message: DASHBOARD_LABELS.ERROR_UPLOAD_FILE,
        type: "error",
      });
    }
  };

  useEffect(() => {
    console.log(uploadingFiles);
  }, [uploadingFiles]);

  return (
    <>
      <Button component="label" variant="outlined" size="large">
        <FontAwesomeIcon icon={faFileUpload} size="lg" />
        <input
          type="file"
          hidden
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </Button>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((uploadingFile) => (
              <Alert severity="info">
                <AlertTitle>{uploadingFile.name}</AlertTitle>
                <LinearProgress
                  variant="determinate"
                  value={uploadingFile.progress}
                />
              </Alert>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default AddFileButton;
