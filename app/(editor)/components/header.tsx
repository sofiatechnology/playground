"use client";

import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./language-selector";
import { Code2, Moon, Play, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme !== "light" : false;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="hidden size-10 items-center justify-center rounded-xl border border-border/80 bg-background/40 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
    >
      {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
}

export function SiteHeader({ actions }: { actions?: ReactNode }) {
  return (
    <header className="mx-3 mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card px-4 py-2.5">
      <div className="flex min-w-0 items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Code2 className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold tracking-wide text-foreground">
              SOFIA EDITOR
            </span>
            <span className="block text-xs text-muted-foreground">Interactive Code Editor</span>
          </span>
        </Link>
        <Link
          href="/snippets"
          className="ml-2 inline-flex h-9 items-center gap-2 rounded-xl border border-border/80 bg-background/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Code2 className="size-3.5" />
          Snippets
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitch />
        {actions}
      </div>
    </header>
  );
}

export function EditorHeader({
  language,
  onSelect,
  onRun,
  loading,
}: {
  language: string;
  onSelect: (language: string) => void;
  onRun: () => void;
  loading: boolean;
}) {
  return (
    <SiteHeader
      actions={
        <>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Button
            onClick={onRun}
            disabled={loading}
            className="h-10 rounded-xl bg-[#3b82f6] px-4 text-white hover:bg-[#2563eb]"
          >
            <Play className="size-4 fill-current" />
            {loading ? "Running..." : "Run Code"}
          </Button>
        </>
      }
    />
  );
}
