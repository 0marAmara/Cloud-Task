// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC8xu3Y9WxQrQ2klzPPyulwQZEKBWG8-HE",
  authDomain: "cloud-computing-project-d0bd2.firebaseapp.com",
  databaseURL: "https://cloud-computing-project-d0bd2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cloud-computing-project-d0bd2",
  storageBucket: "cloud-computing-project-d0bd2.firebasestorage.app",
  messagingSenderId: "220809576390",
  appId: "1:220809576390:web:b7484742e7991c645bbcc7",
  measurementId: "G-03GLNHBQ1V"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

export { app, analytics, database}