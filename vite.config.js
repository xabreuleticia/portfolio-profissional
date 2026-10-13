import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import wakatimeApi from './vite-plugin-wakatime.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), wakatimeApi()],
})