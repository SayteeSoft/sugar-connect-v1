import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-headline">Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Content for the FAQs page will go here.</p>
            </CardContent>
        </Card>
    </div>
  );
}
