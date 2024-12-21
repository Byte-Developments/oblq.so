"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface IconGridProps {
  icons: Record<string, IconDefinition>;
  onSelect: (name: string) => void;
  selectedIcon: string;
}

export function IconGrid({ icons, onSelect, selectedIcon }: IconGridProps) {
  const [search, setSearch] = useState("");
  
  const filteredIcons = Object.entries(icons).filter(([name]) => 
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search icons..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ScrollArea className="h-[300px]">
        <div className="grid grid-cols-6 gap-2">
          {filteredIcons.map(([name, icon]) => (
            <Button
              key={name}
              variant={selectedIcon === name ? "default" : "outline"}
              className="aspect-square p-2"
              onClick={() => onSelect(name)}
            >
              <FontAwesomeIcon 
                icon={icon} 
                className="w-4 h-4"
              />
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}