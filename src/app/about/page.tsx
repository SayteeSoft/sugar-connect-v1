import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-headline text-primary font-bold">Welcome to Sugar Connect</h1>
                <p className="text-muted-foreground text-lg mt-2">Where Ambitious Hearts and Discerning Tastes Meet</p>
            </div>
            <Card className="max-w-4xl mx-auto shadow-lg">
                <CardContent className="space-y-8 text-muted-foreground text-center md:text-left p-6 md:p-8">
                    <p>
                        At Sugar Connect, we believe that relationships should be empowering, transparent, and tailored to the modern world. We have created an exclusive platform where successful, established individuals and ambitious, attractive people can connect on their own terms. Our community is built on a foundation of respect, honesty, and the shared desire for a relationship that enhances, rather than complicates, life.
                    </p>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold font-headline text-foreground">Our Mission</h2>
                        <p>
                            Our mission is to redefine the landscape of modern dating by providing a high-quality, secure, and intuitive platform for creating mutually beneficial relationships. We strive to eliminate the ambiguity of conventional dating, allowing our members to be upfront about their desires and expectations from the very beginning. We are dedicated to fostering a community where every connection is a meaningful one.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold font-headline text-foreground">Why Choose Sugar Connect?</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">Exclusivity & Quality</h3>
                                <p>
                                    We curate our community to ensure a high caliber of members. Every profile is reviewed to maintain a network of genuine, successful, and ambitious individuals who are serious about finding a quality connection.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">Privacy & Discretion</h3>
                                <p>
                                    Your privacy is our utmost priority. We employ industry-leading security measures and provide tools that give you full control over your profile's visibility, ensuring your experience is both safe and discreet.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">Meaningful Connections</h3>
                                <p>
                                    We move beyond the superficial. Sugar Connect is for those who seek more than just a date; it's for individuals looking for mentorship, companionship, and a partnership that enriches their lives. Our platform encourages clear communication about expectations, leading to more honest and fulfilling relationships.
                                </p>
                            </div>
                             <div>
                                <h3 className="text-lg font-semibold text-foreground">A Modern Approach</h3>
                                <p>
                                    The world of dating has evolved, and so have we. We provide a sophisticated, streamlined experience that respects your time and aspirations. With advanced search filters and a user-friendly interface, finding your ideal match has never been more efficient.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center border-t pt-8">
                        <h2 className="text-2xl font-bold font-headline text-foreground">Join Our Community Today</h2>
                        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                           Discover a new standard of dating. Find a partner who understands your ambition and complements your lifestyle.
                        </p>
                        <Button asChild size="lg" className="mt-6">
                            <Link href="/signup">
                                <Heart className="mr-2 h-5 w-5" />
                                Find Your Match
                            </Link>
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    </div>
  );
}
