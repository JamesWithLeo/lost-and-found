"use client";

import SignupHeader from "./SignUpheader";
import SigninHeader from "./Signinheader";
import DefaultHeader from "../client/DefaultHeader";
import LocateHeader from "./LocateHeader";
import ReportHeader from "./ReportHeader";
import { usePathname } from "next/navigation";

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
  } else if (pathname.startsWith("/my-item/qs")) {
    return <DefaultHeader isAuth={isAuth} photoUrl={photoUrl} />;
  } else if (pathname.startsWith("/my-item/ps")) {
    return <DefaultHeader isAuth={isAuth} photoUrl={photoUrl} />;
  } else if (pathname.startsWith("/my-item")) {
    return <LocateHeader isAuth={isAuth} />;
  } else if (pathname.startsWith("/found-item/ps")) {
    return <DefaultHeader isAuth={isAuth} photoUrl={photoUrl} />;
  } else if (pathname.startsWith("/found-item")) {
    return <ReportHeader isAuth={isAuth} />;
  } else {
    return <DefaultHeader isAuth={isAuth} photoUrl={photoUrl} />;
  }
}
