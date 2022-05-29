import app from 'firebase/app';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0WgMLnbRthF-XC8uCQjhxOH9W21uYRFM",
  authDomain: "practicafirebase-cc00f.firebaseapp.com",
  projectId: "practicafirebase-cc00f",
  storageBucket: "practicafirebase-cc00f.appspot.com",
  messagingSenderId: "163763740080",
  appId: "1:163763740080:web:722284f6285450fb270a75"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();