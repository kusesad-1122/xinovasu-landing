import { defineConfig } from 'vite';

export default defineConfig({
  base: '/xinovasu-landing/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        docs: 'docs.html'
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
});
