import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const password = "electron1234@";
const email = "electron@toothy.ee";

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    projectId: "toothy-admin",
    apiKey: "AIzaSyACKcDs-KTSOdNyym9-Bj8Dl44vXuy-kTk",
  })
  .firestore();

firebase.auth().signInWithEmailAndPassword(email, password);

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
