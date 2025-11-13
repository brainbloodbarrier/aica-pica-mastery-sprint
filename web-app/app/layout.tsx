import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import { HeartsProvider } from "@/context/HeartsContext";
import { NeuronsProvider } from "@/context/NeuronsContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AICA-PICA Mastery Sprint | Aprendizado Interativo de Neuroanatomia",
  description: "Sistema gamificado de aprendizado para dominar a anatomia microcirúrgica das artérias AICA e PICA",
  keywords: ["neuroanatomia", "AICA", "PICA", "neurocirurgia", "educação médica", "gamificação"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen`}>
        <ErrorBoundary>
          <GameProvider>
            <HeartsProvider>
              <NeuronsProvider>
                {children}
              </NeuronsProvider>
            </HeartsProvider>
          </GameProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
