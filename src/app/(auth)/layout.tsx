import { Logo } from "@/components/icons";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
        <div className="absolute top-8">
            <Link href="/">
                <Logo />
            </Link>
        </div>
      {children}
    </div>
  )
}
