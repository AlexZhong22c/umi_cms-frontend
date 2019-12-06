export default function (request) {
  const { token } = window.g_app._store.getState().token;

  if (token) {
    // TODO: 目前后端好像没有校验token 401
    // 按照jwt的约定来：
    request.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return request;
}