import { Skeleton } from "@/components/ui/skeleton";

export function EditorLoading() {
  return (
    <div className="w-full h-full flex bg-background p-4">
      <div className="flex flex-1 space-x-3">
        {/* Line Numbers */}
        <div className="flex flex-col items-end pr-4 text-muted-foreground">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="text-xs font-mono">
              {i + 1}
            </span>
          ))}
        </div>

        {/* Code Skeleton */}
        <div className="flex-1 space-y-2">
          {Array.from({ length: 20 }).map((_, i) => {
            // Simulate indentation by adding left margin
            const indent = Math.floor(Math.random() * 4) * 16; // 0px to 48px
            return (
              <div key={i} className="flex gap-2">
                <div style={{ marginLeft: indent }} className="flex w-full gap-2">
                  <Skeleton className={`h-4 flex-1`} />
                  {Math.random() > 0.5 && <Skeleton className="h-4 w-16" />}
                  {Math.random() > 0.7 && <Skeleton className="h-4 w-24" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
