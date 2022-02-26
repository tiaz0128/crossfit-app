import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from './firebase';

export async function getUserData(uid: string) {
  const collectionRef = collection(db, 'member');
  const q = query(collectionRef, where('uid', '==', uid));

  const snapshot = await getDocs(q);
  const member = snapshot.docs.map((memberDoc: any) => ({ ...memberDoc.data() }))[0];
  return member;
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
