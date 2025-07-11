import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const creditPackages = [
    { credits: 100, price: 49.99, bonus: "Most Popular" },
    { credits: 250, price: 99.99, bonus: "+25 Bonus" },
    { credits: 500, price: 179.99, bonus: "+75 Bonus" },
    { credits: 1000, price: 299.99, bonus: "+200 Bonus" },
];

const paymentMethods = [
    { id: "credit-card", name: "Credit Card" },
    { id: "debit-card", name: "Debit Card" },
    { id: "paypal", name: "PayPal" },
]

export default function PurchaseCreditsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold font-headline mb-6 text-center">Purchase Credits</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Select a Package</CardTitle>
                </CardHeader>
                <CardContent>
                     <RadioGroup defaultValue={creditPackages[0].credits.toString()}>
                        <div className="space-y-4">
                        {creditPackages.map((pkg) => (
                            <React.Fragment key={pkg.credits}>
                                <RadioGroupItem value={pkg.credits.toString()} id={pkg.credits.toString()} className="peer sr-only" />
                                <Label htmlFor={pkg.credits.toString()} className="flex justify-between items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
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
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>All transactions are secure and encrypted.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <RadioGroup defaultValue={paymentMethods[0].id}>
                        <div className="space-y-4">
                         {paymentMethods.map((method) => (
                             <React.Fragment key={method.id}>
                                <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                                 <Label htmlFor={method.id} className="flex justify-between items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                    <p className="font-semibold">{method.name}</p>
                                </Label>
                             </React.Fragment>
                         ))}
                         </div>
                     </RadioGroup>
                     <Button className="w-full mt-6" size="lg">Complete Purchase</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
