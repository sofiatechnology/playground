import { EditorFooter } from "@/app/(editor)/components/footer";
import { SiteHeader } from "@/app/(editor)/components/header";
import { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">{children}</main>
      <EditorFooter />
    </div>
  );
}
