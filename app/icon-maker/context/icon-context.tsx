"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import { createSvgString } from "@/lib/utils/svg";
import { getIconPathData, isValidIcon, getValidIcons } from "@/lib/utils/icons";

interface IconContextType {
  icon: string;
  setIcon: (icon: string) => void;
  color1: string;
  setColor1: (color: string) => void;
  color2: string;
  setColor2: (color: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleCopySvg: () => Promise<void>;
}

const IconContext = createContext<IconContextType | undefined>(undefined);

export function IconProvider({ children }: { children: ReactNode }) {
  const [icon, setIcon] = useState("heart");
  const [color1, setColor1] = useState("#FF0080");
  const [color2, setColor2] = useState("#7928CA");
  const [backgroundColor, setBackgroundColor] = useState("#FF0080");
  const [activeTab, setActiveTab] = useState("gradient");

  const handleCopySvg = async () => {
    try {
      if (!isValidIcon(icon)) {
        throw new Error("Invalid icon selected");
      }

      const validIcons = getValidIcons();
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
  };

  return (
    <IconContext.Provider value={{
      icon,
      setIcon,
      color1,
      setColor1,
      color2,
      setColor2,
      backgroundColor,
      setBackgroundColor,
      activeTab,
      setActiveTab,
      handleCopySvg
    }}>
      {children}
    </IconContext.Provider>
  );
}

export function useIcon() {
  const context = useContext(IconContext);
  if (context === undefined) {
    throw new Error("useIcon must be used within an IconProvider");
  }
  return context;
}