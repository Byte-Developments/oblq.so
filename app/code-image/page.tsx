"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CODE_LANGUAGES } from "@/lib/constants";
import { ColorPicker } from "./components/color-picker";
import { CodeEditor } from "./components/code-editor";
import { CodePreview } from "./components/code-preview";
import dynamic from "next/dynamic";

import * as htmlToImage from "html-to-image";

export default function CodeImage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [background, setBackground] = useState("#1a1a1a");
  const [foreground, setForeground] = useState("#ffffff");

  const handleExport = async () => {
    const element = document.getElementById("code-preview");
    if (!element) return;

    try {
      const dataUrl = await htmlToImage.toPng(element);
      const link = document.createElement("a");
      link.download = `code-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Image exported successfully!");
    } catch (error) {
      toast.error("Failed to export image");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 page-transition">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Code Image Generator</h1>
        <p className="text-muted-foreground">
          Create beautiful images of your code snippets.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6 space-y-6">
          <div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {CODE_LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ColorPicker
            label="Background Color"
            color={background}
            onChange={setBackground}
          />

          <ColorPicker
            label="Text Color"
            color={foreground}
            onChange={setForeground}
          />

          <CodeEditor
            code={code}
            language={language}
            onChange={setCode}
          />

          <Button onClick={handleExport} className="w-full">
            Export Image
          </Button>
        </Card>

        <Card id="code-preview">
          <CodePreview
            code={code}
            language={language}
            background={background}
            foreground={foreground}
          />
        </Card>
      </div>
    </div>
  );
}