## 架构和预览

- [x] antd
- [x] ant-design/pro-layout
- [x] dva

npx umi dev

## 代码逻辑演示

**架构层面 演示：**

- 本地存储数据持久化层 @localStore文件夹
- axios拦截器钩子分切面 (代码插件化) @service文件夹
  - request 带上token
  - request 设置baseUrl
  - response 错误状态码500以上：弹窗提示
  - response 错误状态码500以下：通知提示
  - 断网的时候 只弹出1次弹窗提示
  - 请求超时的时候 只弹出1次弹窗提示
  - 服务器接口不存在 通知提示
  - (错误统一到一个rejected函数中处理)
- saga尽可能不使用catch error(在其他js体系下，本来业务层就是可不catch的；但是在dva体系下，需要加onError，防止错误最终没有被catch而导致新js事件无法正常触发部分代码)
- react hooks
  - 用react hooks分离页内业务逻辑模块。
  - 封装公共hooks：封装 Modal 组件和逻辑；封装 Pagination 逻辑
  - (用hooks实现“带查询表单的分页表格增删改查”)

**api运用层面 演示：**

- 编辑一条记录的时候，载入到表单？ mapPropsToFields (antd)
- 如何拿到“在函数组件中的”组件实例？forwardRef useImperativeHandle (react)
- 在react组件外获取dva中的变量：`const token = window.g_app._store.getState().token;`

## React Hooks的使用：

##### 如何拿到useState最新的值

方法有很多。而在这里直接用`useRef`同步一份state。

参考src/hooks/useStateNewest.js。

##### 如何拿到“在函数组件中的”组件实例(forwardRef useImperativeHandle)

> 你需要通过 `forwardRef` 和 `useImperativeHandle` 的组合使用来实现在函数组件中正确拿到 form 实例。

[官方演示1](https://ant.design/components/form-cn/#%E5%A6%82%E4%BD%95%E5%9C%A8%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E4%B8%AD%E6%8B%BF%E5%88%B0-form-%E5%AE%9E%E4%BE%8B%EF%BC%9F)

[官方演示2](https://github.com/ant-design/ant-design/pull/19937/files/e22830985c025a4979239b42e46a12dc96b32b87#diff-c228e588c2e28d43fdccf78a6045206b)

##### 在第一页，删除一条记录的时候，想去重新获取第一页的列表 (用hooks useEffect的时候)

声明时，useEffect监听pager对象；处理事件时，需要获取列表的时候替换掉 pager 对象以触发监听回调。
