import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/models": {
        target: "http://localhost:8000", // Apunta al servidor PHP
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/models/, "/src/models"), // Reescribe la ruta para apuntar a src/models
      },
    },
  },
});
