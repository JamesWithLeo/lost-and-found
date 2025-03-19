"use client";

import SignupHeader from "../SignUpheader";
import SigninHeader from "../Signinheader";
import DefaultHeader from "../client/DefaultHeader";
import LocateHeader from "./LocateHeader";
import ReportHeader from "./ReportHeader";
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
    return <LocateHeader isAuth={isAuth} />;
  } else if (pathname.startsWith("/my-item")) {
    return <DiscoveryHeader isAuth={isAuth} photoUrl={photoUrl} />;
  } else if (pathname.startsWith("/found-item/new")) {
    return <ReportHeader isAuth={isAuth} />;
  } else if (pathname.startsWith("/discovery")) {
    return <DiscoveryHeader isAuth={isAuth} photoUrl={photoUrl} />;
  } else if (
    pathname.startsWith("/contact") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/found-item")
  ) {
    return <DiscoveryHeader isAuth={isAuth} photoUrl={photoUrl} />;
  } else {
    return <DefaultHeader isAuth={isAuth} photoUrl={photoUrl} />;
  }
}
