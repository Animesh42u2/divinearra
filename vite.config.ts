import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/prokerala': {
        target: 'https://api.prokerala.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/prokerala/, ''),
      },
    },
  },
})