import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOFIA Tech Playground - Interactive Online Code Editor",
  description:
    "Experiment with code in real-time using SOFIA Tech's powerful browser-based playground. No setup required - write, test, and share your code snippets instantly with our intuitive online editor.",
};

export default function EditorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}
