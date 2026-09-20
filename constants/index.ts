export const LANGUAGES = [
  { id: "javascript", label: "JavaScript", monaco: "javascript", version: "18.15.0", short: "JS" },
  { id: "typescript", label: "TypeScript", monaco: "typescript", version: "5.0.3", short: "TS" },
  { id: "python", label: "Python", monaco: "python", version: "3.10.0", short: "PY" },
  { id: "java", label: "Java", monaco: "java", version: "15.0.2", short: "JA" },
  { id: "go", label: "Go", monaco: "go", version: "1.16.2", short: "GO" },
  { id: "csharp", label: "C#", monaco: "csharp", version: "6.12.0", short: "C#" },
  { id: "php", label: "PHP", monaco: "php", version: "8.2.3", short: "PHP" },
  { id: "dart", label: "Dart", monaco: "dart", version: "2.19.6", short: "DT" },
  { id: "haskell", label: "Haskell", monaco: "haskell", version: "9.0.1", short: "HS" },
  { id: "prolog", label: "Prolog", monaco: "plaintext", version: "8.2.4", short: "PL" },
  { id: "rust", label: "Rust", monaco: "rust", version: "1.68.2", short: "RS" },
  { id: "bash", label: "Bash", monaco: "shell", version: "5.2.0", short: "SH" },
  { id: "sqlite3", label: "SQLite", monaco: "sql", version: "3.36.0", short: "SQL" },
  { id: "c", label: "C", monaco: "c", version: "10.2.0", short: "C" },
] as const;

export type LanguageId = (typeof LANGUAGES)[number]["id"];

export const LANGUAGE_VERSIONS = Object.fromEntries(
  LANGUAGES.map((language) => [language.id, language.version])
) as Record<LanguageId, string>;

export function getLanguage(id: string) {
  return LANGUAGES.find((language) => language.id === id) ?? LANGUAGES[0];
}

export const CODE_SNIPPETS: Record<string, string> = {
  javascript: `console.log("Hello, World!");
`,
  typescript: `console.log("Hello, World!");
`,
  python: `print("Hello, World!")
`,
  java: `public class HelloWorld {
	public static void main(String[] args) {
		System.out.println("Hello, World!");
	}
}
`,
  go: `package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
}
`,
  csharp: `using System;

class HelloWorld {
	static void Main() {
		Console.WriteLine("Hello, World!");
	}
}
`,
  php: `<?php
echo "Hello, World!";
`,
  dart: `void main() {
	print("Hello, World!");
}
`,
  haskell: `main = putStrLn "Hello, World!"
`,
  prolog: `main :-
	write('Hello, World!'), nl.
`,
  rust: `fn main() {
	println!("Hello, World!");
}
`,
  bash: `echo "Hello, World!"
`,
  sqlite3: `SELECT "Hello, World!";
`,
  c: `#include <stdio.h>

int main() {
	printf("Hello, World!");
	return 0;
}
`,
};
