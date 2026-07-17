import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { User } from "@/features/users/users.types";
import { USERS_COLLECTION } from "./user";
import { mapUserSnapshot } from "@/features/users/user.helper";

const googleProvider = new GoogleAuthProvider();

export const userAuthService = {
  async signInWithGoogle(): Promise<User> {
    const credential = await signInWithPopup(auth, googleProvider);
    const firebaseUser = credential.user;
    const userRef = doc(db, USERS_COLLECTION, firebaseUser.uid);
    const snapshot = await getDoc(userRef);

    // existing user
    if (snapshot.exists()) {
      return mapUserSnapshot(snapshot);
    }
    // new
    const newUser = {
      email: firebaseUser.email ?? "",
      displayName: firebaseUser.displayName ?? "",
      avatar: firebaseUser.photoURL ?? "",
      username: firebaseUser.email?.split("@")[0] ?? "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(userRef, newUser);
    const newSnapshot = await getDoc(userRef);
    return mapUserSnapshot(newSnapshot);
  },
};
