import axios from 'axios';

axios.defaults.baseURL = 'https://45847f4c-0180-49d4-996b-b8f599c61f29.bspapp.com';

axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);
axios.interceptors.request.use(
  (res) => {
    // 在请求头里加 token
    res.headers['Authorization'] = localStorage.getItem('token');
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default axios;
