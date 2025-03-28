import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7059', // A backend URL-je
        changeOrigin: true, // A proxy átirányítja az origin-t a backend URL-jére
        secure: false, // Ha nem HTTPS-t használsz a backend-en, állítsd false-ra
      },
    },
  },
});
