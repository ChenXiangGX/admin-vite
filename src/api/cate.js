import axios from './axios';

export const getCate = (params) => axios.get('/admin/getCate', { params });
export const createCate = (params) => axios.post('/admin/createCate', params);
export const deleteCate = (params) => axios.post('/admin/deleteCate', params);
export const updateCate = (params) => axios.post('/admin/updateCate', params);
export const createArticle = (params) => axios.post('/admin/createArticle', params);
