import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(({mode}) => {
  const isDev = mode === 'development';
  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    optimizeDeps: {
      include: ['element-plus', 'vue', 'axios', 'vue-i18n', 'pinia', 'vue-the-mask'],
    },
    build: {
      rollupOptions: {
        output: {
          exports: 'named',
          esModule: true,
        },
        cache: true,
      },
      lib: {
        entry: {
          'element-plus': resolve(__dirname, 'src/element-plus.js'),
          'vue': resolve(__dirname, 'src/vue.js'),
          'axios': resolve(__dirname, 'src/axios.js'),
          'vue-i18n': resolve(__dirname, 'src/vue-i18n.js'),
          'pinia': resolve(__dirname, 'src/pinia.js'),
          'vue-the-mask': resolve(__dirname, 'src/vue-the-mask.js'),
        },
        name: 'frontend-ui',
        formats: ['es'],
        fileName: '[name].bundle',
        cssFileName: 'styles.bundle',
      },
      minify: isDev ? false : 'terser',
      cssMinify: !isDev,
      sourcemap: isDev,
      reportCompressedSize: !isDev,
      emptyOutDir: true,
      cssCodeSplit: false,
    },
    plugins: [
      vue(),
      ElementPlus({
        useSource: true,
        format: 'esm',
      }),
    ],
  };
})
