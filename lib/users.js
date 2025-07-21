import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export async function saveUser(user) {
  if (!user) return;
  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    },
    { merge: true }
  );
}
