import { Navbar } from "@/components/ui/navbar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { Toaster } from 'sonner';
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js Todo App",
  description: "Next.js Todo App Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1 container py-8">
              <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <div className="flex flex-col gap-20 max-w-5xl p-5 pt-8">
                  <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold mb-8">Next.js Todo App</h1>
                    {children}
                  </div>
                </div>
              </div>
            </div>
            <footer className="w-full border-t">
              <div className="container flex h-14 items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Next Todo
                </p>
                <ThemeSwitcher />
              </div>
            </footer>
            <Toaster position="top-right" closeButton richColors />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
