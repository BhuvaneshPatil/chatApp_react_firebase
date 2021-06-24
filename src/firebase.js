import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
	.initializeApp({
		apiKey: process.env.REACT_APP_FIREBASE_KEY,
		authDomain: "unichat-d9d09.firebaseapp.com",
		projectId: "unichat-d9d09",
		storageBucket: "unichat-d9d09.appspot.com",
		messagingSenderId: "209026198152",
		appId: process.env.REACT_APP_FIREBASE_ID,
	})
	.auth();
