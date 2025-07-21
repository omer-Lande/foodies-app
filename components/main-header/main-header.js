"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/useAuth";

import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";

export default function MainHeader() {
  const { user, login, logout } = useAuth();
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
        <div style={{ position: "absolute", top: 20, right: 20 }}>
          {user ? (
            <>
              <span style={{ marginRight: 8 }}>
                Welcome, {user.displayName}!
              </span>
              <button onClick={logout} className={classes.link}>
                Logout
              </button>
            </>
          ) : (
            <button onClick={login} className={classes.link}>
              Login with Google
            </button>
          )}
        </div>
      </header>
    </>
  );
}
