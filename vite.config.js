import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/fitforge/',   // Change 'fitforge' to your GitHub repo name
})
