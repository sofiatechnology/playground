"use client";

import dynamic from "next/dynamic";

const CodeEditor = dynamic(() => import("./components/editor").then((mod) => mod.CodeEditor), {
  ssr: false,
  loading: () => <div className="h-screen bg-background" />,
});

export default function Home() {
  return <CodeEditor />;
}
