import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwy8R348JpGSl6VDBljCowdiRLlRgL-xA",
  authDomain: "fir-crud-1fd9d.firebaseapp.com",
  projectId: "fir-crud-1fd9d",
  storageBucket: "fir-crud-1fd9d.appspot.com",
  messagingSenderId: "669703698558",
  appId: "1:669703698558:web:3763dddc5f436528b3402f",
  measurementId: "G-LTN1SRDJ4J",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
