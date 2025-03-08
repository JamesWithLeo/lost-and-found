import Link from "next/link";

export default function NavigationButton({
  label,
  target,
}: {
  label: string;
  target: string;
}) {
  return <Link href={target}>{label}</Link>;
}
