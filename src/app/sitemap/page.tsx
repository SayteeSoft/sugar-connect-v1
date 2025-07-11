import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SitemapPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-headline">Sitemap</CardTitle>
                <CardDescription>Find your way around our site.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Content for the Sitemap page will go here.</p>
            </CardContent>
        </Card>
    </div>
  );
}
