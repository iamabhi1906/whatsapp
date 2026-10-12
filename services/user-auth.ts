import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { User } from "@/features/users/users.types";
import { USERS_COLLECTION } from "./user";
import { mapUserSnapshot } from "@/features/users/user.helper";

const googleProvider = new GoogleAuthProvider();

const getUser = async (uid: string): Promise<User | null> => {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, uid));
  return snapshot.exists() ? mapUserSnapshot(snapshot) : null;
};

const createUser = async ({
  uid,
  email,
  displayName,
  avatar = "",
}: {
  uid: string;
  email: string;
  displayName: string;
  avatar?: string;
}): Promise<User> => {
  const userRef = doc(db, USERS_COLLECTION, uid);
  await setDoc(userRef, {
    email,
    displayName,
    avatar,
    userName: email.split("@")[0],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const user = await getUser(uid);
  if (!user) throw new Error("Unable to create your profile");
  return user;
};

export const userAuthService = {
  async signInWithGoogle(): Promise<User> {
    const credential = await signInWithPopup(auth, googleProvider);
    const firebaseUser = credential.user;
    const existingUser = await getUser(firebaseUser.uid);
    if (existingUser) return existingUser;

    return createUser({
      uid: firebaseUser.uid,
      email: firebaseUser.email ?? "",
      displayName: firebaseUser.displayName ?? "",
      avatar: firebaseUser.photoURL ?? "",
    });
  },

  async signUpWithEmailPassword(
    email: string,
    password: string,
    displayName: string,
  ): Promise<User> {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(credential.user, { displayName });
    return createUser({
      uid: credential.user.uid,
      email,
      displayName,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
    });
  },

  async signInWithEmailPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const existingUser = await getUser(credential.user.uid);
    if (existingUser) return existingUser;

    return createUser({
      uid: credential.user.uid,
      email: credential.user.email ?? email,
      displayName: credential.user.displayName ?? email.split("@")[0],
      avatar: credential.user.photoURL ?? "",
    });
  },
};
