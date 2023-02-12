import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBZj9gk6twao_VZmSlbRzZsV_UbSF5G9k4",
    authDomain: "snapchat-ab554.firebaseapp.com",
    projectId: "snapchat-ab554",
    storageBucket: "snapchat-ab554.appspot.com",
    messagingSenderId: "139929145924",
    appId: "1:139929145924:web:e1bcbab8e165a8b8456211"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const data = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const storage = firebaseApp.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {data, auth, storage, provider}