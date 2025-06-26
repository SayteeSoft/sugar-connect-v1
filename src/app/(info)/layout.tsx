import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-secondary/50">
        {children}
      </main>
      <Footer />
    </div>
  );
}
