import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAp0IB-zmCINEGEYt7Hjru2ptOa_R9Rjrg",
  authDomain: "the-other-side-e1c97.firebaseapp.com",
  projectId: "the-other-side-e1c97",
  storageBucket: "the-other-side-e1c97.appspot.com",
  messagingSenderId: "1018488103082",
  appId: "1:1018488103082:web:5d289c572205777652b0d3",
  measurementId: "G-GN4J8VJEBB"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();

export default firebase;
