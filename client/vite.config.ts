import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env: Record<string, string> = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env,
      global: {},
    },
    plugins: [react(), TanStackRouterVite()],
  }
});
