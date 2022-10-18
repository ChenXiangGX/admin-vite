import { createCate as createCateAction } from '@/api/cate';

import { ref, reactive } from 'vue';

import { getCate } from './getCate';

export let createBoxVisible = ref(false); // 弹出层开关
// 表单数据
export let createForm = reactive({
  name: '',
  sort: 1000,
  status: true,
});

//  规则
export let rules = reactive({
  name: [
    { required: true, message: '请填写分类', trigger: 'blur' },
    { min: 1, max: 5, message: '至少1个字符，最多5个字符', trigger: 'blur' },
  ],
});

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

  let { status, name, sort } = createForm;
  //0可以显示分类上
  status = Number(!status);
  sort = Number(sort) || 1000;
  ElMessage.success('新增成功');
  createCateAction({
    status,
    name,
    sort,
  }).then((res) => {
    console.log(res);

    if (res.code == 0) {
      ElMessage.success('新增成功');
      createBoxVisible.value = false;
      formEl.resetFields();

      getCate();
    } else {
      ElMessage.error('失败');
    }
  });
}
