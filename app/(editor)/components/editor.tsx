"use client";

import { Output } from "./output";
import { CODE_SNIPPETS, getLanguage } from "@/constants";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RotateCcw, Share2, Type } from "lucide-react";
import { executeCode } from "@/lib/api";
import { saveSnippet } from "@/lib/snippets";
import { toast } from "sonner";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { EditorLoading } from "./editor-loading";
import * as monaco from "monaco-editor";
import MonacoEditor from "@monaco-editor/react";
import { EditorHeader } from "./header";
import { EditorFooter } from "./footer";
import { ShareDialog } from "./share-dialog";
import { LanguageIcon } from "./language-icon";
import { useTheme } from "next-themes";

function defineEditorThemes(monacoApi: typeof monaco) {
  monacoApi.editor.defineTheme("github-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "8b949e", fontStyle: "italic" },
      { token: "keyword", foreground: "ff7b72" },
      { token: "string", foreground: "a5d6ff" },
      { token: "number", foreground: "79c0ff" },
      { token: "type", foreground: "ffa657" },
      { token: "function", foreground: "d2a8ff" },
    ],
    colors: {
      "editor.background": "#12141c",
      "editor.foreground": "#e6edf3",
      "editorLineNumber.foreground": "#4b5363",
      "editorLineNumber.activeForeground": "#9aa3b2",
      "editor.lineHighlightBackground": "#1b1f2b",
      "editorCursor.foreground": "#e6edf3",
      "editor.selectionBackground": "#264f78",
      "editorGutter.background": "#12141c",
      "editorIndentGuide.background1": "#2a2f3c",
    },
  });

  monacoApi.editor.defineTheme("github-light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#f8f9fc",
      "editorGutter.background": "#f8f9fc",
    },
  });
}

export function CodeEditor() {
  const [fontSize, setFontSize] = useState(16);
  const [output, setOutput] = useState<string[]>([]);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(CODE_SNIPPETS.javascript);
  const [hasError, setHasError] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [shareOpen, setShareOpen] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { resolvedTheme } = useTheme();
  const currentLanguage = getLanguage(language);
  const monacoTheme = resolvedTheme === "light" ? "github-light" : "github-dark";
  const sliderPercent = ((fontSize - 12) / (24 - 12)) * 100;

  const onSelect = (nextLanguage: string) => {
    setLanguage(nextLanguage);
    setCode(CODE_SNIPPETS[nextLanguage]);
    setHasRun(false);
    setOutput([]);
  };

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue() || code;
    if (!sourceCode.trim()) return;

    try {
      setLoading(true);
      const result = await executeCode(language, sourceCode, textInput);
      setHasRun(true);

      if (!result?.run) {
        setOutput(["Unable to run the code"]);
        setHasError(true);
        return;
      }

      if (result.run.stderr) {
        setOutput(result.run.stderr.split("\n"));
        setHasError(true);
      } else {
        setOutput(String(result.run.output ?? "").split("\n"));
        setHasError(false);
      }
    } catch {
      setHasRun(true);
      setHasError(true);
      setOutput(["Unable to run the code"]);
      toast("Unable to run the code");
    } finally {
      setLoading(false);
    }
  };

  const resetCode = () => {
    setCode(CODE_SNIPPETS[language] ?? "");
    toast("Editor reset to the default snippet");
  };

  const handleShare = (title: string) => {
    const sourceCode = editorRef.current?.getValue() || code;
    saveSnippet({ title, language, code: sourceCode });

    const encodedCode = encodeURIComponent(sourceCode);
    const url = `${window.location.origin}/?code=${encodedCode}&language=${language}`;

    navigator.clipboard.writeText(url).then(
      () => toast("Snippet saved and link copied"),
      () => toast("Snippet saved")
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get("code");
    const languageParam = params.get("language");

    if (languageParam && CODE_SNIPPETS[languageParam]) {
      setLanguage(languageParam);
    }
    if (codeParam) {
      setCode(decodeURIComponent(codeParam));
    }
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <EditorHeader language={language} onSelect={onSelect} onRun={runCode} loading={loading} />

      <main className="min-h-0 flex-1 px-3 py-3">
        <ResizablePanelGroup direction="horizontal" className="h-full gap-0">
          <ResizablePanel defaultSize={52} minSize={32} className="min-w-0">
            <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-card">
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <LanguageIcon language={currentLanguage.id} />
                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold leading-none">Code Editor</h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Write and execute your code
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background/40 px-3 py-1.5">
                    <Type className="size-3.5 text-muted-foreground" />
                    <input
                      type="range"
                      min={12}
                      max={24}
                      value={fontSize}
                      onChange={(event) => setFontSize(Number(event.target.value))}
                      className="font-size-slider w-20"
                      style={{ "--slider-progress": `${sliderPercent}%` } as React.CSSProperties}
                      aria-label="Font size"
                    />
                    <span className="w-5 text-right text-xs text-muted-foreground">{fontSize}</span>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={resetCode}
                    className="size-9 rounded-xl border-border/80 bg-background/40"
                    aria-label="Reset code"
                  >
                    <RotateCcw className="size-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShareOpen(true)}
                    className="h-9 rounded-xl bg-[#3b82f6] px-3 text-white hover:bg-[#2563eb]"
                  >
                    <Share2 className="size-3.5" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden">
                {loading ? (
                  <div className="absolute right-4 top-3 z-10 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                    <Loader2 className="size-3.5 animate-spin" />
                    Running
                  </div>
                ) : null}
                <MonacoEditor
                  height="100%"
                  language={currentLanguage.monaco}
                  theme={monacoTheme}
                  beforeMount={defineEditorThemes}
                  onMount={(editor) => {
                    editorRef.current = editor;
                    editor.focus();
                  }}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  loading={<EditorLoading />}
                  options={{
                    wordWrap: "on",
                    tabSize: 2,
                    fontFamily: "var(--font-geist-mono), Geist Mono, monospace",
                    fontSize,
                    minimap: { enabled: false },
                    padding: { top: 12, bottom: 12 },
                    scrollbar: {
                      vertical: "hidden",
                      horizontal: "hidden",
                      verticalScrollbarSize: 8,
                    },
                    overviewRulerLanes: 0,
                    hideCursorInOverviewRuler: true,
                    overviewRulerBorder: false,
                    lineNumbers: "on",
                    glyphMargin: false,
                    folding: false,
                    lineDecorationsWidth: 8,
                    lineNumbersMinChars: 3,
                    renderLineHighlight: "line",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    contextmenu: false,
                  }}
                />
              </div>
            </section>
          </ResizablePanel>

          <ResizableHandle className="w-3 bg-transparent" />

          <ResizablePanel defaultSize={48} minSize={28} className="min-w-0">
            <section className="h-full overflow-hidden rounded-2xl border border-border/70 bg-card">
              <Output
                output={output}
                stderr={hasError}
                textInput={textInput}
                setTextInput={setTextInput}
                hasRun={hasRun}
              />
            </section>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>

      <EditorFooter />
      <ShareDialog open={shareOpen} onOpenChange={setShareOpen} onShare={handleShare} />
    </div>
  );
}
