"use client";

import { Editor } from "@monaco-editor/react";
import { Label } from "@/components/ui/label";

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ code, language, onChange }: CodeEditorProps) {
  return (
    <div className="space-y-2">
      <Label>Code</Label>
      <div className="border rounded-md overflow-hidden">
        <Editor
          height="300px"
          language={language.toLowerCase()}
          value={code}
          onChange={(value) => onChange(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            padding: { top: 16, bottom: 16 },
            fontFamily: "monospace",
            renderLineHighlight: "all",
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}