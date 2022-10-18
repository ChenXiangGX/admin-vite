import axios from './axios';

export const doLogin = (p) => axios.post('/admin/login', p);
export const checkToken = (params) => axios.get('/admin/checkToken', { params });
export const getMenu = (params) => axios.get('/admin/getMenu', { params });
export const logout = (params) => axios.get('/admin/logout', { params });
//修改信息
export const editUserInfo = (params) => axios.post('/admin/updateUser', params);
//修改密码
export const updatePwd = (params) => axios.post('/admin/updatePwd', params);
