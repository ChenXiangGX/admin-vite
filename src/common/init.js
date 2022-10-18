import { checkToken } from '@/api/user';
import useUserStore from '@/store/user';
//解决侧边栏刷新数据丢失，请求数据异步走的完，
import usePublicStore from '@/store/public';
//加载条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from '@/router';
export default function init() {
  return new Promise(function (resolve) {
    console.log('init初始化');

    let { token, tokenExpired } = localStorage;
    //这里加号转数字
    tokenExpired = +tokenExpired;
    if (!token || !tokenExpired) return resolve();
    let now = Date.now();
    if (now >= tokenExpired) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpired');
      return resolve();
    }
    //  token存在  token没过期
    NProgress.start();
    checkToken()
      .then(async (res) => {
        if (res.code == 0) {
          let userStore = useUserStore();

          let { uid, userInfo } = res;

          userStore.changeUid(uid);
          userStore.changeUerInfo(userInfo);
          console.log('-----------去获取菜单信息 ------------');

          let PublicStore = usePublicStore();
          await PublicStore.getMenu(router);
          // const aa = await PublicStore.getMenu(router);
          // console.log(aa);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpired');
        }

        //下面写过了，没的话再加上
        // resolve();
      })
      .finally(async function () {
        resolve();
        NProgress.done();
      });
  });
}
