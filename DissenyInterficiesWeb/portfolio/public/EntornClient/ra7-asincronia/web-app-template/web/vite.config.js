import {defineConfig} from 'vite';

export default defineConfig({
    base: '/EntornClient/ra7-asincronia/web-app-template/web/dist/',
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                secure: false,
            },
        }
    },
});
