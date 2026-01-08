import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(({mode}) => {
  const isDev = mode === 'development';
  return {
    optimizeDeps: {
      include: ['vue', 'element-plus'],
    },
    build: {
      rollupOptions: {
        output: {
          esModule: true,
        },
        cache: true,
      },
      lib: {
        entry: resolve(__dirname, 'src/main.js'),
        name: 'frontend-ui',
        formats: ['es'],
        fileName: 'frontend-ui.bundle',
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
