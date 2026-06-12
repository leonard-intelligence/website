import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
    base: '/',
    server: { port: 5174 },
    plugins: [
        react(),
        tailwindcss(),
        viteCompression({ algorithm: 'gzip' }),
        viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    helmet: ['react-helmet-async'],
                    ui: ['radix-ui', 'lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge'],
                    fonts: ['@fontsource-variable/jetbrains-mono', '@fontsource/jacquard-24'],
                },
            },
        },
    },
});
