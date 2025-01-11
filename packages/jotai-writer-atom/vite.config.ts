import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config
export default defineConfig({
  plugins: [react({
    tsDecorators: true,
  })],
  server: {
    host: '127.0.0.1',
    port: 3000,
  }
})
