import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Entrypoint from './entrypoint.config.ts';

export default defineConfig(({ mode }) => {
  const env: Record<string, string> = loadEnv(mode, process.cwd(), 'APP_');
  const isDev: boolean = mode === 'development';
  return {
    define: {
      __VUE_PROD_DEVTOOLS__: isDev,
    },
    build: {
      watch: isDev ? { include: 'src/**' } : null,
      rollupOptions: {
        input: Entrypoint,
        external: ['element-plus', 'vue', 'axios', 'vue-i18n', 'pinia'],
        output: {
          entryFileNames: 'js/entry-[name].[hash].js',
          chunkFileNames: 'js/chunk-[name].[hash].js',
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              return 'node-modules';
            }
          },
          paths: {
            'element-plus': `../../../${env.APP_PLUGIN_DIR}dist/element-plus.bundle.js`,
            axios: `../../../${env.APP_PLUGIN_DIR}dist/axios.bundle.js`,
            vue: `../../../${env.APP_PLUGIN_DIR}dist/vue.bundle.js`,
            'vue-i18n': `../../../${env.APP_PLUGIN_DIR}dist/vue-i18n.bundle.js`,
            pinia: `../../../${env.APP_PLUGIN_DIR}dist/pinia.bundle.js`,
            'vue-the-mask': `../../../${env.APP_PLUGIN_DIR}dist/vue-the-mask.bundle.js`,
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
