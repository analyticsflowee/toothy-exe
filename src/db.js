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

export const auth = firebase.auth().signInWithEmailAndPassword(email, password);

auth.then(() => {
  setTimeout(() => {
    firebase.auth().currentUser.getIdToken(true);
  }, 30000);
});

const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
