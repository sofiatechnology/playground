"use client";

import { Button } from "@/components/ui/button";
import { getLanguage } from "@/constants";
import { deleteSnippet, getSnippets, type SavedSnippet } from "@/lib/snippets";
import { LanguageIcon } from "@/app/(editor)/components/language-icon";
import { Code2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<SavedSnippet[]>([]);

  useEffect(() => {
    setSnippets(getSnippets());
  }, []);

  const remove = (id: string) => {
    setSnippets(deleteSnippet(id));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Snippets</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Shared snippets from this browser are saved here so you can reopen them later.
      </p>

      {snippets.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border/70 bg-card px-6 py-16 text-center">
          <Code2 className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            No snippets yet. Share code from the editor to save it here.
          </p>
          <Button asChild className="mt-5 rounded-xl bg-[#3b82f6] text-white hover:bg-[#2563eb]">
            <Link href="/">Open editor</Link>
          </Button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-3">
          {snippets.map((snippet) => {
            const language = getLanguage(snippet.language);
            const href = `/?language=${encodeURIComponent(snippet.language)}&code=${encodeURIComponent(snippet.code)}`;

            return (
              <li
                key={snippet.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card px-4 py-4"
              >
                <Link href={href} className="flex min-w-0 items-center gap-3">
                  <LanguageIcon language={snippet.language} />
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{snippet.title}</span>
                    <span className="block text-xs text-muted-foreground">
                      {language.label} · {new Date(snippet.createdAt).toLocaleString()}
                    </span>
                  </span>
                </Link>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Delete ${snippet.title}`}
                  onClick={() => remove(snippet.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
