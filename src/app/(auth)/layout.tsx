import { Logo } from "@/components/icons";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
            <Link href="/">
                <Logo />
            </Link>
        </div>
      {children}
    </div>
  )
}
