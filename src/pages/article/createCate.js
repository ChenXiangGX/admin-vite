import { createArticle as createArticleAction } from '@/api/cate';

import { ref, reactive } from 'vue';
import userStore from '@/store/user';
// import { getCate } from '../getCate';
const userStores = userStore();
export let createBoxVisible = ref(false); // 弹出层开关
// 表单数据
export let createForm = reactive({
  cateItem: '',
  title: '',
  content: '',
  author: '',
  author_id: '',
  cate_name: '',
  cate_id: '',
  imageSrc: '',
});

//  规则
// export let rules = reactive({
//   name: [
//     { required: true, message: '请填写分类', trigger: 'blur' },
//     { min: 1, max: 30, message: '至少1个字符，最多30个字符', trigger: 'blur' },
//   ],
// });

async function check(formEl) {
  return new Promise(function (resolve) {
    if (!formEl) return resolve(false);

    formEl.validate((v) => {
      resolve(!!v);
    });
  });
}

export async function createCate(formEl) {
  let checkRes = await check(formEl);
  if (!checkRes) return;
  // console.log(createForm.cateItem);
  if (createForm.cateItem.length > 15) {
    let reg = createForm.cateItem.split('-');
    createForm.cate_id = reg[0];
    createForm.cate_name = reg[1];
    delete createForm.cateItem;
  }
  // console.log(createForm);
  let authors = userStores.userInfo.nickname;
  let author_id = userStores.userInfo._id;
  let { cateItem, title, content, cate_name, cate_id, imageSrc } = createForm;
  // console.log(createForm);
  // ElMessage.success('新增成功');
  createArticleAction({
    cateItem,
    title,
    content,
    cate_name,
    cate_id,
    imageSrc,
    authors,
    author_id,
  }).then((res) => {
    console.log(res);

    if (res.code == 0) {
      ElMessage.success('新增成功');
      createBoxVisible.value = false;
      formEl.resetFields();

      // getCate();
    } else {
      ElMessage.error('失败');
    }
  });
}
