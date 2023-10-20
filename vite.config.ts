import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Markdown from 'unplugin-vue-markdown/vite'
import MarkdownItContainer from 'markdown-it-container'
import MarkdownItForInline from 'markdown-it-for-inline'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // <-- allows Vue to compile Markdown files
    }),
    Markdown({
      markdownItOptions: {
        breaks: true,
        linkify: true,
      },
      markdownItSetup(md) {
        md.use(MarkdownItContainer, 'spoiler', {

          validate(params) {
            return params.trim().match(/^spoiler\s+(.*)$/);
          },

          render(tokens, idx) {
            const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

            if (tokens[idx].nesting === 1) {
              // opening tag
              return `<details><summary>${md.utils.escapeHtml(m[1])}</summary>\n`;

            }
            // closing tag
            return '</details>\n';

          }
        })
        md.use(MarkdownItForInline, 'url_new_win',
          'link_open',
          function (tokens, idx) {
            console.log(tokens[idx])
            const aIndex = tokens[idx].attrIndex('target');
            console.log(aIndex)

            if (aIndex < 0) {
              tokens[idx].attrPush(['target', '_blank']);
            } else {
              tokens[idx].attrs[aIndex][1] = '_blank';
            }
          }
        )
      },
    }),
    vueJsx(),
    vueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    eslintPlugin({
      cache: false // 禁用eslint缓存
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      // 压缩
      svgoOptions: true,
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "./src/styles/index.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@docs': resolve(__dirname, 'docs'),
    }
  },
  server: {
    host: '0.0.0.0',
  }
})
