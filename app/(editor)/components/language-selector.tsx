import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGE_VERSIONS } from "@/constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

export function LanguageSelector({
  language,
  onSelect,
}: {
  language: string;
  onSelect: (() => void) | ((language: string) => void);
}) {
  return (
    <Select onValueChange={onSelect} value={language}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {languages.map(([lang, version]) => (
            <SelectItem
              key={lang}
              value={lang}
              className={`${language === lang ? "bg-primary text-primary-foreground" : ""}`}
            >
              {lang} <span className={`text-sm`}>({version})</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
