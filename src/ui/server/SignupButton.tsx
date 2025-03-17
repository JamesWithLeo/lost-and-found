import Link from "next/link";

export default function SignupButton() {
  return (
    <Link
      href="/signup"
      className={`bg-primary flex flex-col items-center rounded border border-gray-200 px-2 py-1 text-sm text-white`}
    >
      Sign up
    </Link>
  );
}
