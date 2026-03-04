import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ReinSincere-branding/', // ← ensures paths work on GitHub Pages
  plugins: [react()],
})