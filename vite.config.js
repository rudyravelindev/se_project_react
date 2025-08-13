import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/wtwr/se_project_react/',
  plugins: [react()],
  server: {
    port: 3000,
  },
});
