import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import FIREBASE_CONFIG from "../configs/firebase-config";
import { IFolder } from "../interface/app-interface";

const FIREBASE_APP = firebase.initializeApp({
  apiKey: FIREBASE_CONFIG.API_KEY,
  authDomain: FIREBASE_CONFIG.AUTH_DOMAIN,
  projectId: FIREBASE_CONFIG.PROJECT_ID,
  storageBucket: FIREBASE_CONFIG.STORAGE_BUCKET,
  messagingSenderId: FIREBASE_CONFIG.MESSAGING_SENDER_ID,
  appId: FIREBASE_CONFIG.APP_ID,
});

const firestore = FIREBASE_APP.firestore();

export const FIREBASE_DRIVE_DB = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formattedDoc: (
    doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ) => ({ id: doc.id, ...doc.data() } as IFolder),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const FIREBASE_STORAGE = FIREBASE_APP.storage();
export const FIREBASE_AUTH = FIREBASE_APP.auth();
export default FIREBASE_APP;
