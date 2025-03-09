import NavigationButton from "@/components/client/NavigationButton";
import Link from "next/link";
import Logo from "../Logo";
export default async function Header({}) {
  return (
    <header
      className={`sticky top-0 z-40 flex h-[5rem] w-full items-center justify-between bg-white px-8 shadow`}
    >
      <Link href={"/"}>
        <Logo />
      </Link>
      <span className="flex gap-8">
        <NavigationButton label="Discovery" target="/discovery" hideOn={[]} />
        <NavigationButton label="About us" target="/about" hideOn={[]} />
        <NavigationButton
          label="Contact us"
          target="/contact"
          hideOn={["/item"]}
        />
        <NavigationButton label="Sign in" target="/signin" hideOn={["/item"]} />
        <NavigationButton label="Sign up" target="/signup" hideOn={["/item"]} />
      </span>
    </header>
  );
}
