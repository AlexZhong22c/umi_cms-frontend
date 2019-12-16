- [x] antd
- [x] ant-design/pro-layout
- [x] dva

npx umi dev

演示了：

- 本地存储数据持久化层 localStore
- axios拦截器钩子分切面 (代码插件化)
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
  - 用react hooks分离业务逻辑模块。
  - 封装 Modal 组件和逻辑；封装 Pagination 逻辑



#### 在不需要切换语言的前提下，如何把umi体系的antd初始化为中文

首先前提是，在这个项目中，只使用中文，不需要切换语言。

如果是只有antd的话，一般来说就使用`Config Provider`，设置一下locale就行了。 [参考](https://ant.design/components/config-provider-cn/)

而这个项目是基于umi使用antd，为了让umi配置统一放在一起，不能这么做。

而符合umi思想的办法是：去到`config/config.js`，在插件 umi-plugin-react 配置项里添加：`locale: { enable: true }`即可。

