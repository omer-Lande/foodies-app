"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { saveUser } from "@/lib/users";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const result = await signInWithPopup(auth, provider);
    await saveUser(result.user); // Save user to Firestore
  };
  const logout = () => signOut(auth);

  return { user, login, logout };
}
