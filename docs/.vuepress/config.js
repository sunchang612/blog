module.exports = {
  title: '阿畅 blog',
  description: '阿畅的博客',
  // theme: 'awesome',
  base: '/blog/',
  plugins: [
    'vuepress-plugin-nprogress',
    [
      'vuepress-plugin-container',
      {
        type: 'tip',
        defaultTitle: {
          '/': '示例',
          '/zh/': '示例',
        },
      },
    ],
  ],
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
        text: 'js 算法与数据结构',
        link: '/js-algorithm/'
      },
      {
        text: 'react',
        link: '/react/'
      },
      {
        text: 'Vue',
        items: [
          { text: 'Vue 原理', link: '/Vue/principle/' },
          { text: 'Vue 项目实战', link: '/Vue/combat/' }
        ]
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
      '/react/': [
        {
          title: '学习 react',
          collapsable: false,
          children: [
            '/react/',
            '/react/axios.md'
          ]
        },
      ],
      '/Vue/': [
        {
          title: 'Vue',
          collapsable: false,
          children: [
            '/Vue/combat/',
          ]
        },
      ],
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
          title: 'JavaScript 算法与数据结构',
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
            '/js-algorithm/sortArrayByParity.md',
            '/js-algorithm/maximumGap.md',
            '/js-algorithm/findKthLargest.md',
            '/js-algorithm/firstMissingPositive.md',
            '/js-algorithm/restoreIpAddresses.md',
            '/js-algorithm/findSubstring.md',
            '/js-algorithm/calPoints.md',
            '/js-algorithm/maximalRectangle.md',
            '/js-algorithm/CircularQueue.md',
          ]
        }
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