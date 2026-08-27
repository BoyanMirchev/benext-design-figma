import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeNeXt — Digital Solutions",
  description: "Frontend recreation of the approved BeNeXt Figma design."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bg"><body>{children}</body></html>;
}
