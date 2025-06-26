import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base: 'containers/alexislaurent-portfolio_alexis_laurent_3A/', // '/' is the root path for GitHub Pages
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable sourcemaps in production to reduce bundle size
  },
  server: {
    host: true, // Allow external connections
    port: 5173,
    strictPort: false, // Allow port fallback
  },
  define: {
    // Define __DEV__ for development mode detection
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
});