import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: "/redux_phone_catalog/",
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
      '@public': path.resolve(__dirname, 'public')
    }
  }
})
