import fs from 'fs-extra';
import { resolve } from 'path'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Markdown from 'vite-plugin-react-markdown'
import Shiki from 'markdown-it-shiki'
import anchor from 'markdown-it-anchor'
import TOC from 'markdown-it-table-of-contents'
import Unocss from "unocss/vite";
import { presetAttributify, presetUno, transformerAttributifyJsx, presetIcons } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import Pages from 'vite-plugin-pages';
import matter from 'gray-matter';
import { slugify } from './src/utils';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },
  plugins: [
    react(),
    Pages({
      extensions: ['tsx', 'md'],
      extendRoute(routes) {
        function addMeta(route) {
          const path = resolve(__dirname, route.element.slice(1));
          if (path.includes('posts')) {
            const md = fs.readFileSync(path, 'utf-8');
            const { data } = matter(md);
            route.meta = Object.assign(route.meta || {}, { frontmatter: data });
          }
        }
        if (routes.children) {
          routes.children.forEach(addMeta);
        } else {
          addMeta(routes);
        }
        return routes;
      },
    }),
    Markdown({
      wrapperComponentPath: './src/components/PostWapper',
      wrapperComponent: true,
      markdownItSetup(md) {
        md.use(Shiki, {
          theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
        })
        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3],
          slugify,
        })
      }
    }),
    Unocss({
      presets: [
        presetIcons({
          extraProperties: {
            display: "inline-block",
            height: "1.3em",
            width: "1.3em",
            "vertical-align": "text-bottom",
          },
        }),
        presetAttributify(),
        presetUno(),
        presetWebFonts({
          provider: 'google',
          fonts: {
            sans: 'Inter:400,600,800',
            mono: 'DM Mono',
          },
        }),
      ],
      transformers: [transformerAttributifyJsx()],
    }),
  ],
});
