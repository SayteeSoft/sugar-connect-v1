
"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Shield } from 'lucide-react';

type TermsOfUseProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TermsOfUse({ open, onOpenChange }: TermsOfUseProps) {
  
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Shield className="h-6 w-6" />
            Terms of Use
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-4 text-sm text-muted-foreground space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">1. Acceptance of Terms</h3>
              <p>
                By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">2. User Conduct</h3>
              <p>
                You agree not to use the service to post or transmit any material that is abusive, harassing, defamatory, vulgar, obscene, or is otherwise objectionable. You are responsible for all activities that occur under your account.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">3. Intellectual Property</h3>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of Sugar Connect and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Sugar Connect.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">4. Termination</h3>
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not to a breach of the Terms.
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
