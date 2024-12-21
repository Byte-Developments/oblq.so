import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "URL Shortener",
    description: "Create short, memorable links for your URLs",
    href: "/url-shortener",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Code Image Generator",
    description: "Generate beautiful images of your code snippets",
    href: "/code-image",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Icon Maker",
    description: "Create custom gradient icons with Font Awesome",
    href: "/icon-maker",
    gradient: "from-red-500 to-orange-500",
  },
  {
    title: "Pastebin",
    description: "Share code snippets with optional expiration",
    href: "/pastebin",
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] space-y-12">
      <div className="text-center space-y-4 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 animate-gradient">
          Modern Web Utilities
        </h1>
        <p className="text-xl text-muted-foreground">
          A collection of modern web utilities to enhance your development workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-4">
        {features.map((feature) => (
          <Link key={feature.title} href={feature.href}>
            <Card className="p-6 h-full transition-all duration-200 hover:scale-105 gradient-border">
              <div className={`h-24 rounded-lg bg-gradient-to-r ${feature.gradient} mb-4`} />
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          </Link>
        ))}
      </div>

      <Link
        href="/url-shortener"
        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Get Started <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  );
}