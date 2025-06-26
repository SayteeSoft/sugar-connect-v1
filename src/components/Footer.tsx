import Link from "next/link";

const footerLinks = [
  { href: "#", label: "About" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Contact" },
  { href: "#", label: "Blog" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t py-6">
      <div className="container mx-auto flex flex-col items-center gap-6">
        <nav
          className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          aria-label="Footer"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Sugar Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
