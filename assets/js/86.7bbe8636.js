(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{405:function(t,e,o){"use strict";o.r(e);var s=o(34),a=Object(s.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("h2",{attrs:{id:"react-hook-的使用限制有哪些？"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#react-hook-的使用限制有哪些？"}},[t._v("#")]),t._v(" React Hook 的使用限制有哪些？")]),t._v(" "),o("p",[t._v("React Hooks 的限制主要有两条：")]),t._v(" "),o("ol",[o("li",[t._v("不要在循环、条件或嵌套函数中调用 Hook；")]),t._v(" "),o("li",[t._v("在 React 的函数组件中调用 Hook。")])]),t._v(" "),o("p",[t._v("那为什么会有这样的限制呢？就得从 Hooks 的设计说起。Hooks 的设计初衷是为了改进 React 组件的开发模式。在旧有的开发模式下遇到了三个问题。")]),t._v(" "),o("ol",[o("li",[o("p",[t._v("组件之间难以复用状态逻辑。过去常见的解决方案是高阶组件、render props 及状态管理框架。")])]),t._v(" "),o("li",[o("p",[t._v("复杂的组件变得难以理解。生命周期函数与业务逻辑耦合太深，导致关联部分难以拆分。")])]),t._v(" "),o("li",[o("p",[t._v("人和机器都很容易混淆类。常见的有 this 的问题，但在 React 团队中还有类难以优化的问题，他们希望在编译优化层面做出一些改进。")])])]),t._v(" "),o("p",[t._v("这三个问题在一定程度上阻碍了 React 的后续发展，所以为了解决这三个问题，Hooks 基于函数组件开始设计。然而第三个问题决定了 Hooks 只支持函数组件。")]),t._v(" "),o("p",[t._v("那为什么不要在循环、条件或嵌套函数中调用 Hook 呢？因为 Hooks 的设计是基于数组实现。在调用时按顺序加入数组中，如果使用循环、条件或嵌套函数很有可能导致数组取值错位，执行错误的 Hook。当然，实质上 React 的源码里不是数组，是链表。")]),t._v(" "),o("p",[t._v("这些限制会在编码上造成一定程度的心智负担，新手可能会写错，为了避免这样的情况，可以引入 ESLint 的 Hooks 检查插件进行预防。")]),t._v(" "),o("h2",{attrs:{id:"useeffect-与-uselayouteffect-区别在哪里？"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#useeffect-与-uselayouteffect-区别在哪里？"}},[t._v("#")]),t._v(" useEffect 与 useLayoutEffect 区别在哪里？")]),t._v(" "),o("p",[t._v("useEffect 与 useLayoutEffect 的区别在哪里？这个问题可以分为两部分来回答，共同点与不同点。")]),t._v(" "),o("p",[t._v("它们的共同点很简单，底层的函数签名是完全一致的，都是调用的 mountEffectImpl，在使用上也没什么差异，基本可以直接替换，也都是用于处理副作用。")]),t._v(" "),o("p",[t._v("那不同点就很大了，useEffect 在 React 的渲染过程中是被异步调用的，用于绝大多数场景，而 LayoutEffect 会在所有的 DOM 变更之后同步调用，主要用于处理 DOM 操作、调整样式、避免页面闪烁等问题。也正因为是同步处理，所以需要避免在 LayoutEffect 做计算量较大的耗时任务从而造成阻塞。")]),t._v(" "),o("p",[t._v("在未来的趋势上，两个 API 是会长期共存的，暂时没有删减合并的计划，需要开发者根据场景去自行选择。React 团队的建议非常实用，如果实在分不清，先用 useEffect，一般问题不大；如果页面有异常，再直接替换为 useLayoutEffect 即可。")])])}),[],!1,null,null,null);e.default=a.exports}}]);