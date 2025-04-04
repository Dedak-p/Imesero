import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),],
    server: {
        host: '0.0.0.0',  // Esto hace que Vite escuche en todas las interfaces de red
        port: 5173,        // El puerto en el que escuchará
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                secure: false,  // si usas HTTP
            }
        }
    },
    build: {
        sourcemap: true, // Asegúrate de que esta opción esté habilitada
    },

})
