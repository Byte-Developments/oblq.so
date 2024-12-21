import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Icon Maker',
  description: 'Create beautiful gradient icons using Font Awesome',
};

export default function IconMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}