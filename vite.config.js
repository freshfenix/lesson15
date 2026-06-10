import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  // Ensure the output directory is emptied before each build
  // so old hashed assets don't accumulate in `docs`.
  plugins: [tailwindcss()],
})
