"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { normalizeUrl, isValidUrl } from "@/lib/utils/url";

export default function URLShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    if (!isValidUrl(url)) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    try {
      const normalizedUrl = normalizeUrl(url);
      const response = await fetch('/api/urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: normalizedUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to create short URL');
      }

      const data = await response.json();
      const baseUrl = window.location.origin;
      setShortUrl(`${baseUrl}/${data.code}`);
      toast.success("URL shortened successfully!");
    } catch (error) {
      toast.error("Failed to create short URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">URL Shortener</h1>
        <p className="text-muted-foreground">
          Create short, memorable links for your URLs.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your URL (e.g., example.com or https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Shorten URL"}
          </Button>
        </form>

        {shortUrl && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <p className="font-medium">Your shortened URL:</p>
            <div className="flex items-center gap-2 mt-2">
              <Input value={shortUrl} readOnly />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(shortUrl);
                  toast.success("Copied to clipboard!");
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}