import axios from './axios';
export const getArticle = (params) => axios.post('/admin/getArticle', params);
