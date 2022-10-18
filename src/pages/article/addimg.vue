<template>
  <el-upload
    v-model:file-list="fileList"
    action=""
    :http-request="handleRequest"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :limit="3"
    :on-exceed="waring"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img style="width: 232px" w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/user';
import { getUploadToken, uploadQiniu } from '@/api/qiniuyun/qiniu';
import { editUserInfo } from '@/api/user';
import { createForm } from './createCate';
const fileList = ref([]);

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};

function waring() {
  ElMessage({
    message: '最多只能上传三张图片呦',
    type: 'error',
  });
}

const userStore = useUserStore();

const imageUrl = ref('');

async function handleRequest(e) {
  let imageSrcs = await upload(fileList);
  createForm.imageSrc = imageSrcs;
}

async function upload(e) {
  let imageSrc = [];
  let fileList = e._rawValue;
  if (!fileList || !Array.isArray(fileList) || fileList.length === 0) {
    //没上传图片
    return imageSrc;
  }
  if (!fileList || fileList.length === 0) {
    //  没上传图片
    return imageSrc;
  }

  let task = fileList.map((v) => {
    return new Promise(async (resolve, reject) => {
      let { raw: file } = v;
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
</script>
