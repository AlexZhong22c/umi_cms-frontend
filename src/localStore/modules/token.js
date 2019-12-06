
import store from 'store';
import { tokenKey } from '../config';

function getUserToken() {
  return store.get(tokenKey) || '';
}
function setUserToken(token) {
  store.set(tokenKey, token);
}
function removeUserToken() {
  store.remove(tokenKey);
}

export default {
  getUserToken,
  setUserToken,
  removeUserToken
};
