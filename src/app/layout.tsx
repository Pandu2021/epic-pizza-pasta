import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext"; // <-- Import AuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pizza Project - Delicious Pizzas",
  description: "The best pizza in town, made with fresh ingredients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {/* <-- Wrap with AuthProvider */}
          <CartProvider>
            <main className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow">
                {children}
              </div>
              <Footer />
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
