import firebase from "firebase/app";

export interface IFolderPath {
  name: string;
  id: string;
}

export interface IFolder {
  name: string;
  id?: string;
  parentId?: string | null;
  userId?: string;
  createdAt?: firebase.firestore.FieldValue;
  path?: IFolderPath[];
}

export interface IFolderReducerState {
  folderId?: string;
  folder?: IFolder;
  childFolders?: IFolder[];
  childFiles?: [];
}
