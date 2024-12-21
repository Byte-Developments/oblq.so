"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div>
      <Label>{label}</Label>
      <div className="color-input-group mt-2">
        <div
          className="color-preview"
          style={{ backgroundColor: color }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <Input
          value={color}
          onChange={(e) => onChange(e.target.value)}
          onClick={() => setShowPicker(!showPicker)}
        />
        {showPicker && (
          <div className="color-picker-popover">
            <button
              className="color-picker-close"
              onClick={() => setShowPicker(false)}
            >
              <X size={16} />
            </button>
            <HexColorPicker color={color} onChange={onChange} />
          </div>
        )}
      </div>
    </div>
  );
}