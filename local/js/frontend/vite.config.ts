import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Entrypoint from './entrypoint.config.ts';

export default defineConfig(({ mode }) => {
  const isDev: boolean = mode === 'development';
  return {
    define: {
      __VUE_PROD_DEVTOOLS__: isDev,
    },
    build: {
      watch: isDev ? { include: 'src/**' } : null,
      rollupOptions: {
        input: Entrypoint,
        external: ['element-plus', 'vue', 'axios'],
        output: {
          entryFileNames: 'js/entry-[name].[hash].js',
          chunkFileNames: 'js/chunk-[name].[hash].js',
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          manualChunks: (id: string, _) => {
            if (id.includes('node_modules')) {
              return 'node-modules';
            }
          },
          paths: {
            'element-plus': '/local/js/ui/dist/element-plus.bundle.js',
            axios: '/local/js/ui/dist/axios.bundle.js',
            vue: '/local/js/ui/dist/vue.bundle.js',
            'vue-i18n': '/local/js/ui/dist/vue-i18n.bundle.js',
            pinia: '/local/js/ui/dist/pinia.bundle.js',
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
    plugins: [vue()],
  };
});
