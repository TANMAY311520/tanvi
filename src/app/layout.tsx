import type { Metadata } from "next";
import { StarField } from "@/components/StarField";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { FloatingMusicIcon } from "@/components/FloatingMusicIcon";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MusicProvider } from "@/context/MusicContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tanvi - A Universe Built For Us",
  description: "A premium romantic web app for Tanmay and Vidhi",
  icons: {
    icon: "💜",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden transition-colors duration-300 bg-light text-gray-900 dark:bg-dark dark:text-white">
        <style>{`
          html {
            color-scheme: light;
          }
          html.dark {
            color-scheme: dark;
          }
        `}</style>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <ThemeProvider>
          <StarField />
          <MusicProvider>
            <div className="fixed right-4 top-4 z-50">
              <ThemeToggle />
            </div>
            <FloatingMusicIcon />
            <MusicPlayer />
            <div className="relative z-10 pb-28 md:pb-20">{children}</div>
            <Footer />
            <BottomNav />
          </MusicProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
