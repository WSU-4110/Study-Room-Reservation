import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Study Room Reservation",
  description: "Reserve and manage study rooms easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Simple Nav Bar */}
        <header className="border-b bg-background sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
            <h1 className="font-semibold text-lg">Study Room Reservation</h1>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="hover:text-primary">Home</Link>
              <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
              <Link href="/find-room" className="hover:text-primary">Find Room</Link>
            </div>
          </nav>
        </header>

        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
