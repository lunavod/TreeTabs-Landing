// @ts-check
import { transformSync } from "@babel/core";
import babelPlugin from "babel-plugin-react-css-modules";

export default function reactCssModulePlugin(opt) {
  return {
    name: "vite-plugin-react-css-module",
    enforce: "pre",
    transform(code, id) {
      // modified from https://github.com/vitejs/vite/blob/main/packages/plugin-react-refresh/index.js
      const excludeFiles = opt.excludeFiles ?? [];

      if (
        !/\.(t|j)sx?$/.test(id) ||
        id.includes("node_modules") ||
        excludeFiles.filter((pattern) => id.match(pattern)).length
      ) {
        return;
      }

      // plain js/ts files can't use React without importing it, so skip
      // them whenever possible
      if (!id.endsWith("x") && !code.includes("react")) {
        return;
      }

      const parserPlugins = ["jsx", "importMeta"];
      if (/\.tsx?$/.test(id)) {
        // it's a typescript file
        // TODO: maybe we need to read tsconfig to determine parser plugins to
        // enable here, but allowing decorators by default since it's very
        // commonly used with TS.
        parserPlugins.push("typescript", "decorators-legacy");
      }

      const transformOpts = { ...opt };
      delete transformOpts.excludeFiles;

      const isReasonReact = id.endsWith(".bs.js");
      const result = transformSync(code, {
        babelrc: false,
        configFile: false,
        filename: id,
        parserOpts: {
          sourceType: "module",
          allowAwaitOutsideFunction: true,
          plugins: parserPlugins,
        },
        plugins: [
          [
            babelPlugin,
            // eslint-disable-next-line no-undef
            {
              autoResolveMultipleImports: true,
              exclude: "node_modules",
              ...transformOpts,
            },
          ],
        ],
        ast: !isReasonReact,
        sourceMaps: true,
        sourceFileName: id,
      });
      return {
        code: result.code,
        map: result.map,
      };
    },
  };
}
