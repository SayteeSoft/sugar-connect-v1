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
                    <h4 className="font-semibold text-card-foreground">1. Introduction</h4>
                    <p>This Cookie Policy explains how Sugar Connect ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
                    
                    <h4 className="font-semibold text-card-foreground">2. What are cookies?</h4>
                    <p>A cookie is a small data file that is placed on your device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information. Cookies set by the website owner (in this case, Sugar Connect) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies".</p>
                    
                    <h4 className="font-semibold text-card-foreground">3. Why do we use cookies?</h4>
                    <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our platform. For example, we use cookies to remember your login status and preferences.</p>

                    <h4 className="font-semibold text-card-foreground">4. Types of Cookies We Use</h4>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Strictly Necessary Cookies:</strong> These are essential for you to browse the website and use its features, such as accessing secure areas of the site.</li>
                        <li><strong>Performance and Analytics Cookies:</strong> These cookies collect information about how you use our website, like which pages you visited and which links you clicked on. None of this information can be used to identify you. It is all aggregated and, therefore, anonymized. Their sole purpose is to improve website functions.</li>
                        <li><strong>Functionality Cookies:</strong> These cookies allow our website to remember choices you have made in the past, like what language you prefer or what your user name and password are so you can automatically log in.</li>
                        <li><strong>Marketing Cookies:</strong> These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad. These cookies can share that information with other organizations or advertisers.</li>
                    </ul>

                    <h4 className="font-semibold text-card-foreground">5. How can you control cookies?</h4>
                    <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your browser. Most browsers allow you to refuse to accept cookies and to delete cookies. The methods for doing so vary from browser to browser, and from version to version. Please note, however, that if you disable cookies, you may not be able to use all the features of our website.</p>

                    <h4 className="font-semibold text-card-foreground">6. Changes to This Cookie Policy</h4>
                    <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>

                    <h4 className="font-semibold text-card-foreground">7. Contact Us</h4>
                    <p>If you have any questions about our use of cookies or other technologies, please email us using the contact form on our website.</p>
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
