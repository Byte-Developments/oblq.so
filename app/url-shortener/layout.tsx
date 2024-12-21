import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'URL Shortener',
  description: 'Create short, memorable links for your URLs',
};

export default function URLShortenerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}