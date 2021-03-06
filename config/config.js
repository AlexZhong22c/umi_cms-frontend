// component 是基于src/pages路径的
export default {
  routes: [
    {
      path: '/login',
      component: './login',
    },
    {
      path: '/',
      component: '../layouts',
      routes: [
        // FIXME: 重定向的时候页面好像闪一下，能不能优化一下？？？？？？
        { path: '/', redirect: '/home' },
        {
          path: 'home',
          component: './home',
        },
        {
          path: 'category',
          component: './category',
        },
        {
          path: 'article',
          component: './article',
        },
      ]
    },
  ],
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true,
        dva: true,
        locale: { enable: true }
      }
    ]
  ],
};
