import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,   // allows using expect without importing
    setupFiles: ['./src/setupTests.js'], // or wherever you put jest-dom import
  }
})
