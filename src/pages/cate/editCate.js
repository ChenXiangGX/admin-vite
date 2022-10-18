import { updateCate as editUpdateCate } from '@/api/cate';

import { ref, reactive } from 'vue';

import { getCate } from './getCate';

export let editBoxVisible = ref(false); // 弹出层开关
// 表单数据
export let editForm = reactive({
  name: '',
  sort: 1000,
  status: true,
});

//  规则
export let editrules = reactive({
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
let cate = ref();
export function editOpen(e) {
  editBoxVisible.value = true;
  cate.value = e;
}
export async function editCate(formEl) {
  let checkRes = await check(formEl);
  if (!checkRes) return;

  let { status, name, sort } = editForm;
  let cate_id = cate.value;
  //0可以显示分类上
  status = Number(!status);
  sort = Number(sort) || 1000;
  ElMessage.success('新增成功');
  editUpdateCate({
    cate_id,
    status,
    name,
    sort,
  }).then((res) => {
    // console.log(res);
    if (res.code == 0) {
      ElMessage.success('新增成功');
      editBoxVisible.value = false;
      formEl.resetFields();
      getCate();
    } else {
      ElMessage.error('失败');
    }
  });
}
