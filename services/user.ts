import { mapUserSnapshot } from "@/features/users/user.helper";
import { User } from "@/features/users/users.types";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const USERS_COLLECTION = "users";

const userCollection = collection(db, USERS_COLLECTION);

const UserService = {
  async getAllUser(): Promise<User[]> {
    const snapshot = await getDocs(
      query(userCollection, orderBy("createdAt", "desc")),
    );
    return snapshot.docs.map(mapUserSnapshot);
  },
};

export default UserService;
