import firebase from "firebase/app";

export interface IFolderPath {
  name: string;
  id: string;
}

export interface IFolder {
  id?: string;
  name: string;
  parentId?: string | null;
  userId?: string;
  createdAt?: firebase.firestore.FieldValue;
  path?: IFolderPath[];
}

export interface IFile {
  id?: string;
  url: string;
  name: string;
  createdAt: firebase.firestore.FieldValue;
  folderId: string | null;
  userId: string;
}

export interface IFolderReducerState {
  folderId?: string;
  folder?: IFolder;
  childFolders?: IFolder[];
  files?: IFile[];
}
