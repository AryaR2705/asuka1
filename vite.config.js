import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copy } from 'vite-plugin-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        { src: 'src/images', dest: 'dist/images' },
        { src: 'src/n', dest: 'dist/n' },
      ],
    }),
  ],
});

console.log('Copying images and n directory...');
