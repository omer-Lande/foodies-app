"use client";
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";

export default function ShareButton({ className }) {
  const { user, login } = useAuth();

  return user ? (
    <Link href="/meals/share" className={className}>
      Share Your Favorite Recipe
    </Link>
  ) : (
    <button onClick={login} className={className}>
      Sign in to share your favorite recipe
    </button>
  );
}
