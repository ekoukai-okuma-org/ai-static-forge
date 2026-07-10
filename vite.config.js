import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import fg from 'fast-glob'
import handlebars from 'vite-plugin-handlebars'

const htmlFiles = fg.sync(['*.html', '**/*.html'], {
  ignore: [
    'dist/**',
    'node_modules/**',
    'partials/**',
    'src/**',
  ],
})

const input = Object.fromEntries(
  htmlFiles.map((file) => [
    file.replace(/\.html$/, ''),
    resolve(__dirname, file),
  ])
)

export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    handlebars({
      partialDirectory: resolve(__dirname, './partials'),
      context(pagePath) {
        const clean = pagePath.replace(/^\//, '')
        const depth = clean.split('/').length - 1
        return { root: depth > 0 ? '../'.repeat(depth) : './' }
      },
    }),
  ],
  build: {
    rollupOptions: {
      input,
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
