import { createRouter, createWebHashHistory } from 'vue-router';
// import VueRouter from 'vue-router';
// 1. 定义路由组件.
import login from '@/views/login/login.vue';
import home from '@/views/home.vue';
//pinia数据
import useUserStore from '@/store/user';
//加载条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/login', component: login, name: 'login' },
  {
    path: '/',
    name: 'home',
    component: home,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard.vue'),
      },
      {
        path: '/info',
        name: 'info',
        component: () => import('@/views/myinfo/info.vue'),
      },
    ],
  },
  {
    path: '/prop',
    name: 'prop',
    component: () => import('@/views/props.vue'),
  },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
//  白名单
let whiteList = ['login', 'about'];
//路由守卫
router.beforeEach(function (to, from, next) {
  //   //
  //   如果有通行证  直接放行
  NProgress.start();
  let userStore = useUserStore();
  // console.log(userStore.uid);
  if (userStore.uid) {
    NProgress.done();
    return next();
  }

  if (whiteList.includes(to.name)) {
    // 这是公开页面
    next();
  } else {
    //  非公开
    next({ name: 'login' });
  }

  NProgress.done();
});
// // 5. 创建并挂载根实例
// const app = Vue.createApp({});
// //确保 _use_ 路由实例使
// //整个应用支持路由。
// app.use(router);

// app.mount('#app');

// // 现在，应用已经启动了！
export default router;
