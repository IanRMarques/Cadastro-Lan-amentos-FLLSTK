import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from 'tailwindcss'; // Importa o TailwindCSS
import autoprefixer from 'autoprefixer'; // Importa o Autoprefixer

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],  // Configuração do PostCSS com TailwindCSS e Autoprefixer
    },
  },
});
