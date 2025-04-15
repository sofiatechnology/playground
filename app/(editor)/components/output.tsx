"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Terminal } from "lucide-react";

export function Output({
  output,
  clear,
  stderr,
  textInput,
  setTextInput,
}: {
  output: string[] | null;
  clear: () => void;
  stderr?: boolean;
  textInput: string;
  setTextInput: (value: string) => void;
}) {
  return (
    <div className="w-full overflow-hidden scrollbar-hidden h-[88vh]">
      <div className="h-12 border-b border-border flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <Terminal />
          <h2>Output</h2>
        </div>

        <Button size="sm" variant="outline" onClick={clear}>
          Clear
        </Button>
      </div>
      <div className="h-[calc(100vh-96px)] overflow-auto">
        <div className="m-4">
          <div>
            <Textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} />
            <div className="border border-border rounded-md mt-4 w-full h-[400px] overflow-y-scroll">
              <div className="w-full h-full p-4">
                {output &&
                  output.map((line: string, i: number) => (
                    <p key={i} className={`${stderr ? "text-red-500" : "text-green-500"}`}>
                      {line}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
