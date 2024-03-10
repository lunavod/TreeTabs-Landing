import { ThemeSettings } from "./themes";

const themePresets: Record<string, ThemeSettings> = {
  dark: {
    alpha: 0.75,
    blur: 10,
    colorAccentBg: "#44454d",
    colorBg: "#2e2f37",
    colorFg: "#d3d9e3",
    colorHighlightBg: "#6590fd",
    colorWindowBg: "#202127",
    contrast: 0,
    radius: 6,
  },
  vivaldi: {
    alpha: 0.92,
    blur: 5,
    colorAccentBg: "#ef3939",
    colorBg: "#f6f6f6",
    colorFg: "#222222",
    colorHighlightBg: "#4c70f0",
    colorWindowBg: "#EDEEF2",
    contrast: 0,
    radius: 4,
  },
  human: {
    alpha: 0.75,
    blur: 10,
    colorAccentBg: "#e95421",
    colorBg: "#41403b",
    colorFg: "#e4e4dc",
    colorHighlightBg: "#ed773d",
    colorWindowBg: "#41403b",
    contrast: 0,
    radius: 0,
  },
  beach: {
    alpha: 0.8,
    blur: 10,
    colorAccentBg: "#29b2a4",
    colorBg: "#f1efea",
    colorFg: "#192419",
    colorHighlightBg: "#e9780e",
    colorWindowBg: "#f1efea",
    contrast: 1,
    radius: 5,
  },
  issuna: {
    alpha: 0.75,
    blur: 0,
    colorAccentBg: "#404040",
    colorBg: "#2f2f2f",
    colorFg: "#dbdbdb",
    colorHighlightBg: "#579c8e",
    colorWindowBg: "#1D1E21",
    contrast: 2,
    radius: 4,
  },
  hotpink: {
    alpha: 0.75,
    blur: 0,
    colorAccentBg: "#b63e62",
    colorBg: "#412d38",
    colorFg: "#f5dbef",
    colorHighlightBg: "#ff368f",
    colorWindowBg: "#412d38",
    contrast: 2,
    radius: 4,
  },
  subtle: {
    alpha: 1,
    blur: 0,
    colorAccentBg: "#cccccc",
    colorBg: "#f6f6f6",
    colorFg: "#333333",
    colorHighlightBg: "#4c70f0",
    colorWindowBg: "#edeef2",
    contrast: 1,
    radius: 4,
  },
  blueprint: {
    alpha: 0.75,
    blur: 0,
    colorAccentBg: "#ffb608",
    colorBg: "#2e3a50",
    colorFg: "#ffffff",
    colorHighlightBg: "#ffb608",
    colorWindowBg: "#2e3a50",
    contrast: 5,
    radius: 0,
  },
  purplerain: {
    alpha: 0.95,
    blur: 10,
    colorAccentBg: "#7F5FEC",
    colorBg: "#f6f6f6",
    colorFg: "#333333",
    colorHighlightBg: "#7F5FEC",
    colorWindowBg: "#7F5FEC",
    contrast: 3,
    radius: 4,
  },
  private: {
    alpha: 1,
    blur: 0,
    colorAccentBg: "#404076",
    colorBg: "#23234f",
    colorFg: "#c0c0f1",
    colorHighlightBg: "#5f79fd",
    colorWindowBg: "",
    contrast: 2,
    radius: 4,
  },
};

export default themePresets;