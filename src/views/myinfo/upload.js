import { ref } from 'vue';
import useUserStore from '@/store/user';
import { getUploadToken, uploadQiniu } from '@/api/qiniuyun/qiniu';
import { editUserInfo } from '@/api/user';
const userStore = useUserStore();
//去转换base64，替换数据，实现不请求接口头像会改变
export const imageUrl = ref('');

imageUrl.value = userStore.userInfo.avatar;
export const handleRequest = (e) => {
  const fd = new FileReader();
  fd.readAsDataURL(e.file); // 将文件转化为base64格式传入后端
  fd.onload = async () => {
    imageUrl.value = fd.result;
    //掉接口改头像
    await submit(e);
    userStore.userInfo.avatar = imageUrl.value;
  };
};

/**
 * @msg :上传头像经过七牛云转化
 * @param { Object }  e是组件选中头像返回来的里面有file对象
 * @return :Array 返回转化好的数据，
 */
export async function upload(e) {
  let { file } = e;
  let fileList = [
    {
      file,
    },
  ];
  let imageSrc = [];
  let task = fileList.map((v) => {
    return new Promise(async (resolve, reject) => {
      let { file } = v;
      let { type } = file;
      type = type.split('/')[1];
      let file_name = `${new Date().getTime()}_${Math.random().toString(36).slice(2)}.${type}`;
      let { token } = await getUploadToken();
      const formdata = new FormData();
      formdata.append('file', file);
      formdata.append('token', token);
      formdata.append('key', file_name);
      uploadQiniu(formdata).then((res) => {
        resolve(`http://toutiao.longxiaokj.com/` + res.key);
      });
    });
  });
  imageSrc = await Promise.all(task);
  return imageSrc;
}
/**
 * @msg :修改头像
 * @param { Object }  e是组件选中头像返回来的里面有file对象
 */
export async function submit(e) {
  let uid = userStore.uid;
  let res = await upload(e);
  let avatar = res[0];
  // console.log(avatar);
  editUserInfo({
    avatar,
    uid,
  }).then((res) => {
    console.log(res);
  });
}
