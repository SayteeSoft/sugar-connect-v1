
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookUser, FileText, HelpCircle, Home, LogIn, MessageSquare, Search, ShoppingCart, User, UserPlus, Users } from "lucide-react";
import Link from "next/link";

const mainPages = [
    { title: "Home", href: "/", description: "The main landing page of Sugar Connect.", icon: <Home /> },
    { title: "Search", href: "/search", description: "Find and filter profiles.", icon: <Search /> },
    { title: "Messages", href: "/messages", description: "Your private conversations.", icon: <MessageSquare /> },
    { title: "Matches", href: "/matches", description: "View your matches and favorites.", icon: <Users /> },
];

const userAccountPages = [
    { title: "My Profile", href: "/profile", description: "View and edit your profile.", icon: <User /> },
    { title: "Login", href: "/login", description: "Access your account.", icon: <LogIn /> },
    { title: "Sign Up", href: "/signup", description: "Create a new account for free.", icon: <UserPlus /> },
    { title: "Purchase Credits", href: "/purchase-credits", description: "Buy credits to connect with others.", icon: <ShoppingCart /> },
];

const legalInfoPages = [
    { title: "About Us", href: "/about", description: "Learn more about our mission.", icon: <BookUser /> },
    { title: "FAQs", href: "/faq", description: "Find answers to your questions.", icon: <HelpCircle /> },
    { title: "Glossary", href: "/glossary", description: "Understand common terms.", icon: <FileText /> },
];


const SitemapSection = ({ title, pages }: { title: string, pages: typeof mainPages }) => (
    <section>
        <h2 className="text-2xl font-bold font-headline text-primary mb-4">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pages.map((page) => (
                <Link key={page.title} href={page.href} className="group">
                    <Card className="hover:border-primary transition-colors h-full">
                        <CardContent className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="text-primary hidden sm:block">
                                    {page.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">{page.title}</h3>
                                    <p className="text-sm text-muted-foreground">{page.description}</p>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    </section>
)

export default function SitemapPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center mb-6">
            <h1 className="text-4xl font-bold font-headline text-primary">Sitemap</h1>
            <p className="text-muted-foreground mt-2">Navigate through all the pages available on Sugar Connect.</p>
        </div>
        <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
                <div className="space-y-10">
                    <SitemapSection title="Main Pages" pages={mainPages} />
                    <SitemapSection title="User Account" pages={userAccountPages} />
                    <SitemapSection title="Legal & Info" pages={legalInfoPages} />
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
