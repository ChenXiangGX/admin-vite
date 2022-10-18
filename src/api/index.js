import axios from './axios';

export const getPlatformInfo = (params) => axios.get('/admin/getPlatformInfo', { params });
