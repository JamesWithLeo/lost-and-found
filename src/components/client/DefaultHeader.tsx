"use client";
import Link from "next/link";
import Logo from "../server/Logo";
import NavigationButton from "./NavigationButton";
import LogoutButton from "./logoutButton";
import SigninButton from "../server/SigninButton";
import SignupButton from "../server/SignupButton";

export default function DefaultHeader({ isAuth }: { isAuth: boolean }) {
  return (
    <header
      className={`sticky top-0 z-40 flex h-[5rem] w-full items-center justify-between bg-white px-8 shadow`}
    >
      <Link href={isAuth ? "/" : "/discovery"}>
        <Logo />
      </Link>

      <span className="flex items-center gap-8">
        <NavigationButton
          label={isAuth ? "Home" : "Discovery"}
          target={isAuth ? "/" : "/discovery"}
        />
        <NavigationButton label="About us" target="/about" />
        <NavigationButton label="Contact us" target="/contact" />
        <div className="h-6 border-l border-gray-300"></div>
        {isAuth ? (
          <LogoutButton />
        ) : (
          <div className="flex gap-4">
            <SigninButton />
            <SignupButton />
          </div>
        )}
      </span>
    </header>
  );
}
