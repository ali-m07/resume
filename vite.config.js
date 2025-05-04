import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/resume/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild', // Using esbuild instead of terser
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    },
    sourcemap: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    open: trueًً
  }
})