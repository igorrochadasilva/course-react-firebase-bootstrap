import firebase from 'firebase'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAt2fS_zMMbEN_RwZUDBlcv7-d63HjMd28",
    authDomain: "eventos-f1377.firebaseapp.com",
    databaseURL: "https://eventos-f1377.firebaseio.com",
    projectId: "eventos-f1377",
    storageBucket: "eventos-f1377.appspot.com",
    messagingSenderId: "99377152416",
    appId: "1:99377152416:web:8afd09180584f0755fe4c5"
  };

  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);