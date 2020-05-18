import localStore from '../localStore';

export default {
  namespace: 'token',
  state: localStore.getUserToken() || '',
  effects: {
    *setToken({ payload }, { put, call }) {
      yield call([localStore, 'setUserToken'], payload);
      yield put({ type: 'set', payload });
    }
  },
  reducers: {
    set(state, action) {
      return action.payload;
    }
  }
}
