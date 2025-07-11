
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-headline">Terms of Use</CardTitle>
                <CardDescription>The rules for using our platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Content for the Terms of Use page will go here.</p>
            </CardContent>
        </Card>
    </div>
  );
}
