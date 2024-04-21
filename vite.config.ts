import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   base: 'https://l-k-r-n.github.io/Nebula/',
   resolve: {
      alias: {
         '@': path.resolve(__dirname, 'src'),
      },
   },
});
