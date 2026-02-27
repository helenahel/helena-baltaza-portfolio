import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Gotu, Montserrat, Pixelify_Sans } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { LanguageProvider } from "./lib/language-context";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const gotu = Gotu({
  variable: "--font-gotu",
  subsets: ["latin"],
  weight: "400",
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Helena Baltaza — UX Designer",
  description:
    "Portfolio of Helena Baltaza — UX/Product Designer with a background in Psychology and Computer Science, specializing in HealthTech solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="/theme-init.js" />
      </head>
      <body
        className={`${montserrat.variable} ${gotu.variable} ${pixelifySans.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
