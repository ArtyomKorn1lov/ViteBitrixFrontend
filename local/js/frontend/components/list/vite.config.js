import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

// При сборке под windows, убираем лишние переменные среды
delete process.env['CommonProgramFiles(x86)'];
delete process.env['ProgramFiles(x86)'];

export default defineConfig({
  plugins: [
    vue(),
    ElementPlus(),
    // Плагин для считывания env файлов на vite
    EnvironmentPlugin('all', {prefix: ''}),
    ViteMinifyPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'list',
      fileName: '[name].bundle'
    },
    rollupOptions: {
      external: ['MyLibrary']
    }
  }
});
