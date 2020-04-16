module.exports = {
  title: '阿畅 blog',
  description: '阿畅的博客',
  // theme: 'awesome',
  base: '/blog/',
  markdown: {
    lineNumbers: false
  },
  repo: 'https://sunchang1996.github.io/blog',
  repoLabel: 'Github',
  themeConfig: {
    nav: [
      {text: '首页', link: '/'},
      {
        text: 'JavaScript',
        link: '/javascript/'
      },
      {
        text: 'js 算法',
        link: '/js-algorithm/'
      },
      {
        text: 'react',
        link: '/react/'
      }
    ],
    sidebar: {
      '/javascript/': [
        {
          title: 'JavaScript 算法',
          collapsable: false,
          children: [
            '/javascript/',
            '/javascript/HTML'
          ]
        },
      ],
      '/js-algorithm/': [
        {
          title: 'JavaScript 算法',
          collapsable: false,
          children: [
            '/js-algorithm/',
            '/js-algorithm/str-reverse.md'
          ]
        },
      ],
    }
  }
}