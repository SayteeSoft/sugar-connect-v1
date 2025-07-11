import Link from "next/link";
import { Logo } from "./icons";

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <Logo />
            <p className="mt-2 text-sm max-w-xs">
              An exclusive platform for ambitious and attractive individuals.
            </p>
          </div>

          <div>
            <h4 className="font-bold font-headline text-foreground">Site</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQs</Link></li>
              <li><Link href="/glossary" className="hover:text-primary">Glossary</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-headline text-foreground">Policies</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/policies/cookies" className="hover:text-primary">Cookie Policy</Link></li>
              <li><Link href="/policies/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/policies/terms" className="hover:text-primary">Terms of Use</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-headline text-foreground">Help</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="/sitemap" className="hover:text-primary">Sitemap</Link></li>
              <li><Link href="/admin" className="hover:text-primary">Admin</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SD Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
