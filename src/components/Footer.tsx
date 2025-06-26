import Link from "next/link";
import { Heart } from "lucide-react";
import { PolicyModal } from "./PolicyModal";

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "#", label: "About Us" },
  { href: "#", label: "FAQs" },
  { href: "#", label: "Glossary" },
  { href: "#", label: "Contact" },
];

const otherLinks = [{ href: "#", label: "Sitemap" }];

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
            <div>
              <h3 className="font-semibold text-foreground mb-4">Site</h3>
              <ul className="space-y-3">
                {siteLinks.map((link) => (
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
            <div>
              <h3 className="font-semibold text-foreground mb-4">Policies</h3>
              <ul className="space-y-3">
                 <li>
                  <PolicyModal triggerText="Cookie Policy" title="Cookie Policy">
                   <p>This is a placeholder for the Cookie Policy. In a real application, this would contain detailed information about the cookies used on the site, their purpose, and how users can manage them.</p>
                   <p>Cookies are small text files stored on your device that help us improve your experience. We use essential cookies for basic site functionality, performance cookies to understand how you interact with our site, and marketing cookies to personalize content and ads.</p>
                   <h4 className="font-semibold text-card-foreground">Managing Cookies</h4>
                   <p>You can control and/or delete cookies as you wish – for details, see aboutcookies.org. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.</p>
                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </PolicyModal>
                </li>
                 <li>
                  <PolicyModal triggerText="Privacy Policy" title="Privacy Policy">
                    <h4 className="font-semibold text-card-foreground">1. Introduction</h4>
                    <p>This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our services. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.</p>
                    <h4 className="font-semibold text-card-foreground">2. Information We Collect</h4>
                    <p>We may collect the following types of information: Personal Identification Information (Name, email address, phone number, etc.), Profile Information (age, photos, interests, bio), and Usage Data (how you use our service, IP address, browser type).</p>
                    <h4 className="font-semibold text-card-foreground">3. How We Use Your Information</h4>
                    <p>Your information is used to provide and improve our services, personalize your experience, communicate with you, ensure the security of our platform, and comply with legal obligations.</p>
                    <h4 className="font-semibold text-card-foreground">4. Information Sharing</h4>
                    <p>We do not sell your personal information. We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  </PolicyModal>
                </li>
                 <li>
                  <PolicyModal triggerText="Terms of Use" title="Terms of Use">
                    <h4 className="font-semibold text-card-foreground">1. Acceptance of Terms</h4>
                    <p>By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
                    <h4 className="font-semibold text-card-foreground">2. User Conduct</h4>
                    <p>You agree not to use the service to post or transmit any material that is abusive, harassing, defamatory, vulgar, obscene, or is otherwise objectionable. You are responsible for all activities that occur under your account.</p>
                    <h4 className="font-semibold text-card-foreground">3. Intellectual Property</h4>
                    <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Sugar Connect and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Sugar Connect.</p>
                    <h4 className="font-semibold text-card-foreground">4. Termination</h4>
                    <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                  </PolicyModal>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Other</h3>
              <ul className="space-y-3">
                {otherLinks.map((link) => (
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
