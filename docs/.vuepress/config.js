module.exports = {
  title: '阿畅的博客',
  description: 'JavaScript，Vue，React，Webpack，HTML，CSS等技术分享',
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
  repo: 'https://github.com/sunchang612',
  repoLabel: 'Github',
  themeConfig: {
    nav: [
      {text: '首页', link: '/'},
      {
        text: 'JavaScript',
        items: [
          { text: 'JavaScript', link: '/javascript/basics/' },
          { text: 'js 面试题', link: '/javascript/interview/' },
          { text: 'js 数据结构与算法', link: '/javascript/algorithm/' },
        ]
      },
      {
        text: 'js 算法与数据结构',
        link: '/js-algorithm/'
      },
      {
        text: 'react',
        items: [
          { text: 'react', link: '/react/combat/' },
          { text: 'taro', link: '/react/taro/'}
        ]
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
        text: 'TypeScript',
        link: '/typescript/'
      },
      {   
        text: 'nodejs',
        items: [
          { text: 'sequelize', link: '/node/sequelize/' }
        ]
      },
      {   
        text: 'CSS+HTML',
        link: '/css-html/'
      },
      {   
        text: 'http',
        link: '/http/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/sunchang1996/blog'
      }
    ],
    sidebar: {
      '/javascript/': [
        {
          title: 'JavaScript 基础',
          collapsable: false,
          children: [
            '/javascript/basics/',
            '/javascript/basics/Hoisting.md',
            '/javascript/basics/Factory.md',
            '/javascript/basics/constructor.md',
            '/javascript/basics/event-loop.md',
            '/javascript/basics/async.md',
            '/javascript/basics/promise.md',
            '/javascript/basics/bind-call-apply.md',
            '/javascript/basics/copy.md',
          ]
        },
        {
          title: 'JavaScript 面试题',
          collapsable: false,
          children: [
            '/javascript/interview/',
            '/javascript/interview/real-code.md'
          ]
        },
        {
          title: 'JS 数据结构与算法',
          collapsable: false,
          children: [
            '/javascript/algorithm/',
            '/javascript/algorithm/dui.md',
            '/javascript/algorithm/duilie.md',
            '/javascript/algorithm/dongtai.md',
            '/javascript/algorithm/fener.md',
            '/javascript/algorithm/greed.md',
            '/javascript/algorithm/huisu.md',
            '/javascript/algorithm/lianbiao.md',
            '/javascript/algorithm/map.md',
            '/javascript/algorithm/set.md',
            '/javascript/algorithm/tree.md',
            '/javascript/algorithm/tu.md',
            '/javascript/algorithm/zhan.md',
          ]
        }
      ],
      '/react/': [
        {
          title: 'react 基础与原理',
          collapsable: true,
          children: [
            '/react/combat/',
            '/react/combat/axios.md',
            '/react/combat/hooks.md',
            '/react/combat/vdom.md'
          ]
        },
        {
          title: 'react 面试题',
          collapsable: true,
          children: [
            '/react/interview/',
            '/react/interview/react-jsx.md',
            '/react/interview/question.md',
            '/react/interview/question1.md',
            '/react/interview/question2.md',
            '/react/interview/question3.md',
            '/react/interview/question4.md',
            '/react/interview/question5.md',
            '/react/interview/question6.md',
            '/react/interview/question7.md',
            '/react/interview/question8.md',
            '/react/interview/question9.md',
          ]
        },
        {
          title: 'taro',
          collapsable: false,
          children: [
            '/react/taro/',
            '/react/taro/install',
            '/react/taro/qrcode',
            '/react/taro/params-code',
          ]
        }
      ],
      '/Vue/': [
        {
          title: 'Vue 实战',
          collapsable: false,
          children: [
            '/Vue/combat/',
          ]
        },
        {
          title: 'Vue 原理',
          collapsable: false,
          children: [
            '/Vue/principle/',
            '/Vue/principle/defineproperty', 
            '/Vue/principle/proxy',
            '/Vue/principle/observer',
            '/Vue/principle/subscribe',
            '/Vue/principle/vnode',
          ]
        },
        {
          title: 'Vue 面试题',
          collapsable: true,
          children: [
            '/Vue/question/'
          ]
        }
      ],
      '/webpack/': [
        {
          title: '学习 webpack',
          collapsable: true,
          children: [
            '/webpack/',
            '/webpack/basics',
            '/webpack/advance',
            '/webpack/dynamic-import',
            '/webpack/component',
            '/webpack/optimize',
            '/webpack/loader',
            '/webpack/plugins',
          ]
        }
      ],
      '/typescript/': [
        {
          title: 'TypeScript',
          children: [
            '/typescript/'
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
      ],
      '/css-html/': [
        {
          title: 'CSS + HTML',
          collapsable: false,
          children: [
            '/css-html/',
            '/css-html/html.md',
          ]
        }
      ],
      '/http/': [
        {
          title: 'http',
          collapsable: false,
          children: [
            '/http/'
          ]
        }
      ]
    }
  }
}