import { Modal, notification } from 'antd';
// 该模块应该被置于拦截器钩子链的末端。前面所有的拦截切面都应当
// 不设置rejected，这样，所有错误都会统一进到这个rejected函数中处理。

let lockOfModal = false;

export default function (error = {}) {
  /**
   * ajax本身没捕获到错误，同时status code / error code异常：
  */
  if (error.status) {
    // 进入这个if分支，对应上游执行的是 throw response :(此时error就是response，所以才会有status属性)
    throw error.data;
  }

  /**
   * ajax本身捕获到错误：
  */
  if (error.message && error.message.includes('Network Error')) {
    // 进入这个if分支，绝大多数情况下，要么服务器完全崩溃了，要么该客户端暂时无法接入互联网
    // 这个错误是axios给出的。
    // PS: 判断客户端是否脱机window.navigator.onLine。
    if (!lockOfModal) {
      lockOfModal = true;
      Modal.error({
        content: '服务器出错了，请稍后重试',
        maskClosable: true,
        onCancel: () => lockOfModal = false
      });
    }
    throw error;
  }

  if (error.message && error.message.includes('timeout')) {
    // 进入这个if分支，是请求超时。这个错误是axios给出的。
    if (!lockOfModal) {
      lockOfModal = true;
      Modal.error({
        content: '请求超时，请稍后重试',
        maskClosable: true,
        onCancel: () => lockOfModal = false
      });
    }
    throw error;
  }

  // 这个提示，可以思考怎么优化一下交互：
  if (error.message && error.message.includes('404')) {
    // 这个错误是axios给出的。
    notification.error({
      message: '接口不存在: ' + error.request.responseURL.split('/api')[1]
    })
    throw error;
  }

  // 经过 if else 能执行到这里的，一般是service层中发生的js原生的错误，或者
  // 也可能是在前面拦截器切面中程序员手动throw的错误。
  // 因此，注意一下error的数据格式可能有所不同。如果有需要的话增设if else区分打印error的格式。
  console.info('error was happened in service');
  throw error;
}
