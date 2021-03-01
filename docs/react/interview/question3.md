# 如何面向组件跨组件通信
- 父与子：父组件包裹子组件，父组件向子组件传递数据。
  - props 传递数据
- 子与父：子组件存在父组件中，子组件需要向父组件传递数据。
  - 回调函数：父组件通过 props 传递给子组件一个函数，子组件调用父组件的函数，并传递参数，还可以使用在 Route render 中
  ```js
    class AxiosPosts extends React.Component {
      state = {
        loading: true,
        data: []
      }

      async componentDidMount() {
        const { data } = await axios.post('/api/posts')
        this.setState({
          data,
          loading: false,
        })
      }
      render() {
        if (this.state.loading) {
          return <Loading />
        }
        return this.props.renderPosts(this.state.data)
      }
    }
    class Home extends React.Component {
      render() {
        <AxiosPosts
          renderPosts=(p => {
            <ul>
              {
                p.map(i => {
                  <li :key={i.id}>
                    <span>{i.title}</span>
                  </li>
                })
              }
            </ul>
          })
        >
        </AxiosPosts>
      }
    }
  ```
  子组件专注业务逻辑，父组件专注渲染结果

  - 实例函数：通过 React.createRef 调用子组件的函数
- 兄弟：两个组件并列存在于父组件中，需要金属数据进行相互传递。
  - 兄弟组件之间的通信，一般依赖于共同的父组件进行中转。

- 无直接关系：两个组件并没有直接的关联关系，处在一棵树中相聚甚远的位置，但需要共享，传递数据。
  - Context
  - 全局变量：但修改全局变量并不会引起 React 组件重新渲染。
  - Redux

### 答题
在跨层级通信中，主要分为一层或多层的情况。

如果只有一层，那么按照 React 的树形结构进行分类的话，主要有以下三种情况：父组件向子组件通信，子组件向父组件通信以及平级的兄弟组件间互相通信。

在父与子的情况下，因为 React 的设计实际上就是传递 Props 即可。那么场景体现在容器组件与展示组件之间，通过 Props 传递 state，让展示组件受控。

在子与父的情况下，有两种方式，分别是回调函数与实例函数。回调函数，比如输入框向父级组件返回输入内容，按钮向父级组件传递点击事件等。实例函数的情况有些特别，主要是在父组件中通过 React 的 ref API 获取子组件的实例，然后是通过实例调用子组件的实例函数。这种方式在过去常见于 Modal 框的显示与隐藏。这样的代码风格有着明显的 jQuery 时代特征，在现在的 React 社区中已经很少见了，因为流行的做法是希望组件的所有能力都可以通过 Props 控制。

多层级间的数据通信，有两种情况。第一种是一个容器中包含了多层子组件，需要最底部的子组件与顶部组件进行通信。在这种情况下，如果不断透传 Props 或回调函数，不仅代码层级太深，后续也很不好维护。第二种是两个组件不相关，在整个 React 的组件树的两侧，完全不相交。那么基于多层级间的通信一般有三个方案。

第一个是使用 React 的 Context API，最常见的用途是做语言包国际化。

第二个是使用全局变量与事件。全局变量通过在 Windows 上挂载新对象的方式实现，这种方式一般用于临时存储值，这种值用于计算或者上报，缺点是渲染显示时容易引发错误。全局事件就是使用 document 的自定义事件，因为绑定事件的操作一般会放在组件的 componentDidMount 中，所以一般要求两个组件都已经在页面中加载显示，这就导致了一定的时序依赖。如果加载时机存在差异，那么很有可能导致两者都没能对应响应事件。

第三个是使用状态管理框架，比如 Flux、Redux 及 Mobx。优点是由于引入了状态管理，使得项目的开发模式与代码结构得以约束，缺点是学习成本相对较高。
