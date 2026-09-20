import axios from "axios";
import { LANGUAGE_VERSIONS } from "@/constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

function formatValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return String(value);
  }
  if (Array.isArray(value)) {
    return `[ ${value.map(formatValue).join(", ")} ]`;
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function runJavaScript(code: string) {
  const logs: string[] = [];
  const consoleLike = {
    log: (...args: unknown[]) => logs.push(args.map(formatValue).join(" ")),
    info: (...args: unknown[]) => logs.push(args.map(formatValue).join(" ")),
    warn: (...args: unknown[]) => logs.push(args.map(formatValue).join(" ")),
    error: (...args: unknown[]) => logs.push(args.map(formatValue).join(" ")),
  };

  try {
    const runner = new Function("console", code);
    runner(consoleLike);
    const output = logs.join("\n");
    return {
      run: {
        stdout: output,
        stderr: "",
        output: output ? `${output}\n` : "",
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      run: {
        stdout: logs.join("\n"),
        stderr: message,
        output: logs.join("\n"),
      },
    };
  }
}

export async function executeCode(language: string, code: string, input: string) {
  if (!language || !code) return;

  if (language === "javascript") {
    return runJavaScript(code);
  }

  const formattedInput = input.replace(/\s{3,}/g, "\n");

  try {
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language as keyof typeof LANGUAGE_VERSIONS],
      stdin: formattedInput,
      files: [
        {
          content: code,
        },
      ],
    });
    if (!response) return null;
    return response.data;
  } catch (error) {
    const message =
      axios.isAxiosError(error) && error.response?.data?.message
        ? String(error.response.data.message)
        : "Unable to run the code";
    return {
      run: {
        stdout: "",
        stderr: message,
        output: message,
      },
    };
  }
}
