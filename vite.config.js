import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
console.log(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@src': path.join(__dirname, './src'),
    },
  },
  plugins: [react()],
});
