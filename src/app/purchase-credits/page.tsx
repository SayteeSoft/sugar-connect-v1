
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet } from "lucide-react";
import { PayPalButtonsComponent } from "@/components/paypal-provider";
import { cn } from "@/lib/utils";

const creditPackages = [
    { credits: 100, price: 49.99, bonus: "Most Popular", id: "credits_100" },
    { credits: 250, price: 99.99, bonus: "+25 Bonus", id: "credits_250" },
    { credits: 500, price: 179.99, bonus: "+75 Bonus", id: "credits_500" },
    { credits: 1000, price: 299.99, bonus: "+200 Bonus", id: "credits_1000" },
];

const paymentMethods = [
    { id: "paypal", name: "PayPal", icon: <Wallet /> },
    { id: "credit-card", name: "Credit Card", icon: <CreditCard />  },
    { id: "debit-card", name: "Debit Card", icon: <CreditCard />  },
]

export default function PurchaseCreditsPage() {
    const [selectedPackage, setSelectedPackage] = React.useState(creditPackages[0]);
    const [selectedMethod, setSelectedMethod] = React.useState(paymentMethods[0].id);
    const [step, setStep] = React.useState<'select' | 'pay'>('select');
    const [message, setMessage] = React.useState('');

    const handleContinue = () => {
        setStep('pay');
    };

    if (step === 'pay') {
        return (
            <div className="container mx-auto px-4 md:px-6 py-8">
                 <h1 className="text-3xl font-bold font-headline mb-6 text-center">Complete Your Purchase</h1>
                 <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Payment for {selectedPackage.credits} Credits</CardTitle>
                        <CardDescription>
                            You are paying ${selectedPackage.price.toFixed(2)} for {selectedPackage.credits} credits.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {selectedMethod === 'paypal' ? (
                            <PayPalButtonsComponent
                                cart={{
                                    id: selectedPackage.id,
                                    quantity: "1",
                                    amount: selectedPackage.price.toFixed(2)
                                }}
                                onResult={(message) => setMessage(message)}
                            />
                        ) : (
                            <div className="text-center p-8 text-muted-foreground">
                                Credit/Debit card payments are coming soon. Please select PayPal to complete your purchase.
                            </div>
                        )}
                         {message && <p id="result-message" className="text-center mt-4 text-sm text-muted-foreground">{message}</p>}
                    </CardContent>
                    <CardContent>
                         <Button variant="outline" onClick={() => setStep('select')} className="w-full">
                            Back
                        </Button>
                    </CardContent>
                 </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <h1 className="text-3xl font-bold font-headline mb-6 text-center">Purchase Credits</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>1. Select a Package</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <RadioGroup 
                            value={selectedPackage.id}
                            onValueChange={(id) => {
                                const pkg = creditPackages.find(p => p.id === id);
                                if (pkg) setSelectedPackage(pkg);
                            }}
                         >
                            <div className="space-y-4">
                            {creditPackages.map((pkg) => (
                                <React.Fragment key={pkg.id}>
                                    <RadioGroupItem value={pkg.id} id={pkg.id} className="peer sr-only" />
                                    <Label htmlFor={pkg.id} className="flex justify-between items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                        <div>
                                            <p className="font-bold">{pkg.credits} Credits</p>
                                            {pkg.bonus && <p className="text-sm text-primary">{pkg.bonus}</p>}
                                        </div>
                                        <p className="font-semibold">${pkg.price}</p>
                                    </Label>
                                </React.Fragment>
                            ))}
                            </div>
                         </RadioGroup>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>2. Payment Method</CardTitle>
                        <CardDescription>All transactions are secure and encrypted.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <RadioGroup 
                            defaultValue={paymentMethods[0].id}
                            onValueChange={setSelectedMethod}
                         >
                            <div className="space-y-4">
                            {paymentMethods.map((method) => (
                                <React.Fragment key={method.id}>
                                    <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                                    <Label htmlFor={method.id} className="flex justify-between items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            {method.icon}
                                            <p className="font-semibold">{method.name}</p>
                                        </div>
                                    </Label>
                                </React.Fragment>
                            ))}
                            </div>
                         </RadioGroup>
                         <Button onClick={handleContinue} className="w-full mt-6" size="lg">Continue</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
