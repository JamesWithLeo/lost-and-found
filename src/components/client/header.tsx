import NavigationButton from "../server/NavigationButton";

export default async function Header() {
  return (
    <header
      className={`sticky top-0 flex h-[5rem] w-full items-center justify-between bg-white px-8 shadow`}
    >
      <h1>Lf logo</h1>
      <span className="flex gap-8">
        <NavigationButton label="Home" target="/" />
        <NavigationButton label="About us" target="/about" />
        <NavigationButton label="Contact us" target="contact" />
      </span>
    </header>
  );
}
