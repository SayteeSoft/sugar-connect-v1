import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-headline">Contact Us</CardTitle>
                <CardDescription>Get in touch with our support team.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Content for the Contact page will go here.</p>
            </CardContent>
        </Card>
    </div>
  );
}
