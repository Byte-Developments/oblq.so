"use client";

import { Link2, Code2, Palette, Download, Copy, Plus, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const utilities = [
  { 
    name: "URL Shortener",
    href: "/url-shortener",
    icon: Link2,
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    action: { icon: Plus, label: "Create URL" }
  },
  { 
    name: "Code Image",
    href: "/code-image",
    icon: Code2,
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
    action: { icon: Download, label: "Export Image" }
  },
  { 
    name: "Icon Maker",
    href: "/icon-maker",
    icon: Palette,
    color: "text-red-500",
    gradient: "from-red-500 to-orange-500",
    action: { icon: Copy, label: "Copy SVG" }
  },
];

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const currentUtil = utilities.find(util => util.href === pathname);

  return (
    <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              Modern Utilities
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gradient-border">Select Utility</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {utilities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 w-full",
                          pathname === item.href && "bg-accent"
                        )}
                      >
                        <Icon className={cn("h-4 w-4", item.color)} />
                        <span>{item.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center gap-4">
            {currentUtil?.action && (
              <Button className={cn(
                "gap-2 bg-gradient-to-r",
                currentUtil.gradient,
                "text-white hover:opacity-90"
              )}>
                <currentUtil.action.icon className="h-4 w-4" />
                {currentUtil.action.label}
              </Button>
            )}
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}