import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Tell Vite to serve binary 3D model files as static assets
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.obj', '**/*.fbx'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    watch: {
      // Exclude large binary/3D asset files from file watcher (not from serving)
      ignored: [
        '**/public/**/*.obj',
        '**/public/**/*.c4d',
        '**/public/**/*.glb',
        '**/public/**/*.gltf',
        '**/public/**/*.fbx',
        '**/project/**/*.png',
        '**/project/**/*.jpg',
        '**/project/**/*.jpeg',
        '**/project/**/*.webp',
      ],
    },
  },
})
