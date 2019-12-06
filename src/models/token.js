import localStore from '../localStore';

const state = {
  token: localStore.getUserToken() || ''
};

export default {
  namespace: 'token',
  state: state,
  effects: {
    *setToken({ payload }, { put }) {
      localStore.setUserToken(payload.token);
      yield put({ type: 'set', payload });
    }
  },
  reducers: {
    set(state, action) {
      return action.payload;
    }
  }
}
