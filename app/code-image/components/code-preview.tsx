"use client";

import { Editor } from "@monaco-editor/react";

interface CodePreviewProps {
  code: string;
  language: string;
  background: string;
  foreground: string;
}

export function CodePreview({ code, language, background, foreground }: CodePreviewProps) {
  return (
    <div 
      className="rounded-lg overflow-hidden"
      style={{ 
        backgroundColor: background,
      }}
    >
      <Editor
        height="400px"
        language={language.toLowerCase()}
        value={code}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          wordWrap: "on",
          padding: { top: 16, bottom: 16 },
          fontFamily: "monospace",
          renderLineHighlight: "none",
          overviewRulerLanes: 0,
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
          },
          domReadOnly: true,
        }}
      />
    </div>
  );
}