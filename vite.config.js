import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_KEY_1': JSON.stringify(process.env.VITE_KEY_1),
    'process.env.VITE_KEY_2': JSON.stringify(process.env.VITE_KEY_2),
    'process.env.VITE_KEY_3': JSON.stringify(process.env.VITE_KEY_3),
  }
})
