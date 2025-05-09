"use client";

import SignupHeader from "../SignUpheader";
import SigninHeader from "../Signinheader";
import DefaultHeader from "../DefaultHeader";
import LostHeader from "./LostHeader";
import FoundHeader from "./FoundHeader";
import DiscoveryHeader from "../DiscoveryHeader";
import { usePathname } from "next/navigation";
import ResultHeader from "../ResultHeader";

export default function MainHeader({
  isAuth,
  photoUrl,
}: {
  isAuth: boolean;
  photoUrl: string | undefined;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/signup")) {
    return <SignupHeader isAuth={isAuth} />;
  } else if (pathname.startsWith("/signin")) {
    return <SigninHeader isAuth={isAuth} />;
  } else if (pathname.startsWith("/result")) {
    return <ResultHeader isAuth={isAuth} photoUrl={photoUrl} />;
  } else if (pathname.startsWith("/my-item/new")) {
    return <LostHeader isAuth={isAuth} />;
  } else if (pathname === "/my-item") {
    return <DiscoveryHeader isAuth={isAuth} photoUrl={photoUrl} />;
  } else if (pathname.startsWith("/my-item")) {
    return null;
  } else if (pathname.startsWith("/found-item/new")) {
    return <FoundHeader isAuth={isAuth} />;
  } else if (pathname.startsWith("/discovery")) {
    return <DiscoveryHeader isAuth={isAuth} photoUrl={photoUrl} />;
  } else if (
    pathname.startsWith("/contact") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/found-item") ||
    pathname.startsWith("/browse")
  ) {
    return <DiscoveryHeader isAuth={isAuth} photoUrl={photoUrl} />;
  } else {
    return <DefaultHeader isAuth={isAuth} photoUrl={photoUrl} />;
  }
}
