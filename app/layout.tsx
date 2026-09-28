import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/site";

export const metadata: Metadata = {
  title: "BeNeXt — Digital Solutions",
  description: "Frontend recreation of the approved BeNeXt Figma design."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bg"><body>{children}<Footer global /></body></html>;
}
