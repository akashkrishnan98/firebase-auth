import React, { useContext, useEffect, useState } from "react";

import { Snackbar, SnackbarOrigin } from "@material-ui/core";
import Alert, { Color } from "@material-ui/lab/Alert";

interface ISnackbarMessage {
  message: string;
  type?: Color;
}
interface ISnackbarContext {
  snackbarMessage: ISnackbarMessage;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<ISnackbarMessage>>;
  snackbarCoordinate: SnackbarOrigin;
  setSnackbarCoordinate: React.Dispatch<React.SetStateAction<SnackbarOrigin>>;
  isSnackbarOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openSnackBar: () => void;
  closeSnackBar: () => void;
}

const SnackbarContext = React.createContext<ISnackbarContext>({
  snackbarMessage: { message: "" },
  setSnackbarMessage: () => {},
  snackbarCoordinate: { vertical: "top", horizontal: "center" },
  setSnackbarCoordinate: () => {},
  isSnackbarOpen: false,
  setIsOpen: () => {},
  openSnackBar: () => {},
  closeSnackBar: () => {},
});

export const useSnackBar = () => {
  return useContext(SnackbarContext);
};

const SnackbarProvider: React.FC = ({ children }) => {
  const [snackbarMessage, setSnackbarMessage] = useState<ISnackbarMessage>({
    message: "",
    type: "info",
  });
  const [snackbarCoordinate, setSnackbarCoordinate] = useState<SnackbarOrigin>({
    vertical: "top",
    horizontal: "center",
  });
  const [isSnackbarOpen, setIsOpen] = useState(false);

  const openSnackBar = () => setIsOpen(true);

  const closeSnackBar = () => {
    setIsOpen(false);
    setSnackbarMessage({ message: "" });
  };

  useEffect(() => {
    openSnackBar();
  }, [snackbarMessage]);

  return (
    <SnackbarContext.Provider
      value={{
        snackbarMessage,
        setSnackbarMessage,
        snackbarCoordinate,
        setSnackbarCoordinate,
        isSnackbarOpen,
        setIsOpen,
        openSnackBar,
        closeSnackBar,
      }}
    >
      {children}
      {snackbarMessage.message && (
        <Snackbar
          anchorOrigin={snackbarCoordinate}
          open={isSnackbarOpen}
          autoHideDuration={6000}
          key={`${snackbarMessage}-snackbar`}
          onClose={closeSnackBar}
        >
          <Alert
            severity={snackbarMessage.type}
            variant="filled"
            onClose={closeSnackBar}
          >
            {snackbarMessage.message}
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
