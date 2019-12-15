import services from '@/services';

const ENTITY = '/auth';

const signin = params => services.post(`${ENTITY}/signin`, params);

const login = params => services.post(`${ENTITY}/login`, params);

// const test = params => services.post('/api/test/bad', {});

export default {
  signin,
  login
}