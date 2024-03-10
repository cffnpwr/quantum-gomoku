import devServer, { defaultOptions } from "@hono/vite-dev-server";
import { vitePlugin as remix } from "@remix-run/dev";
import esbuild from "esbuild";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    devServer({
      injectClientScript: false,
      entry: "server/index.ts",
      exclude: [/^\/(app)\/.+/, ...defaultOptions.exclude],
    }),
    tsconfigPaths(),
    remix({
      serverBuildFile: "remix.js",
      buildEnd: async () => {
        await esbuild
          .build({
            outfile: "build/server/index.js",
            entryPoints: ["server/index.ts"],
            external: ["./build/server/*"],
            platform: "node",
            format: "esm",
            bundle: true,
            logLevel: "info",
          })
          .catch((error: unknown) => {
            console.error(error);
            process.exit(1);
          });
      },
    }),
  ],
});
