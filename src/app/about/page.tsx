import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-headline">About Us</CardTitle>
                <CardDescription>Learn more about Sugar Connect.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Content for the About Us page will go here.</p>
            </CardContent>
        </Card>
    </div>
  );
}
