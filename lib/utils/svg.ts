export function createSvgString(icon: string, style: { background: string }): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="fill: url(#gradient);">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${style.background.split(',')[0].split('(')[1]}" />
          <stop offset="100%" style="stop-color:${style.background.split(',')[1].split(')')[0]}" />
        </linearGradient>
      </defs>
      <path d="${icon}" />
    </svg>`;
  }