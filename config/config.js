// component 是基于src/pages路径的
export default {
  routes: [
    {
      path: '/login',
      component: './login',
    }
  ],
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true,
      }
    ]
  ],
};
