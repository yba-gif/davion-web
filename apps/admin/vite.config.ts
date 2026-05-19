import { vitePlugin as kottster } from '@kottster/react'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  root: './app',
  server: {
    port: 5480,
    open: false,
  },
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mantine: ['@mantine/core', '@mantine/hooks'],
          charts: ['@mantine/charts'],
          kottster: ['@kottster/react']
        }
      }
    }
  },
  plugins: [
    kottster(),
    react(),
  ],
  resolve: {
    alias: {
      '@': '/app',
    },
  },
  define: {
    // Prevent Node.js globals from being used in browser code
    global: 'globalThis',
  },
  optimizeDeps: {
    // Exclude Node.js specific modules from optimization
    exclude: ['minio', 'knex', 'pg']
  }
})
