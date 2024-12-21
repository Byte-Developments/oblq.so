"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

library.add(fas);

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
  const [icon, setIcon] = useState("heart");
  const [color1, setColor1] = useState("#FF0080");
  const [color2, setColor2] = useState("#7928CA");
  const [showColorPicker1, setShowColorPicker1] = useState(false);
  const [showColorPicker2, setShowColorPicker2] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#FF0080");
  const [activeTab, setActiveTab] = useState("gradient");

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
              <div>
                <Label>Icon Name</Label>
                <Input
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="Enter Font Awesome icon name (e.g., heart)"
                  className="mt-2"
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="gradient">Gradient</TabsTrigger>
                  <TabsTrigger value="solid">Solid Color</TabsTrigger>
                </TabsList>

                <TabsContent value="gradient" className="space-y-6">
                  <div className="grid gap-4">
                    <div>
                      <Label>Color 1</Label>
                      <div className="color-input-group mt-2">
                        <div
                          className="color-preview"
                          style={{ backgroundColor: color1 }}
                          onClick={() => setShowColorPicker1(!showColorPicker1)}
                        />
                        <Input
                          value={color1}
                          onChange={(e) => setColor1(e.target.value)}
                          onClick={() => setShowColorPicker1(!showColorPicker1)}
                        />
                        {showColorPicker1 && (
                          <div className="color-picker-popover">
                            <button
                              className="color-picker-close"
                              onClick={() => setShowColorPicker1(false)}
                            >
                              <X size={16} />
                            </button>
                            <HexColorPicker
                              color={color1}
                              onChange={setColor1}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>Color 2</Label>
                      <div className="color-input-group mt-2">
                        <div
                          className="color-preview"
                          style={{ backgroundColor: color2 }}
                          onClick={() => setShowColorPicker2(!showColorPicker2)}
                        />
                        <Input
                          value={color2}
                          onChange={(e) => setColor2(e.target.value)}
                          onClick={() => setShowColorPicker2(!showColorPicker2)}
                        />
                        {showColorPicker2 && (
                          <div className="color-picker-popover">
                            <button
                              className="color-picker-close"
                              onClick={() => setShowColorPicker2(false)}
                            >
                              <X size={16} />
                            </button>
                            <HexColorPicker
                              color={color2}
                              onChange={setColor2}
                            />
                          </div>
                        )}
                      </div>
                    </div>
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
                  <div className="space-y-4">
                    <Label>Background Color</Label>
                    <div className="color-input-group">
                      <div
                        className="color-preview"
                        style={{ backgroundColor }}
                        onClick={() => setShowColorPicker1(!showColorPicker1)}
                      />
                      <Input
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        placeholder="#000000"
                      />
                      {showColorPicker1 && (
                        <div className="color-picker-popover">
                          <button
                            className="color-picker-close"
                            onClick={() => setShowColorPicker1(false)}
                          >
                            <X size={16} />
                          </button>
                          <HexColorPicker
                            color={backgroundColor}
                            onChange={setBackgroundColor}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </Card>

        <Card className="icon-preview flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <FontAwesomeIcon
              icon={["fas", icon as any]}
              style={iconStyle}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}