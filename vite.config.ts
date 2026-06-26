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
  configure: (proxy) => {
    proxy.on('proxyReq', (proxyReq) => {
      proxyReq.path = proxyReq.path.replace(/%2B/gi, '+')
    })
  },
},
    },
  },
})