import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GlossaryPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-headline">Glossary</CardTitle>
                <CardDescription>Understand the terms used on our platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Content for the Glossary page will go here.</p>
            </CardContent>
        </Card>
    </div>
  );
}
