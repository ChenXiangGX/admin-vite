import { ref, reactive } from 'vue';
import { getCate as getCateActions } from '@/api/cate';
import { getArticle as getArticleActions } from '@/api/article';

export let cateDate = ref([]);
export let listData = ref([]);
export let total = ref(0);
export async function getCate() {
  let res = await getCateActions();
  cateDate.value = res.data;
  // console.log(cateDate);
}

export const queryForm = reactive({
  cateId: '',
  pageNum: 1,
  pageSize: 10,
  userId: '',
  startTime: '',
  endTime: '',
  keyWord: '',
  sort: 'desc',
});
export let refreshKey = ref(0);
export function query() {
  //重新加载组件
  queryForm.pageNum = 1;
  refreshKey.value++;
  getArticle();
}
function getArticle() {
  let endTime = queryForm.endTime ? queryForm.endTime.getTime() : '';
  let startTime = queryForm.startTime ? queryForm.startTime.getTime() : '';
  getArticleActions({ ...queryForm, endTime, startTime }).then((res) => {
    listData.value = res.data;
    total.value = res.count;
  });
}
export function currentChange(e) {
  //   console.log(e);
  queryForm.pageNum = e;
  getArticle();
}
