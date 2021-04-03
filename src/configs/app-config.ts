import { IFolder } from "../interface/app-interface";

export const FOLDER_ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
};

export const ROOT_FOLDER: IFolder = { name: "Root", path: [] };
