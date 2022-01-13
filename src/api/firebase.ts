import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  doc,
  addDoc,
  setDoc,
} from 'firebase/firestore';
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
setPersistence(auth, browserSessionPersistence);
const db = getFirestore();

export function logoIn(email: string, password: string) {
  //   return setPersistence(auth, browserSessionPersistence).then(() =>
  //     signInWithEmailAndPassword(auth, email, password)
  //   );
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoOut() {
  return signOut(auth);
}

export async function getUserData(uid: string) {
  const collectionRef = collection(db, 'member');
  const q = query(collectionRef, where('uid', '==', uid));

  const snapshot = await getDocs(q);
  const member = snapshot.docs.map((memberDoc: any) => ({ ...memberDoc.data() }))[0];
  return member;
}

export async function postUser(payload: any) {
  const collectionRef = collection(db, 'member');

  try {
    await addDoc(collectionRef, payload);
  } catch {
    alert('Error');
  }
}

export async function putUser(uid: string, payload: any) {
  const collectionRef = collection(db, 'member');
  const q = query(collectionRef, where('uid', '==', uid));
  const snapshot = await getDocs(q);
  const targetDoc = snapshot.docs[0].id;

  try {
    await setDoc(doc(db, 'member', targetDoc), payload, { merge: true });
  } catch {
    alert('Error');
  }
}

export function useAuth(): [
  User | null,
  React.Dispatch<React.SetStateAction<User | null>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user: User | null) => {
      setUserInfo(user);
      setLoading(false);
    });
    return unSub;
  }, []);

  // useEffect(() => {
  //   let t: null | NodeJS.Timeout = null;
  //   if (loading) t = setTimeout(() => setLoading(false), 800);

  //   return () => clearTimeout(t as NodeJS.Timeout);
  // }, [loading]);

  return [userInfo, setUserInfo, loading, setLoading];
}
