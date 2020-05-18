import localStore from '../localStore';

export default {
  namespace: 'userInfo',
  state: localStore.getUserInfo() || {},
  effects: {
    *setUserInfo({ payload }, { put, call }) {
      yield call([localStore, 'setUserInfo'], payload);
      yield put({ type: 'set', payload });
    }
  },
  reducers: {
    set(state, action) {
      return action.payload;
    }
  }
}
