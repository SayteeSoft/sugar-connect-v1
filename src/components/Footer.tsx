import Link from "next/link";
import { Heart } from "lucide-react";

const footerSections = [
  {
    title: "Site",
    links: [
      { href: "/", label: "Home" },
      { href: "#", label: "About Us" },
      { href: "#", label: "FAQs" },
      { href: "#", label: "Glossary" },
      { href: "#", label: "Contact" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "#", label: "Cookie Policy" },
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Use" },
    ],
  },
  {
    title: "Other",
    links: [{ href: "#", label: "Sitemap" }],
  },
];

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-7 w-7 text-primary" />
              <span className="text-xl font-headline font-bold text-primary">
                Sugar Connect
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Find your perfect connection.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-muted-foreground text-sm">
          <p>
            &copy; {new Date().getFullYear()} Sugar Connect. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
