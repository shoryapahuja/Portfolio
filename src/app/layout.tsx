import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shorya Pahuja | ECE Portfolio",
  description:
    "Electrical & Computer Engineering student at Western University. Seeking internships in ECE, software, and manufacturing. CAD design, Arduino/C++, and hands-on engineering experience.",
  keywords: [
    "Electrical Engineering",
    "Computer Engineering",
    "Western University",
    "ECE Portfolio",
    "CAD Design",
    "Arduino",
    "C++",
    "Engineering Internship",
  ],
  authors: [{ name: "Shorya Pahuja" }],
  openGraph: {
    title: "Shorya Pahuja | ECE Portfolio",
    description:
      "Electrical & Computer Engineering student at Western University. Seeking internships in ECE, software, and manufacturing.",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shorya Pahuja | ECE Portfolio",
    description:
      "Electrical & Computer Engineering student at Western University. Seeking internships in ECE, software, and manufacturing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
