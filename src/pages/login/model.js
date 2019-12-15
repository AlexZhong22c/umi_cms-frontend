import { message } from 'antd';
import router from 'umi/router';
import service from './service';



const state = {
  isSignin: true
};

export default {
  namespace: 'login',
  state: state,
  // 异步操作：
  effects: {
    // actions: login/signin:
    *signin({ payload }, { call, put }) {
      yield call(service.signin, payload);
      message.success('注册成功');
      yield put({ type: 'turnOffSignin' });
    },
    *login({ payload }, { call, put }) {
      const res = yield call(service.login, payload)

      const token = res.result;

      yield put({ type: 'token/setToken', payload: token });
      router.push('/home');
      message.success('登录成功');
    },
  },
  reducers: {
    turnOnSignin(state) {
      return {
        ...state,
        isSignin: true
      }
    },
    turnOffSignin(state) {
      return {
        ...state,
        isSignin: false
      }
    }
  }
}
