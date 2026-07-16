import { defineConfig } from 'vite';

export default defineConfig({
  base: '/xinovasu-landing/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        docs: 'docs.html'
      }
    }
  }
});
