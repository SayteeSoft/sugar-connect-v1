import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, ShieldCheck } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purchase Credits | Sugar Connect',
  description: 'Top up your account with credits to continue connecting with members.',
};


export default function PaymentPage() {
  return (
    <div className="container mx-auto py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">
              Purchase Credits
            </CardTitle>
            <CardDescription>
              You've run out of credits. Top up your account to continue
              connecting with members.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-center font-semibold">
                Choose a Payment Method
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Button size="lg" variant="outline">
                  <CreditCard className="mr-2" /> Debit Card
                </Button>
                <Button size="lg" variant="outline">
                  <CreditCard className="mr-2" /> Credit Card
                </Button>
                <Button size="lg" variant="outline">
                  PayPal
                </Button>
                <Button size="lg" variant="outline">
                  Stripe
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center border-t pt-4 text-sm text-muted-foreground">
              <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
              <span>
                Secure payments powered by Stripe. All transactions are
                encrypted.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
