import React from 'react';
import Link from 'umi/link';
import { BasicLayout, DefaultFooter } from '@ant-design/pro-layout';

const menuData = [
  {
    'path': '/',
    'name': '首页',
    'icon': 'home',
  },
  {
    'path': '/category',
    'name': '分类管理',
    'icon': 'project',
  },
  {
    'path': '/article',
    'name': '文章管理',
    'icon': 'container'
  }
];

export default function(props) {
  // https://github.com/ant-design/ant-design-pro-layout#prolayout
  const otherPropsOfBasicLayout = {
    title: 'umi-egg 管理后台',
    fixedHeader: true,
    fixSiderbar: true
  };
  return (
    <>
      <BasicLayout
        {...otherPropsOfBasicLayout}
        menuDataRender={() => menuData}
        menuItemRender={(menuItemProps, defaultDom) => (
          <Link to={menuItemProps.path}>{defaultDom}</Link>
        )}
        footerRender={() => (
          <DefaultFooter
            links={[
              // TODO:
              { key: 'Github', title: 'Github', href: 'https://github.com/AlexZhong22c' },
              { key: 'Blog', title: 'Blog', href: 'https://alexzhong22c.github.io/' },
            ]}
            copyright="az22c"
          ></DefaultFooter>
        )}
      >
        { props.children }
      </BasicLayout>
    </>
  );
}
