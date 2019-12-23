## 思考如何实现

> https://juejin.im/post/5cdc2f54e51d453b0c35930d#heading-6
>
> https://juejin.im/post/5d594ea5518825041301bbcb#heading-50

可以参考 antd [Modal.confirm](https://github.com/ant-design/ant-design/blob/master/components/modal/confirm.tsx)的实现, 它使用`ReactDOM.render`来进行外挂渲染，也有人使用[Context API](https://medium.com/@BogdanSoare/how-to-use-reacts-new-context-api-to-easily-manage-modals-2ae45c7def81)来实现的. 

使用`ReactDOM.render`外挂渲染形式的缺点就是无法访问 Context，外部无法往这个组件注入数据或者回调函数，所以还是要妥协一下，结合 Context API 来实现示例

**而如果是用了React Hooks，相关参数也可以直接通过自定义Hooks所形成的闭包返回，这就能替代掉Context API的使用。**

扩展

- [Modal.confirm](https://github.com/ant-design/ant-design/blob/master/components/modal/confirm.tsx)
- [Modal.confirm 违反了 React 的模式吗？](https://zhuanlan.zhihu.com/p/54492049)
- [使用 render props 抽象 Modal 组件的状态](https://www.zhihu.com/search?type=content&q=react modal)
- [react-confirm](https://github.com/haradakunihiko/react-confirm)
- [How to use React’s new Context API to easily manage modals](https://medium.com/@BogdanSoare/how-to-use-reacts-new-context-api-to-easily-manage-modals-2ae45c7def81) 基于 Context 的方案

## TODO

- 这个组件先不要使用，在边界条件下的缺陷还没有处理。
  - 处理对于 destroyOnClose 的需求 ???
  - 对于Modal嵌套，做成Modal栈的形式 ???
