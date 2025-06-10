import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/jewlery/',  // <-- add this line
  plugins: [react()],
});
