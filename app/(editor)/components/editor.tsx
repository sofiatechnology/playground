"use client";
import { Output } from "./output";
import { CODE_SNIPPETS } from "@/constants";
import { useRef, useState, useEffect } from "react";
// import { Editor as MonacoEditor } from "@monaco-editor/react";
import { LanguageSelector } from "./language-selector";
import { Button } from "@/components/ui/button";
import { Loader2, Maximize2, Minimize2, Copy, Check, Share2, Play } from "lucide-react";
import { executeCode } from "@/lib/api";
import { toast } from "sonner";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { EditorLoading } from "./editor-loading";
import * as monaco from "monaco-editor";
import MonacoEditor from "@monaco-editor/react";

export function CodeEditor() {
  const [fontSize, setFontSize] = useState(14);
  const [output, setOutput] = useState<null | "">(null);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [hasError, setHasError] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const onSelect = (language: string) => {
    setLanguage(language);
    setCode(CODE_SNIPPETS[language]);
  };

  const clear = () => {
    setOutput("");
  };

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;

    try {
      setLoading(true);
      const { run: result } = await executeCode(language, sourceCode, textInput);
      if (result.stderr !== "") {
        setOutput(result.stderr.split("\n"));
        setHasError(true);
      } else if (result == null) {
        return;
      } else {
        setOutput(result.output.split("\n"));
        setHasError(false);
      }
    } catch {
      toast("Unable to run the code");
    } finally {
      setLoading(false);
    }
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isFullScreen]);

  // Add new state for copy feedback
  const [isCopied, setIsCopied] = useState(false);

  // Add copy function
  const copyCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    await navigator.clipboard.writeText(sourceCode ? sourceCode : "");
    toast("Code copied to clipboard");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const [shareUrl, setShareUrl] = useState("");
  const [isShareCopied, setIsShareCopied] = useState(false);

  const generateShareUrl = () => {
    const sourceCode = editorRef.current?.getValue();
    const encodedCode = encodeURIComponent(sourceCode ? sourceCode : "");
    return `${window.location.origin}${window.location.pathname}?code=${encodedCode}&language=${language}`;
  };

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsShareCopied(true);
      setTimeout(() => setIsShareCopied(false), 5000);
    } catch {
      toast("Failed to copy link");
    }
  };

  const handleShareClick = () => {
    setShareUrl(generateShareUrl());
  };

  // Add effect to handle URL params when component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get("code");
    const languageParam = params.get("language");

    if (codeParam) {
      const decodedCode = decodeURIComponent(codeParam);
      setCode(decodedCode);
    }
    if (languageParam && CODE_SNIPPETS.hasOwnProperty(languageParam)) {
      setLanguage(languageParam);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden text-white scrollbar-hidden">
      <ResizablePanelGroup
        direction="horizontal"
        className={`min-h-[calc(100vh-66px)] bg-background text-foreground w-full overflow-hidden scrollbar-hidden ${isFullScreen ? "fixed inset-0 z-50 h-screen" : ""}`}
      >
        <ResizablePanel defaultSize={50} className="overflow-hidden scrollbar-hidden">
          <div className="overflow-hidden scrollbar-hidden">
            <div className="h-12 border-b border-border flex items-center px-4 justify-between">
              <div className="flex items-center gap-4">
                <LanguageSelector language={language} onSelect={onSelect} />
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-24 hover:cursor-pointer"
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={handleShareClick}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share link</DialogTitle>
                      <DialogDescription>
                        Anyone who has this link will be able to view this code.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>
                        <Input id="link" value={shareUrl} readOnly />
                      </div>
                      <Button type="button" size="sm" className="px-3" onClick={copyShareUrl}>
                        {isShareCopied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button size="sm" variant="outline" onClick={copyCode}>
                  {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsFullScreen(!isFullScreen)}>
                  {isFullScreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
                <Button size="sm" onClick={runCode} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Running
                    </>
                  ) : (
                    <>
                      <Play />
                      Run
                    </>
                  )}
                </Button>
              </div>
            </div>
            <MonacoEditor
              className={`overflow-hidden scrollbar-hidden`}
              height={isFullScreen ? "calc(100vh - 48px)" : "calc(100vh - 134px)"}
              language={language}
              theme="vs-light"
              onMount={(editor) => {
                editorRef.current = editor;
                editor.focus();
              }}
              defaultValue={CODE_SNIPPETS[language]}
              value={code}
              onChange={(value) => setCode(value || "")}
              loading={<EditorLoading />}
              options={{
                wordWrap: "on",
                tabSize: 2,
                fontFamily: "Cascadia Code",
                fontSize: fontSize,
                minimap: { enabled: false },
                scrollbar: {
                  vertical: "visible",
                  horizontal: "visible",
                },
                lineNumbers: "on",
                glyphMargin: true,
                folding: true,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 3,
              }}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} className="overflow-hidden scrollbar-hidden">
          <div className="flex-1 border-l border-border">
            <Output
              output={output ? [output] : []}
              clear={clear}
              stderr={hasError}
              textInput={textInput}
              setTextInput={setTextInput}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
