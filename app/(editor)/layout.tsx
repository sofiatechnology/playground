import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOFIA EDITOR - Interactive Code Editor",
  description:
    "Write, run, and share code in the browser. No setup required — an interactive playground for JavaScript, TypeScript, Python, and more.",
};

export default function EditorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
