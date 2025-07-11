
"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Lock } from 'lucide-react';

type PrivacyPolicyProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PrivacyPolicy({ open, onOpenChange }: PrivacyPolicyProps) {
  
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Lock className="h-6 w-6" />
            Privacy Policy
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-4 text-sm text-muted-foreground space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">1. Introduction</h3>
              <p>
                This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our services. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">2. Information We Collect</h3>
              <p>
                We may collect the following types of information: Personal Identification Information (Name, email address, phone number, etc.), Profile Information (age, photos, interests, bio), and Usage Data (how you use our service, IP address, browser type).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">3. How We Use Your Information</h3>
              <p>
                Your information is used to provide and improve our services, personalize your experience, communicate with you, ensure the security of our platform, and comply with legal obligations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">4. Information Sharing</h3>
              <p>
                We do not sell your personal information. We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law.
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
