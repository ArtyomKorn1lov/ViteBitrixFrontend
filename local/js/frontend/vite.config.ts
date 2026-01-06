import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite';
import { resolve } from 'path';
import Entrypoint from "./entrypoint.config.ts";

export default defineConfig(({ mode }) => {
    const isDev: boolean = mode === 'development';
    return {
        build: {
            watch: isDev ? {
                include: 'src/**'
            } : null,
            rollupOptions: {
                input: Entrypoint,
                output: {
                    entryFileNames: 'js/entry-[name].[hash].js',
                    chunkFileNames: 'js/chunk-[name].[hash].js',
                    manualChunks: (id: string, _) => {
                        if (id.includes('node_modules')) {
                            return 'node-modules';
                        }
                    },
                    esModule: true,
                },
                cache: true,
            },
            minify: isDev ? false : 'terser',
            cssMinify: !isDev,
            sourcemap: isDev,
            reportCompressedSize: !isDev,
            emptyOutDir: true,
            cssCodeSplit: true,
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, './src/'),
            },
        },
        envPrefix: 'APP_',
        plugins: [
            vue(),
            ElementPlus({
                useSource: true,
                format: 'esm'
            }),
        ],
    };
});
