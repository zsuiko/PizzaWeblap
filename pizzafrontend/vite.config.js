import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5278', 
        changeOrigin: true, 
        secure: false, // Ha nem HTTPS-t használsz a backend-en, állítsd false-ra
      },
    },
  },
});
