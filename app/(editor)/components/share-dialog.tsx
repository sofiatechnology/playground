"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function ShareDialog({
  open,
  onOpenChange,
  onShare,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShare: (title: string) => void;
}) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (open) setTitle("");
  }, [open]);

  const submit = () => {
    onShare(title.trim() || "Untitled snippet");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 rounded-2xl border-border/80 bg-card p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Share Snippet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="snippet-title" className="text-sm text-muted-foreground">
            Title
          </Label>
          <Input
            id="snippet-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter snippet title"
            className="h-11 rounded-xl border-border/80 bg-background/60"
            onKeyDown={(event) => {
              if (event.key === "Enter") submit();
            }}
            autoFocus
          />
        </div>
        <DialogFooter className="gap-2 sm:justify-end">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={submit}
            className="rounded-lg bg-[#3b82f6] px-5 text-white hover:bg-[#2563eb]"
          >
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
