// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhrMo8FjJA2bNBVPz_-Sks2ucLJ3lkWfU",
  authDomain: "chatapplication-d8e93.firebaseapp.com",
  projectId: "chatapplication-d8e93",
  storageBucket: "chatapplication-d8e93.appspot.com",
  messagingSenderId: "872119502930",
  appId: "1:872119502930:web:aa4694625d82d6ac1c378b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();
const db = getFirestore();

export {auth, storage, db};
