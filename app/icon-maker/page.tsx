"use client";

import { useState, useCallback } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { createSvgString } from "@/lib/utils/svg";
import { IconGrid } from "./components/icon-grid";
import { ColorPicker } from "./components/color-picker";
import { getValidIcons, isValidIcon, getIconPathData } from "@/lib/utils/icons";
import type { IconName } from "@fortawesome/fontawesome-svg-core";

library.add(fas);

const validIcons = getValidIcons();

const gradientPresets = [
  { from: "#FF0080", to: "#7928CA", name: "Pink to Purple" },
  { from: "#00FF00", to: "#00FFFF", name: "Green to Cyan" },
  { from: "#FF0000", to: "#FFA500", name: "Red to Orange" },
  { from: "#4158D0", to: "#C850C0", name: "Blue to Pink" },
  { from: "#0093E9", to: "#80D0C7", name: "Blue to Turquoise" },
  { from: "#8EC5FC", to: "#E0C3FC", name: "Light Blue to Lavender" },
  { from: "#FBAB7E", to: "#F7CE68", name: "Orange to Yellow" },
  { from: "#85FFBD", to: "#FFFB7D", name: "Mint to Yellow" },
];

export default function IconMaker() {
  const [icon, setIcon] = useState<IconName>("heart");
  const [color1, setColor1] = useState("#FF0080");
  const [color2, setColor2] = useState("#7928CA");
  const [backgroundColor, setBackgroundColor] = useState("#FF0080");
  const [activeTab, setActiveTab] = useState("gradient");

  const handleCopySvg = useCallback(async () => {
    try {
      if (!isValidIcon(icon)) {
        throw new Error("Invalid icon selected");
      }

      const iconDef = validIcons[icon];
      if (!iconDef) {
        throw new Error("Icon not found");
      }

      const pathData = getIconPathData(iconDef);
      const svgString = createSvgString(pathData, {
        background: activeTab === "gradient" 
          ? `${color1}, ${color2}`
          : `${backgroundColor}, ${backgroundColor}`
      });
      
      await navigator.clipboard.writeText(svgString);
      toast.success("SVG copied to clipboard!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy SVG");
    }
  }, [icon, color1, color2, backgroundColor, activeTab]);

  // Make handleCopySvg available globally
  (window as any).handleCopySvg = handleCopySvg;

  const iconStyle = {
    background: activeTab === "gradient" 
      ? `linear-gradient(45deg, ${color1}, ${color2})`
      : backgroundColor,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "8rem",
    padding: "2rem",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 page-transition">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Icon Maker</h1>
        <p className="text-muted-foreground">
          Create beautiful gradient icons using Font Awesome.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-8 space-y-6 rounded-xl shadow-lg">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <IconGrid
                icons={validIcons}
                onSelect={(name) => setIcon(name as IconName)}
                selectedIcon={icon}
              />

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="gradient">Gradient</TabsTrigger>
                  <TabsTrigger value="solid">Solid Color</TabsTrigger>
                </TabsList>

                <TabsContent value="gradient" className="space-y-6">
                  <div className="grid gap-4">
                    <ColorPicker
                      label="Color 1"
                      color={color1}
                      onChange={setColor1}
                    />
                    <ColorPicker
                      label="Color 2"
                      color={color2}
                      onChange={setColor2}
                    />
                  </div>

                  <div>
                    <Label>Gradient Presets</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {gradientPresets.map((preset, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-16 relative overflow-hidden group"
                          style={{
                            background: `linear-gradient(45deg, ${preset.from}, ${preset.to})`,
                          }}
                          onClick={() => {
                            setColor1(preset.from);
                            setColor2(preset.to);
                          }}
                        >
                          <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                            {preset.name}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="solid">
                  <ColorPicker
                    label="Background Color"
                    color={backgroundColor}
                    onChange={setBackgroundColor}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </Card>

        <Card className="icon-preview flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <FontAwesomeIcon
              icon={["fas", icon as IconName]}
              style={iconStyle}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}