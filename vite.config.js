import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Nếu bạn dùng React, nếu không thì xóa dòng này

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Nếu bạn dùng React, nếu không thì để plugins: []

  base: '/for_my_crush/'
})