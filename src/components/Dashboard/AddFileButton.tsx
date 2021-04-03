import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import React from "react";
import { ROOT_FOLDER } from "../../configs/app-config";
import { DASHBOARD_LABELS } from "../../configs/label-config";
import { useAuth } from "../../contexts/AuthContext";
import { useSnackBar } from "../../contexts/SnackBarContext";
import { IFolder } from "../../interface/app-interface";
import { FIREBASE_STORAGE } from "../../utils/auth-utils";

interface IAddFileButtonProps {
  folder?: IFolder;
}
const AddFileButton: React.FC<IAddFileButtonProps> = ({ folder }) => {
  const { currentUser } = useAuth();
  const { setSnackbarMessage } = useSnackBar();

  const handleFileUpload = (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      console.log("Entered here");

      const file = target.files[0];
      if (!folder || !file) return;

      let absPath: string = "";

      if (folder && folder.path)
        absPath = `${folder?.path?.map((eachPath) => eachPath.name).join("/")}`;

      console.log(absPath);

      const filePath =
        folder === ROOT_FOLDER ? `${absPath}` : `${absPath}/${folder.name}`;

      try {
        FIREBASE_STORAGE.ref(
          `/files/${currentUser?.uid}/${filePath}/${file.name}`
        ).put(file);
        setSnackbarMessage({ message: DASHBOARD_LABELS.SUCCESS_UPLOAD_FILE });
      } catch {
        setSnackbarMessage({
          message: DASHBOARD_LABELS.ERROR_UPLOAD_FILE,
          type: "error",
        });
      }
    }
  };

  return (
    <>
      <Button component="label" variant="outlined" size="large">
        <FontAwesomeIcon icon={faFileUpload} size="lg" />
        <input
          type="file"
          hidden
          onClick={(event: React.MouseEvent<HTMLInputElement>) => {
            handleFileUpload(event);
          }}
        />
      </Button>
    </>
  );
};

export default AddFileButton;
