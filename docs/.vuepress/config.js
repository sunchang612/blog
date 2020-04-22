module.exports = {
  title: '阿畅 blog',
  description: '阿畅的博客',
  // theme: 'awesome',
  base: '/blog/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    smoothScroll: true
  },
  repo: 'https://sunchang1996.github.io/blog',
  repoLabel: 'Github',
  themeConfig: {
    nav: [
      {text: '首页', link: '/'},
      // {
      //   text: 'JavaScript',
      //   link: '/javascript/'
      // },
      {
        text: 'js 算法',
        link: '/js-algorithm/'
      },
      {
        text: 'react',
        link: '/react/'
      },
      {
        text: 'webpack',
        link: '/webpack/'
      },
      {
        text: 'nodejs',
        items: [
          { text: 'sequelize', link: '/node/sequelize/' }
        ]
      },
      {
        text: 'GitHub',
        link: 'https://github.com/sunchang1996/blog'
      }
    ],
    sidebar: {
      // '/javascript/': [
      //   {
      //     title: 'JavaScript 算法',
      //     collapsable: false,
      //     children: [
      //       '/javascript/',
      //       '/javascript/HTML'
      //     ]
      //   },
      // ],
      '/webpack/': [
        {
          title: '学习 webpack',
          collapsable: false,
          children: [
            '/webpack/',
          ]
        }
      ],
      '/js-algorithm/': [
        {
          title: 'JavaScript 算法',
          collapsable: false,
          children: [
            '/js-algorithm/',
            '/js-algorithm/str-reverse.md',
            '/js-algorithm/flower.md',
            '/js-algorithm/gray-code.md',
            '/js-algorithm/regex-str.md',
            '/js-algorithm/bubbling.md',
            '/js-algorithm/selectionSort.md',
            '/js-algorithm/isMatch.md',
            '/js-algorithm/letterCombinations.md',
            '/js-algorithm/countBinarySubstrings.md',
          ]
        },
      ],
      '/node/sequelize/': [
        {
          title: 'Sequesize',
          collapsable: false,
          children: [
            '/node/sequelize/'
          ]
        }
      ]
    }
  }
}