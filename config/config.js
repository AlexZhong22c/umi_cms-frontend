// component 是基于src/pages路径的
export default {
  routes: [
    {
      path: '/login',
      component: './login',
    },
    {
      path: '/home',
      component: './home',
    },
  ],
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true,
        dva: true,
      }
    ]
  ],
};
