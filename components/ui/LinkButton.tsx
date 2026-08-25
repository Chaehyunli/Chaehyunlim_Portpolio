import Link from "next/link";

export function LinkButton({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      className="btn"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}
