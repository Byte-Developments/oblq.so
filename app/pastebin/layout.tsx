import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pastebin',
  description: 'Share code snippets with optional expiration',
};

export default function PastebinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}