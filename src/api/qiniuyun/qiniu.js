import axios from '../axios';
//获取上传七牛云上传token
export function getUploadToken() {
  return axios.get('https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/upload/token');
}
//上传七牛云
export function uploadQiniu(formData) {
  return axios.post('https://upload-z1.qiniup.com', formData);
}
