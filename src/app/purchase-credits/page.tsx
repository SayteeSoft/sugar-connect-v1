
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

type CreditPackage = typeof creditPackages[0];

export default function PurchaseCreditsPage() {
    const [selectedPackage, setSelectedPackage] = React.useState<CreditPackage | null>(null);
    const [selectedMethod, setSelectedMethod] = React.useState<string | null>(null);
    const [step, setStep] = React.useState<'select' | 'pay'>('select');
    const [message, setMessage] = React.useState('');

    const handleContinue = () => {
        if (selectedPackage && selectedMethod) {
            setStep('pay');
        }
    };

    if (step === 'pay' && selectedPackage) {
        return (
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
                 <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-headline text-primary font-bold">Complete Your Purchase</h1>
                    <p className="text-muted-foreground text-lg mt-2">Finalize your transaction below.</p>
                </div>
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
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-headline text-primary font-bold">Purchase Credits</h1>
                <p className="text-muted-foreground text-lg mt-2">Unlock conversations by choosing one of our credit packages.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>1. Select a Package</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <RadioGroup 
                            value={selectedPackage?.id}
                            onValueChange={(id) => {
                                const pkg = creditPackages.find(p => p.id === id);
                                if (pkg) setSelectedPackage(pkg);
                            }}
                         >
                            <div className="space-y-4">
                            {creditPackages.map((pkg) => (
                                <Label key={pkg.id} htmlFor={pkg.id} className={cn("flex items-center gap-4 rounded-md border-2 p-4 cursor-pointer transition-colors",
                                    selectedPackage?.id === pkg.id ? "border-primary" : "border-muted hover:bg-accent"
                                )}>
                                    <RadioGroupItem value={pkg.id} id={pkg.id} />
                                    <div className="flex-1 flex justify-between items-center">
                                        <div>
                                            <p className="font-bold">{pkg.credits} Credits</p>
                                            {pkg.bonus && <p className="text-sm text-primary">{pkg.bonus}</p>}
                                        </div>
                                        <p className="font-semibold">${pkg.price}</p>
                                    </div>
                                </Label>
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
                            value={selectedMethod ?? undefined}
                            onValueChange={setSelectedMethod}
                         >
                            <div className="space-y-4">
                            {paymentMethods.map((method) => (
                                 <Label key={method.id} htmlFor={method.id} className={cn("flex items-center gap-4 rounded-md border-2 p-4 cursor-pointer transition-colors",
                                    selectedMethod === method.id ? "border-primary" : "border-muted hover:bg-accent"
                                )}>
                                    <RadioGroupItem value={method.id} id={method.id} />
                                    <div className="flex-1 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            {method.icon}
                                            <p className="font-semibold">{method.name}</p>
                                        </div>
                                    </div>
                                </Label>
                            ))}
                            </div>
                         </RadioGroup>
                         <Button 
                            onClick={handleContinue} 
                            className="w-full mt-6" 
                            size="lg"
                            disabled={!selectedPackage || !selectedMethod}
                        >
                            Continue
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
