// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage"
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-4RLEfCWnJ2kj0mv0fp83FJ3Idsq5Cpk",
  authDomain: "lumigram-62720.firebaseapp.com",
  projectId: "lumigram-62720",
  storageBucket: "lumigram-62720.appspot.com", // Fix typo here
  messagingSenderId: "569206890544",
  appId: "1:569206890544:web:ac23f298a49e09953f4df5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

//initalize Storage
export const storage = getStorage(app)