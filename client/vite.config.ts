import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'lifeforge_achievements',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './index.tsx'
      },
      shared: [
        'react',
        'react-dom',
        {
          shared: {
            version: 'workspace:*',
            generate: false,
            shareScope: 'lifeforge'
          },
          'lifeforge-ui': {
            version: 'workspace:*',
            generate: false,
            shareScope: 'lifeforge'
          },
          'react-i18next': {
            generate: false
          },
          i18next: {
            generate: false
          }
        },
        '@tanstack/react-query'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@server': path.resolve(__dirname, '../../../server/src')
    }
  },
  build: {
    target: 'esnext',
    minify: false
  }
})
