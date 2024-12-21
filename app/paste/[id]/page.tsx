"use client";

import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, ExternalLink } from "lucide-react";

interface Paste {
  id: string;
  content: string;
  title?: string;
  language: string;
  expiresAt?: string;
  burnAfterRead: boolean;
}

export default function PastePage({ params }: { params: { id: string } }) {
  const [paste, setPaste] = useState<Paste | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const response = await fetch(`/api/pastes?id=${params.id}`);
        if (!response.ok) {
          throw new Error('Paste not found or expired');
        }
        const data = await response.json();
        setPaste(data);
      } catch (error) {
        toast.error("Failed to load paste");
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <Card className="p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-[400px] bg-muted rounded"></div>
          </div>
        </Card>
      </div>
    );
  }

  if (!paste) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Paste not found</h1>
          <p className="text-muted-foreground">
            This paste may have expired or been deleted.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 page-transition">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{paste.title || "Untitled Paste"}</h1>
          {paste.burnAfterRead && (
            <p className="text-destructive mt-2">
              This paste will be deleted after viewing
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(paste.content);
              toast.success("Copied to clipboard!");
            }}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              toast.success("URL copied to clipboard!");
            }}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <Editor
          height="600px"
          language={paste.language}
          value={paste.content}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
          }}
        />
      </Card>
    </div>
  );
}