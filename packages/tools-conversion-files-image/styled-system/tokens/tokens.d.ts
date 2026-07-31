/* eslint-disable */
export type Token = `colors.${ColorToken}` | `fonts.${FontToken}`

export type ColorPalette = "primary" | "neutral" | "red" | "green" | "blue" | "orange" | "purple" | "background"

export type ColorToken = "primary" | "neutral" | "red" | "green" | "blue" | "orange" | "purple" | "background" | "colorPalette"

export type FontToken = "body"

export type Tokens = {
		colors: ColorToken
		fonts: FontToken
} & { [token: string]: never }

export type TokenCategory = "aspectRatios" | "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "cursor" | "shadows" | "spacing" | "radii" | "borders" | "borderWidths" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"