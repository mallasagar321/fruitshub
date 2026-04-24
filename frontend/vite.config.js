import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [{
          urlPattern: /\/api\/products/,
          handler: 'StaleWhileRevalidate',
          options: { cacheName: 'products-cache' }
        }]
      },
      manifest: {
        name: 'Orange Hub',
        short_name: 'OrangeHub',
        theme_color: '#F97316',
        icons: [{ src: '/icon.png', sizes: '192x192', type: 'image/png' }]
      }
    })
  ]
})