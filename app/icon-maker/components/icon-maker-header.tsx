"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useIcon } from "../context/icon-context";
import { cn } from "@/lib/utils";

export function IconMakerHeader() {
  const { handleCopySvg } = useIcon();

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Icon Maker</h1>
        <p className="text-muted-foreground">
          Create beautiful gradient icons using Font Awesome.
        </p>
      </div>
      <Button 
        className={cn(
          "gap-2 bg-gradient-to-r from-red-500 to-orange-500",
          "text-white hover:opacity-90"
        )}
        onClick={handleCopySvg}
      >
        <Copy className="h-4 w-4" />
        Copy SVG
      </Button>
    </div>
  );
}