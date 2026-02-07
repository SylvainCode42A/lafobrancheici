import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Steel UI",
  description: "Neural Interface System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="bg-[#111111] selection:bg-white/10">
      <body className={`${inter.className} antialiased text-white bg-[#111111] min-h-screen relative`}>
        {/* On ne met pas le fond ici car il est déjà dans tes pages (Home, Network, etc.) */}
        {/* Cela permet à chaque page de gérer son propre style (violet pour landing, noir pour dashboard) */}
        {children}
      </body>
    </html>
  );
}