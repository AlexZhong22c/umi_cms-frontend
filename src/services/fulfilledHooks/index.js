// request fulfilled 拦截器
import requestDomainUrl from './requestDomainUrl';
import requestAddToken from './requestAddToken';

// response fulfilled 拦截器
import responseServerError from './responseServerError';
import responseBaseError from './responseBaseError';
import responseChangeReturn from './responseChangeReturn';

// 顺序从该钩子数组 后往前 执行：
export const requestFulfilledHooks = [
  requestDomainUrl,
  requestAddToken
];
// 顺序从该钩子数组 前往后 执行：
export const responseFulfilledHooks = [
  responseServerError,
  responseBaseError,
  responseChangeReturn
];
