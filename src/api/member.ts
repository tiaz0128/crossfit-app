import { db } from './firebase';
import { addDoc, collection } from 'firebase/firestore';

export async function postUser(payload: any) {
  const collectionRef = collection(db, 'member');

  try {
    await addDoc(collectionRef, payload);
  } catch {
    alert('Error');
  }
}
