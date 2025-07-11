
"use client";

import Link from "next/link";
import { Logo } from "./icons";
import { Button } from "./ui/button";
import type { useLayout } from "@/hooks/use-layout";

type FooterProps = {
    setLayoutState?: ReturnType<typeof useLayout>['setLayoutState'];
}

export function Footer({ setLayoutState }: FooterProps) {

  const handleCookiePolicyClick = () => {
    if (setLayoutState) {
        setLayoutState(prevState => ({ ...prevState, showCookiePolicy: true }));
    }
  }

  const handlePrivacyPolicyClick = () => {
    if (setLayoutState) {
        setLayoutState(prevState => ({ ...prevState, showPrivacyPolicy: true }));
    }
  }

  return (
    <footer className="bg-card text-muted-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col items-center text-center">
            <Logo className="text-primary text-xl" />
            <p className="mt-2 text-sm">
              An exclusive platform for ambitious and attractive individuals.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mt-12">
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
              <li>
                <Button variant="link" className="p-0 text-muted-foreground hover:text-primary hover:no-underline" onClick={handleCookiePolicyClick}>
                    Cookie Policy
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 text-muted-foreground hover:text-primary hover:no-underline" onClick={handlePrivacyPolicyClick}>
                    Privacy Policy
                </Button>
              </li>
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
        <div className="mt-12 border-t pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Sugar Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
