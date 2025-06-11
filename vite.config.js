// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/jeweleryStore/',  // ✅ MATCHES your repo name exactly!
  plugins: [react()],
});
