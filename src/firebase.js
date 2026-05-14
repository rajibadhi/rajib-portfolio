import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGvu-aK5a8VFvpjUtDypk8aKZL6raT4WY",
  authDomain: "rajib-portfolio-a9b47.firebaseapp.com",
  projectId: "rajib-portfolio-a9b47",
  storageBucket: "rajib-portfolio-a9b47.firebasestorage.app",
  messagingSenderId: "312576919207",
  appId: "1:312576919207:web:f144d4fd511bea00b8bd82"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
