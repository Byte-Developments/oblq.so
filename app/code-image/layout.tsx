import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Code Image Generator',
  description: 'Create beautiful images of your code snippets',
};

export default function CodeImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}