import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  build: {
    // Specify the output directory for the built files
    outDir: 'dist',

    // Specify the base path for the production build
    base: '/',

    // Set to true to generate sourcemaps for production builds
    sourcemap: false,
  },
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
