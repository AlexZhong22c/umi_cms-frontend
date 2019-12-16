import services from '@/services';

const ENTITY = '/api/category';

const add = params => services.post(`${ENTITY}/add`, params);
const del = params => services.post(`${ENTITY}/del`, params);
const update = params => services.post(`${ENTITY}/update`, params);
const list = params => services.post(`${ENTITY}/list`, params);
const page = params => services.post(`${ENTITY}/page`, params);
const batchDel = params => services.post(`${ENTITY}/batch/del`, params);

export default {
  add,
  del,
  update,
  list,
  page,
  batchDel
};
