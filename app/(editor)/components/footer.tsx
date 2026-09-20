import { Code2 } from "lucide-react";
import Link from "next/link";

export function EditorFooter() {
  return (
    <footer className="flex items-center justify-between px-6 py-3 text-sm text-muted-foreground">
      <p className="inline-flex items-center gap-2">
        <Code2 className="size-4" />
        Built for developers, by developers
      </p>
      <nav className="flex items-center gap-5">
        <Link href="/support" className="transition-colors hover:text-foreground">
          Support
        </Link>
        <Link href="/privacy" className="transition-colors hover:text-foreground">
          Privacy
        </Link>
        <Link href="/terms" className="transition-colors hover:text-foreground">
          Terms
        </Link>
      </nav>
    </footer>
  );
}
