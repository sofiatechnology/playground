"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { LANGUAGES, getLanguage } from "@/constants";
import { Sparkles } from "lucide-react";
import { LanguageIcon } from "./language-icon";

export function LanguageSelector({
  language,
  onSelect,
}: {
  language: string;
  onSelect: (language: string) => void;
}) {
  const current = getLanguage(language);

  return (
    <Select onValueChange={onSelect} value={language}>
      <SelectTrigger className="h-10 min-w-[168px] rounded-xl border-border/80 bg-background/40 px-3 text-sm font-medium shadow-none hover:bg-accent">
        <span className="flex items-center gap-2 whitespace-nowrap">
          <LanguageIcon language={current.id} />
          <span>{current.label}</span>
        </span>
      </SelectTrigger>
      <SelectContent className="min-w-[220px] rounded-xl border-border/80 bg-popover p-1.5">
        <SelectGroup>
          <SelectLabel className="px-2 pb-2 pt-1 text-xs font-medium text-muted-foreground">
            Select Language
          </SelectLabel>
          {LANGUAGES.map((item) => (
            <SelectItem
              key={item.id}
              value={item.id}
              className="mb-0.5 rounded-lg py-2 pr-3 pl-2 text-sm text-foreground data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary data-[state=checked]:font-medium [&>span:first-child]:hidden [&>span:last-child]:flex [&>span:last-child]:w-full [&>span:last-child]:items-center [&>span:last-child]:gap-2"
            >
              <LanguageIcon language={item.id} />
              <span className="flex-1">{item.label}</span>
              {language === item.id ? <Sparkles className="size-3.5 text-primary" /> : null}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
