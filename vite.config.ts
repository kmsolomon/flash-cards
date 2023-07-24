import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    plugins: [legacy(), react()],
    resolve: {
      alias: {
        // for TypeScript path alias import like : @/x/y/z
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
    },
    // rest of Vite config
  };
});
