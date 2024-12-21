import Link from "next/link";

const links = [
  { href: "/url-shortener", label: "URL Shortener" },
  { href: "/code-image", label: "Code Image" },
  { href: "/icon-maker", label: "Icon Maker" },
  { href: "/pastebin", label: "Pastebin" },
];

export function FooterLinks() {
  return (
    <nav className="flex flex-wrap gap-4 sm:gap-6">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}