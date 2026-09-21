import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

// Vercel sets VERCEL=1 during builds. Cloudflare/local builds keep the default Workers output.
const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  nitro: isVercel ? { preset: "vercel" } : true,
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: isVercel ? [nitro({ preset: "vercel" })] : [],
    ssr: {
      noExternal: ["@tanstack/react-query", "@tanstack/query-core"],
    },
  },
});

