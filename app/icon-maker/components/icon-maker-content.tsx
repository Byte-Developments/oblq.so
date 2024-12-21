"use client";

import { useIcon } from "../context/icon-context";
import { IconGrid } from "./icon-grid";
import { ColorPicker } from "./color-picker";
import { IconMakerHeader } from "./icon-maker-header";
import { getValidIcons } from "@/lib/utils/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export function IconMakerContent() {
  const {
    icon,
    setIcon,
    color1,
    setColor1,
    color2,
    setColor2,
    backgroundColor,
    setBackgroundColor,
    activeTab,
    setActiveTab
  } = useIcon();

  const validIcons = getValidIcons();

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
      <IconMakerHeader />

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-8 space-y-6 rounded-xl shadow-lg">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <IconGrid
                icons={validIcons}
                onSelect={setIcon}
                selectedIcon={icon}
              />

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="gradient">Gradient</TabsTrigger>
                  <TabsTrigger value="solid">Solid Color</TabsTrigger>
                </TabsList>

                <TabsContent value="gradient" className="space-y-6">
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
              icon={validIcons[icon]}
              style={iconStyle}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}