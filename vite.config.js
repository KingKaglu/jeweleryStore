import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  return {
    base: '/jeweleryStore/', 
    plugins: [react()],
  };
});
