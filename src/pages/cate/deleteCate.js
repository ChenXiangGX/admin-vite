import { deleteCate as deleteCateAction } from '@/api/cate';
import { getCate } from './getCate';
export function deleteCate(cate_id) {
  console.log(cate_id);

  deleteCateAction({
    cate_id,
  }).then((res) => {
    console.log(res);
    if (res.code == 0) {
      ElMessage.success('删除成功');

      getCate();
    } else {
      ElMessage.error('失败');
    }
  });
}
