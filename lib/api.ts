import axios from "axios";
import { LANGUAGE_VERSIONS } from "@/constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export async function executeCode(language: string, code: string, input: string) {
  if (!language || !code) return;

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
  } catch {
    return null;
  }
}
