import type { Metadata } from "next";
import ".//src/styles/globals.css";

export const metadata: Metadata = {
  title: "Flux",
  description: "Tienda de medicamentos en línea",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="bg-gray-100 font-sans">{children}</body>
    </html>
  );
}
