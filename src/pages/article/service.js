import services from '@/services';

const ENTITY = '/api/article';

const add = params => services.post(`${ENTITY}/add`, params);
const del = params => services.post(`${ENTITY}/del`, params);
const update = params => services.post(`${ENTITY}/update`, params);
const list = params => services.post(`${ENTITY}/list`, params);
const page = params => services.post(`${ENTITY}/page`, params);
const batchDel = params => services.post(`${ENTITY}/batch/del`, params);

const listCategory = params => services.post('/api/category/list', params);
const listUser = params => services.post('/api/user/list', params);

export default {
  add,
  del,
  update,
  list,
  page,
  batchDel,

  listCategory,
  listUser
};
