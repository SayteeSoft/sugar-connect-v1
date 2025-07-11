
"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Cookie } from 'lucide-react';
import type * as DialogPrimitive from "@radix-ui/react-dialog";

type CookiePolicyProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CookiePolicy({ open, onOpenChange }: CookiePolicyProps) {
  
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Cookie className="h-6 w-6" />
            Cookie Policy
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-4 text-sm text-muted-foreground space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Introduction</h3>
              <p>
                This Cookie Policy explains how Sugar Connect ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them to provide a secure and personalized experience, and outlines your rights to control our use of them.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">What are cookies?</h3>
              <p>
                A cookie is a small data file that is placed on your device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information. Cookies set by the website owner (in this case, Sugar Connect) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies".
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Why do we use cookies?</h3>
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our platform. For example, we use cookies to remember your login status and preferences.
              </p>
            </div>
            <div>
                <h3 className="font-semibold text-foreground mb-1">Types of Cookies We Use</h3>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        <strong>Strictly Necessary Cookies:</strong> These are essential for you to browse the website and use its features, such as accessing secure areas of the site.
                    </li>
                    <li>
                        <strong>Performance and Analytics Cookies:</strong> These cookies collect information about how you use our website, like which pages you visited and which links you clicked on. None of this information can be used to identify you. It is all aggregated and, therefore, anonymized. Their sole purpose is to improve website functions.
                    </li>
                    <li>
                        <strong>Functionality Cookies:</strong> These cookies allow our website to remember choices you have made in the past, like what language you prefer or what your user name and password are so you can automatically log in.
                    </li>
                    <li>
                        <strong>Marketing Cookies:</strong> These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad. These cookies can share that information with other organizations or advertisers.
                    </li>
                </ul>
            </div>
             <div>
              <h3 className="font-semibold text-foreground mb-1">How can you control cookies?</h3>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your browser. Most browsers allow you to refuse to accept cookies and to delete cookies. The methods for doing so vary from browser to browser, and from version to version. Please note, however, that if you disable cookies, you may not be able to use all the features of our website.
              </p>
            </div>
             <div>
              <h3 className="font-semibold text-foreground mb-1">Changes to This Cookie Policy</h3>
              <p>
               We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
            </div>
             <div>
              <h3 className="font-semibold text-foreground mb-1">Contact Us</h3>
              <p>
                If you have any questions about our use of cookies or other technologies, please email us using the contact form on our website.
              </p>
            </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClose}>Accept and Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
