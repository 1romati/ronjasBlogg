import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAMPYOIdG41ICuGi8s-f7XIl9Cxwle6Bng",
  authDomain: "mitt-blogg-projekt.firebaseapp.com",
  projectId: "mitt-blogg-projekt",
  storageBucket: "mitt-blogg-projekt.appspot.com",
  messagingSenderId: "536221827096",
  appId: "1:536221827096:web:25899982e31c68b4fc436d",
  measurementId: "G-670RZBMX98",
};

const app = initializeApp(firebaseConfig);

export { app };
