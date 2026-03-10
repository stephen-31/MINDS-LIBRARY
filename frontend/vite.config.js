// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This redirects any request starting with /api to your backend
      '/api': {
        target: 'https://minds-library-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})