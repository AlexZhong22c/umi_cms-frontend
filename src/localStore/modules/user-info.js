import store from 'store';
import { UserInfoKey } from '../config';

function getUserInfo() {
  return store.get(UserInfoKey) || {};
}
function setUserInfo(userInfo) {
  store.set(UserInfoKey, userInfo);
}
function removeUserInfo() {
  store.remove(UserInfoKey);
}

export default {
  setUserInfo,
  getUserInfo,
  removeUserInfo
};
