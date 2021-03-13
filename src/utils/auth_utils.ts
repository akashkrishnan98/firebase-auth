import firebase from "firebase/app";
import "firebase/auth";
import FIREBASE_CONFIG from "../configs/firebase_config";

const FIREBASE_APP = firebase.initializeApp({
  apiKey: FIREBASE_CONFIG.API_KEY,
  authDomain: FIREBASE_CONFIG.AUTH_DOMAIN,
  projectId: FIREBASE_CONFIG.PROJECT_ID,
  storageBucket: FIREBASE_CONFIG.STORAGE_BUCKET,
  messagingSenderId: FIREBASE_CONFIG.MESSAGING_SENDER_ID,
  appId: FIREBASE_CONFIG.APP_ID,
});

export const FIREBASE_AUTH = FIREBASE_APP.auth();
export default FIREBASE_APP;
