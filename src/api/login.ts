import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

export function logoIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoOut() {
  return signOut(auth);
}
