import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
import reactCssModule from "./vite-tools/react-css-modules";
import sassDts from "vite-plugin-sass-dts";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

const generateScopedName = "[path]___[name]__[local]";
export default defineConfig({
  plugins: [
    sassDts(),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        typescript: false,
        icon: "1em",
        replaceAttrValues: { "#323232": "currentColor" },
      },
    }),
    react(),
    reactCssModule({
      generateScopedName,
      excludeFiles: [/main\.tsx/],
      filetypes: {
        ".css": {
          syntax: "postcss",
        },
      },
    }),
    VitePWA({
      workbox: {
        globPatterns: ["**/*"],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["**/*"],
      registerType: "autoUpdate",
      manifest: {
        theme_color: "#EF3939",
        background_color: "#EF3939",
        display: "browser",
        scope: "/",
        start_url: "/",
        name: "TreeTabs",
        short_name: "TreeTabs",
        icons: [
          {
            src: "app_icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "app_icons/icon-256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "app_icons/icon-384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "app_icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  css: {
    modules: {
      generateScopedName,
      localsConvention: "camelCase",
    },
  },
});
