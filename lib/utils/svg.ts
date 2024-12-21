import { IconPathData } from "@fortawesome/fontawesome-svg-core";

export function createSvgString(iconPath: IconPathData, style: { background: string }): string {
  // Convert the path data to a string if it's an array
  const pathData = Array.isArray(iconPath) ? iconPath.join(" ") : iconPath;
  
  // Extract colors from the background string safely
  const [color1 = "", color2 = ""] = style.background.split(",").map(c => c.trim());
  const startColor = color1.replace(/^#/, "");
  const endColor = color2.replace(/^#/, "") || startColor;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="fill: url(#gradient);">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#${startColor}" />
        <stop offset="100%" style="stop-color:#${endColor}" />
      </linearGradient>
    </defs>
    <path d="${pathData}" />
  </svg>`;
}