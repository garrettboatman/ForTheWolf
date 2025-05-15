import type { Metadata } from "next";
import { Geist, Geist_Mono, Anonymous_Pro } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/app/providers/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anonymousPro = Anonymous_Pro({
  variable: "--font-anonymous-pro",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jake & Amir | Script Archive",
  description:
    "Script Archive/Database project for all JakeandAmir.com episodes",
  keywords: [
    "Jake and Amir",
    "College Humor",
    "scripts",
    "archive",
    "episodes",
    "comedy",
    "web series",
  ],
  openGraph: {
    title: "Jake & Amir | Script Archive",
    description:
      "Script Archive/Database project for all JakeandAmir.com episodes",
    siteName: "Jake & Amir Script Archive",
    type: "website",
    images: [
      {
        url: "/jna-intro.jpg",
        width: 800,
        height: 600,
        alt: "Jake and Amir - Script Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jake & Amir | Script Archive",
    description:
      "Script Archive/Database project for all JakeandAmir.com episodes",
    images: ["/jna-intro.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#f97316", // Orange color
  applicationName: "Jake & Amir Script Archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anonymousPro.variable} antialiased`}
      >
        <PostHogProvider>{children}</PostHogProvider>
        <div className="bg-white text-center py-2">
          © 2013 | All videos owned by{" "}
          <a
            className="text-bold underline"
            target="blank"
            href="https://www.youtube.com/jakeandamir"
          >
            Jake and Amir
          </a>
        </div>
      </body>
    </html>
  );
}
