import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { resolve } from 'path';
// @ts-ignore
import hotFilePlugin from 'vite-hotfile-plugin';
import ElementPlus from 'unplugin-element-plus/vite';
import Entrypoint from './entrypoint.config.ts';

export default defineConfig(({ mode }) => {
  const isDev: boolean = mode === 'development';
  return {
    define: {
      __VUE_PROD_DEVTOOLS__: isDev,
    },
    build: {
      manifest: true,
      rollupOptions: {
        input: Entrypoint,
        output: {
          entryFileNames: 'js/entry-[name].[hash].js',
          chunkFileNames: 'js/chunk-[name].[hash].js',
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
      svgLoader(),
      ElementPlus({
        format: 'esm',
      }),
      hotFilePlugin({
        publicDirectory: '',
        hotFileName: 'vite.hot',
        logging: false,
      }),
    ],
    server: {
      cors: true,
      origin: 'http://localhost:5173',
      hmr: {
        host: 'localhost',
      },
    },
  };
});
