import { cn } from "@/lib/utils";

export function LanguageIcon({ language, className }: { language: string; className?: string }) {
  const box = cn(
    "flex size-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold leading-none",
    className
  );

  switch (language) {
    case "javascript":
      return (
        <span className={cn(box, "bg-[#f7df1e] text-black")} aria-hidden>
          JS
        </span>
      );
    case "typescript":
      return (
        <span className={cn(box, "bg-[#3178c6] text-white")} aria-hidden>
          TS
        </span>
      );
    case "python":
      return (
        <span className={cn(box, "bg-[#1e415e] text-white")} aria-hidden>
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
            <path
              d="M12.5 3c-2.3 0-2.7.9-2.7 2.6v1.7h5.4c.6 0 1.1.5 1.1 1.1v5.2c0 1.7-.9 2.6-2.7 2.6H9.3V14h-1.8c-1.8 0-3.4-1-3.8-2.8-.5-2-.5-3.2 0-5.2C4.2 4 6.3 3 8.5 3h4z"
              fill="#3776AB"
            />
            <path
              d="M11.5 21c2.3 0 2.7-.9 2.7-2.6v-1.7H8.8c-.6 0-1.1-.5-1.1-1.1v-5.2c0-1.7.9-2.6 2.7-2.6h4.3V10h1.8c1.8 0 3.4 1 3.8 2.8.5 2 .5 3.2 0 5.2C19.8 20 17.7 21 15.5 21h-4z"
              fill="#FFD43B"
            />
          </svg>
        </span>
      );
    case "java":
      return (
        <span className={cn(box, "bg-[#e76f00] text-white")} aria-hidden>
          Ja
        </span>
      );
    case "go":
      return (
        <span className={cn(box, "bg-[#00add8] text-white")} aria-hidden>
          Go
        </span>
      );
    case "csharp":
      return (
        <span className={cn(box, "bg-[#68217a] text-white")} aria-hidden>
          C#
        </span>
      );
    case "php":
      return (
        <span className={cn(box, "bg-[#777bb3] text-white")} aria-hidden>
          PHP
        </span>
      );
    case "dart":
      return (
        <span className={cn(box, "bg-[#0175c2] text-white")} aria-hidden>
          Dt
        </span>
      );
    case "haskell":
      return (
        <span className={cn(box, "bg-[#5d4f85] text-white")} aria-hidden>
          Hs
        </span>
      );
    case "prolog":
      return (
        <span className={cn(box, "bg-[#d1432c] text-white")} aria-hidden>
          Pl
        </span>
      );
    case "rust":
      return (
        <span className={cn(box, "bg-[#dea584] text-[#1a1a1a]")} aria-hidden>
          Rs
        </span>
      );
    case "bash":
      return (
        <span className={cn(box, "bg-[#3e474a] text-white")} aria-hidden>
          Sh
        </span>
      );
    case "sqlite3":
      return (
        <span className={cn(box, "bg-[#0f80cc] text-white")} aria-hidden>
          SQL
        </span>
      );
    case "c":
      return (
        <span className={cn(box, "bg-[#283593] text-white")} aria-hidden>
          C
        </span>
      );
    default:
      return (
        <span className={cn(box, "bg-muted text-foreground")} aria-hidden>
          {language.slice(0, 2).toUpperCase()}
        </span>
      );
  }
}
