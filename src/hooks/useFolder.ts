import { useEffect, useReducer } from "react";
import { FOLDER_ACTIONS, ROOT_FOLDER } from "../configs/app-config";
import { useAuth } from "../contexts/AuthContext";
import { IFolder, IFolderReducerState } from "../interface/app-interface";
import { FIREBASE_DRIVE_DB } from "../utils/auth-utils";

const reducer = (
  state: IFolderReducerState,
  action: { type: string; payload: IFolderReducerState }
): IFolderReducerState => {
  switch (action.type) {
    case FOLDER_ACTIONS.SELECT_FOLDER:
      return {
        folderId: action.payload.folderId,
        folder: action.payload.folder,
        childFolders: [],
        childFiles: [],
      };

    case FOLDER_ACTIONS.UPDATE_FOLDER:
      return { ...state, folder: action.payload.folder };
    case FOLDER_ACTIONS.SET_CHILD_FOLDERS:
      return { ...state, childFolders: action.payload.childFolders };
    default:
      return state;
  }
};

const initialState: IFolderReducerState = {
  childFolders: [],
  childFiles: [],
};

const useFolder = (
  folderId?: string,
  folder?: IFolder
): IFolderReducerState => {
  const { currentUser } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: FOLDER_ACTIONS.SELECT_FOLDER,
      payload: { folderId, folder },
    });
  }, [folder, folderId]);

  useEffect(() => {
    if (!folderId) {
      return dispatch({
        type: FOLDER_ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    FIREBASE_DRIVE_DB.folders
      .doc(folderId)
      .get()
      .then((doc) => {
        dispatch({
          type: FOLDER_ACTIONS.UPDATE_FOLDER,
          payload: { folder: FIREBASE_DRIVE_DB.formattedDoc(doc) },
        });
      })
      .catch(() => {
        dispatch({
          type: FOLDER_ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    return FIREBASE_DRIVE_DB.folders
      .where("parentId", "==", folderId || null)
      .where("userId", "==", currentUser?.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        dispatch({
          type: FOLDER_ACTIONS.SET_CHILD_FOLDERS,
          payload: {
            childFolders: snapshot.docs.map(FIREBASE_DRIVE_DB.formattedDoc),
          },
        });
      });
  }, [currentUser?.uid, folderId]);

  return state;
};

export default useFolder;
