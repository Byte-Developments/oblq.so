"use client";

import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PASTE_LANGUAGES, EXPIRY_OPTIONS } from "@/lib/constants";

export default function Pastebin() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("plaintext");
  const [expiry, setExpiry] = useState("never"); // Changed default value
  const [burnAfterRead, setBurnAfterRead] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const calculateExpiryDate = (value: string) => {
    if (value === "never") return undefined;
    
    const now = new Date();
    const [amount, unit] = value.match(/(\d+)([mhd])/)?.slice(1) || [];
    
    if (!amount || !unit) return undefined;
    
    switch (unit) {
      case 'm': return new Date(now.getTime() + parseInt(amount) * 60000);
      case 'h': return new Date(now.getTime() + parseInt(amount) * 3600000);
      case 'd': return new Date(now.getTime() + parseInt(amount) * 86400000);
      default: return undefined;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/pastes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          title,
          language,
          expiresAt: calculateExpiryDate(expiry),
          burnAfterRead,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create paste');
      }

      const data = await response.json();
      toast.success("Paste created successfully!");
      router.push(`/paste/${data.id}`);
    } catch (error) {
      toast.error("Failed to create paste");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 page-transition">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Pastebin</h1>
        <p className="text-muted-foreground">
          Share code snippets with optional expiration.
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Title (Optional)</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your paste"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {PASTE_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Content</Label>
              <div className="mt-2 border rounded-md overflow-hidden">
                <Editor
                  height="400px"
                  language={language}
                  value={content}
                  onChange={(value) => setContent(value || "")}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Expiry</Label>
                <Select value={expiry} onValueChange={setExpiry}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select expiry time" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPIRY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="burn-after-read"
                  checked={burnAfterRead}
                  onCheckedChange={setBurnAfterRead}
                />
                <Label htmlFor="burn-after-read">Burn after read</Label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Paste"}
          </Button>
        </form>
      </Card>
    </div>
  );
}