import Link from "next/link";
export default function SigninButton() {
  return (
    <Link
      href={"signin"}
      className={`flex flex-col items-center rounded border border-gray-200 px-2 py-1 text-sm`}
    >
      Sign in
    </Link>
  );
}
