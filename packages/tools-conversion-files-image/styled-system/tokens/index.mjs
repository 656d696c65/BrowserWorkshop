const tokens = {
  "colors.primary": {
    "value": "#00816D",
    "variable": "var(--colors-primary)"
  },
  "colors.neutral": {
    "value": "#0C1821",
    "variable": "var(--colors-neutral)"
  },
  "colors.red": {
    "value": "#F44336",
    "variable": "var(--colors-red)"
  },
  "colors.green": {
    "value": "#4CAF50",
    "variable": "var(--colors-green)"
  },
  "colors.blue": {
    "value": "#2196F3",
    "variable": "var(--colors-blue)"
  },
  "colors.orange": {
    "value": "#FF9800",
    "variable": "var(--colors-orange)"
  },
  "colors.purple": {
    "value": "#9C27B0",
    "variable": "var(--colors-purple)"
  },
  "colors.background": {
    "value": "#FAF9F6",
    "variable": "var(--colors-background)"
  },
  "fonts.body": {
    "value": "system-ui, sans-serif",
    "variable": "var(--fonts-body)"
  },
  "colors.colorPalette": {
    "value": "var(--colors-color-palette)",
    "variable": "var(--colors-color-palette)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar