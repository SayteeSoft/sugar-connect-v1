
"use client";

import './globals.css';
import { AuthProvider } from '@/components/auth-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { MessageToast } from '@/components/message-toast';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieBanner } from '@/components/cookie-banner';
import { LayoutProvider, useLayout } from '@/hooks/use-layout';
import { CookiePolicy } from '@/components/cookie-policy';
import { PrivacyPolicy } from '@/components/privacy-policy';
import { TermsOfUse } from '@/components/terms-of-use';


function AppContent({ children }: { children: React.ReactNode }) {
  const { layoutState, setLayoutState } = useLayout();

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer setLayoutState={setLayoutState} />
      </div>
      <Toaster />
      <MessageToast />
      <CookieBanner />
      <CookiePolicy 
        open={layoutState.showCookiePolicy} 
        onOpenChange={(open) => setLayoutState(prevState => ({ ...prevState, showCookiePolicy: open }))}
      />
      <PrivacyPolicy
        open={layoutState.showPrivacyPolicy}
        onOpenChange={(open) => setLayoutState(prevState => ({ ...prevState, showPrivacyPolicy: open }))}
      />
      <TermsOfUse
        open={layoutState.showTermsOfUse}
        onOpenChange={(open) => setLayoutState(prevState => ({ ...prevState, showTermsOfUse: open }))}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Manrope:wght@400;700&display=swap" rel="stylesheet" />
        <title>Sugar Connect</title>
        <meta name="description" content="An exclusive platform for ambitious and attractive individuals" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutProvider>
            <AuthProvider>
              <AppContent>{children}</AppContent>
            </AuthProvider>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
