import { Skeleton } from "@/components/ui/skeleton";

export function EditorLoading() {
  return (
    <div className="flex h-full w-full bg-card p-4">
      <div className="flex flex-1 space-x-3">
        <div className="flex flex-col items-end pr-4 text-muted-foreground">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="font-mono text-xs leading-6">
              {i + 1}
            </span>
          ))}
        </div>
        <div className="flex-1 space-y-3 pt-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-4"
              style={{ width: `${40 + ((i * 17) % 50)}%`, marginLeft: `${(i % 4) * 12}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
