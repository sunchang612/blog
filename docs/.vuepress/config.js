module.exports = {
  title: '阿畅的博客',
  description: 'JavaScript，前端，Vue，react，webpack，HTML，CSS等技术分享',
  // theme: 'awesome',
  head: [
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?831c09097cdcc6b28d4d8b82e7a2603b";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `],
    ["meta", {name: "author", content: "achang"}],
    ["meta", {name: "keywords", content: "前端全栈知识体系， JavaScript， Vue， react， webpack， HTML， CSS，JavaScript算法"}],
  ],
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
      {
        text: 'JavaScript',
        link: '/javascript/'
      },
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
      '/javascript/': [
        {
          title: '重新学习 JavaScript',
          collapsable: false,
          children: [
            '/javascript/',
            '/javascript/Hoisting.md',
            '/javascript/Factory.md',
            '/javascript/constructor.md'
          ]
        }
      ],
      '/react/': [
        {
          title: 'react 基础与原理',
          collapsable: false,
          children: [
            '/react/',
            '/react/axios.md',
            '/react/hooks.md'
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
            '/js-algorithm/leastInterval.md',
            '/js-algorithm/sortList.md',
            '/js-algorithm/spiralOrder.md',
            '/js-algorithm/rotate.md',
            '/js-algorithm/isSymmetric.md',
            '/js-algorithm/heapsort.md',
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