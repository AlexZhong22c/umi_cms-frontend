import Link from 'umi/link';
// import styles from './index.less';

export default function() {
  return (
    <div style={{height: '1000px'}}>
      <h1>欢迎登陆</h1>
      <p><strong>一篇文章</strong>要属于<strong>一个分类</strong>下</p>
      <p>您可跳转至</p>
      <p><Link to="/category">分类管理</Link></p>
      <p><Link to="/article">文章管理</Link></p>
    </div>
  );
}