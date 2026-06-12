import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` is set for GitHub Pages project sites (served from /<repo>/).
// Override with VITE_BASE when deploying elsewhere.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE ?? '/polyglot-srs/',
});
