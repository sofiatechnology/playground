export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  dart: "2.19.6",
  haskell: "9.0.1",
  prolog: "8.2.4",
  rust: "1.68.2",
  bash: "5.2.0",
  sqlite3: "3.36.0",
  c: "10.2.0",
};

export const CODE_SNIPPETS: { [key: string]: string } = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Alex';\necho $name;\n",
  dart: `\nvoid main() {\n\tprint('Hello, World!');\n}\n`,
  haskell: `\nmain = putStrLn "Hello, World!"\n`,
  prolog: `:- use_module(library(clpfd)).\n\nmain :-\n\twrite('Hello, World!'), nl.\n`,
  rust: `\nfn main() {\n\tprintln!("Hello, World!");\n}\n`,
  bash: "#!/bin/bash\necho 'Hello, World!'\n",
  sqlite3: `CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT); INSERT INTO users (name) VALUES ('Birusha'); SELECT * FROM users;`,
  c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!");\n\treturn 0;\n}`,
};
