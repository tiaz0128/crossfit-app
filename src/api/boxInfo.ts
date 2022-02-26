import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './firebase';

export async function getBoxInfo() {
  const collectionRef = collection(db, 'boxInfo');
  const q = query(collectionRef);

  const snapshot = await getDocs(q);
  const boxInfo = snapshot.docs.map((boxDoc: any) => ({ ...boxDoc.data() }))[0];
  return boxInfo;
}

export async function putBoxInfo(uid: string, payload: any) {
  // const collectionRef = collection(db, 'member');
  // const q = query(collectionRef, where('uid', '==', uid));
  // const snapshot = await getDocs(q);
  // const targetDoc = snapshot.docs[0].id;
  // try {
  //   await setDoc(doc(db, 'member', targetDoc), payload, { merge: true });
  // } catch {
  //   alert('Error');
  // }
}
