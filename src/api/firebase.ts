import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';

import { getFirestore, collection, query, getDocs, where } from 'firebase/firestore';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export function logoIn(email: string, password: string) {
  return setPersistence(auth, browserSessionPersistence).then(() =>
    signInWithEmailAndPassword(auth, email, password)
  );
}

export function logoOut() {
  return signOut(auth);
}

export async function getUserData(uid: string) {
  const collectionRef = collection(db, 'member');
  const q = query(collectionRef, where('uid', '==', uid));

  const snapshot = await getDocs(q);
  const member = snapshot.docs.map((doc: any) => ({ ...doc.data() }))[0];
  return member;
}

interface CurrentUser {
  uid: string;
  [key: string]: string | Object;
}

export function useAuth(): [User | null, React.Dispatch<React.SetStateAction<User | null>>] {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  let navigate = useNavigate();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user: User | null) => {
      // navigate(user ? '/' : '/login');
      setUserInfo(user);
    });
    return unSub;
  }, []);

  return [userInfo, setUserInfo];
}
