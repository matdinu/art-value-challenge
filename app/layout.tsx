import type { Metadata } from "next";
import { DM_Serif_Text, Fredericka_the_Great } from "next/font/google";
import "./globals.css";

const dmserif = DM_Serif_Text({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-dmserif",
});

const fredericka = Fredericka_the_Great({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-fredericka",
});

export const metadata: Metadata = {
  title: "ArtValue Challenge",
  description: "A game to test your art knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`${dmserif.variable} ${fredericka.variable}`}>
        {children}
      </body>
    </html>
  );
}
