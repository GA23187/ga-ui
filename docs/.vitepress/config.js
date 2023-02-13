import { defineConfig } from 'vitepress'
import { demoBlockPlugin } from 'vitepress-theme-demoblock'

export default defineConfig({
  base: '/ga-ui/',
  title: 'ga-ui文档',
  layout: 'home',
  themeConfig: {
    nav: getNav(),
    socialLinks: [{ icon: 'github', link: 'https://github.com/ga23187/ga-ui' }],
    sidebar: getSidebar(),
  },
  markdown: {
    config: (md) => {
      md.use(demoBlockPlugin)
    },
  },
})

function getNav() {
  return [
    { text: '指南', link: '/guide/' },
    { text: '组件', link: '/components/button' },
  ]
}

function getSidebar() {
  return {
    '/guide/': [
      {
        text: '指南',
        items: [
          { text: '介绍', link: '/guide/' }, // /guide/index.md
          { text: '快速上手', link: '/guide/install' }, // /guide/one.md
        ],
      },
    ],
    '/components/': [
      {
        text: '基本组件',
        items: [{ text: 'Button 按钮', link: '/components/button' }],
      },
    ],
  }
}
