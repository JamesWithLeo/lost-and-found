import { useSession } from "next-auth/react";

export default function Name() {
  const session = useSession();
  console.log(session.data);
  return (
    <h1>
      Welcome, {session.data?.user.firstName} {session.data?.user.lastName}
    </h1>
  );
}
