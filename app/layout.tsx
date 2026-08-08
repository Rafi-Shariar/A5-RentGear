import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { getMe } from "@/services/getMe";
import { UserStoreInitializer } from "./(public)/_components/UserStoreInitializer";
import { GlobalScrollReset } from "@/components/shared/ScrollToTop";
import TanstackProvider from "@/providers/tanstackProvider";
import SWRProvider from "@/providers/SWRProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import GoogleAuthProvider from "@/providers/GoogleAuthProvider";

const robotoHeading = Roboto({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "RentGear",
  description: "A modern gear renting service",
  
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();

  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        "font-sans",
        inter.variable,
        robotoHeading.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <UserStoreInitializer user={user} />
        <GlobalScrollReset />
        <TanstackProvider>
          <SWRProvider>
            <ThemeProvider
            attribute="class"
          
          enableSystem
          disableTransitionOnChange
            >
              <GoogleAuthProvider>
                        {children}
              </GoogleAuthProvider>
            
            </ThemeProvider>
            </SWRProvider>
        </TanstackProvider>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
