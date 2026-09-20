"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CheckCircle2, Copy, Terminal, XCircle } from "lucide-react";
import { toast } from "sonner";

export function Output({
  output,
  stderr,
  textInput,
  setTextInput,
  hasRun,
}: {
  output: string[];
  stderr?: boolean;
  textInput: string;
  setTextInput: (value: string) => void;
  hasRun: boolean;
}) {
  const copyOutput = async () => {
    const text = output.join("\n").trim();
    if (!text) {
      toast("Nothing to copy yet");
      return;
    }
    await navigator.clipboard.writeText(text);
    toast("Output copied to clipboard");
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Terminal className="size-4 text-muted-foreground" />
          <div>
            <h2 className="text-sm font-semibold leading-none">Output</h2>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={copyOutput}
          className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <Copy className="size-3.5" />
          Copy
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto px-4 pb-4">
        {!hasRun ? (
          <p className="pt-8 text-center text-sm text-muted-foreground">
            Run your code to see the output here...
          </p>
        ) : (
          <div className="rounded-xl border border-border/70 bg-background/40 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              {stderr ? (
                <>
                  <XCircle className="size-4 text-red-400" />
                  <span className="text-red-400">Execution Failed</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4 text-emerald-400" />
                  <span className="text-emerald-400">Execution Successful</span>
                </>
              )}
            </div>
            <pre
              className={cn(
                "font-mono text-[13px] leading-6 whitespace-pre-wrap",
                stderr ? "text-red-300" : "text-foreground/80"
              )}
            >
              {output.filter(Boolean).join("\n") || "Program finished with no output."}
            </pre>
          </div>
        )}
      </div>

      <details className="border-t border-border/70 px-4 py-3">
        <summary className="cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground">
          Standard input
        </summary>
        <Textarea
          value={textInput}
          onChange={(event) => setTextInput(event.target.value)}
          placeholder="Optional program input"
          className="mt-3 min-h-16 resize-none rounded-xl border-border/80 bg-background/50"
        />
      </details>
    </div>
  );
}
