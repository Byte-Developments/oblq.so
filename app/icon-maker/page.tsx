"use client";

import { IconProvider } from "./context/icon-context";
import { IconMakerContent } from "./components/icon-maker-content";

export default function IconMaker() {
  return (
    <IconProvider>
      <IconMakerContent />
    </IconProvider>
  );
}