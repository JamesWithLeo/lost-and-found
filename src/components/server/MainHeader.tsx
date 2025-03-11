"use client";

import SignupHeader from "./SignUpheader";
import SigninHeader from "./Signinheader";
import DefaultHeader from "../client/DefaultHeader";
import LocateHeader from "./LocateHeader";
import ReportHeader from "./ReportHeader";
import { usePathname } from "next/navigation";

export default function MainHeader({ isAuth }: { isAuth: boolean }) {
  const pathname = usePathname();
  if (pathname.startsWith("/signup")) {
    return <SignupHeader isAuth={isAuth} />;
  } else if (pathname.startsWith("/signin")) {
    return <SigninHeader isAuth={isAuth} />;
  } else if (pathname.startsWith("/my-item")) {
    return <LocateHeader isAuth={isAuth} />;
  } else if (pathname.startsWith("/report")) {
    return <ReportHeader isAuth={isAuth} />;
  } else {
    return <DefaultHeader isAuth={isAuth} />;
  }
}
