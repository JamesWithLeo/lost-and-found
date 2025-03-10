import SignupHeader from "./SignUpheader";
import SigninHeader from "./Signinheader";
import DefaultHeader from "../client/DefaultHeader";
import { getServerSession } from "next-auth";

export default async function MainHeader({ pathname }: { pathname: string }) {
  const session = await getServerSession();
  if (pathname.startsWith("/signup")) {
    return <SignupHeader />;
  } else if (pathname.startsWith("/signin")) {
    return <SigninHeader />;
  } else {
    return <DefaultHeader isAuth={!!session} />;
  }
}
