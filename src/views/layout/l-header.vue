<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" router mode="horizontal" :ellipsis="false">
    <div class="logo">
      <img src="/src/assets/vue.svg" alt="" />
      <h3>热点新闻后台管理系统</h3>
    </div>

    <div class="flex-grow" />

    <el-sub-menu index="/dashboard" router>
      <template #title>
        <el-avatar :src="userStore.userInfo.avatar" size="small" />
        <span>{{ userStore.userInfo.nickname }}</span>
      </template>
      <el-menu-item index="/info">修改资料</el-menu-item>
      <el-menu-item index="/login" @click="logout">退出登陆</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref, watch } from 'vue';

import useUserStore from '@/store/user';
import usePublicStore from '@/store/public';

import { logout as logoutAction } from '@/api/user';
import { useRouter, useRoute } from 'vue-router';

const userStore = useUserStore();
const publicStore = usePublicStore();
const router = useRouter();

let route = useRoute();
let active_path = route.path || '/dashboard';
let activeIndex = ref(active_path);
watch(route, function (n, b) {
  activeIndex.value = n.path;
});
function logout() {
  logoutAction().then((res) => {
    console.log(res);
    //  清本地存储

    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpired');

    // 清路由

    console.log(router);

    router.getRoutes().forEach((v) => {
      if (v.meta.isDynamic) {
        router.removeRoute(v.name);
      }
    });

    //  清store

    userStore.$reset();
    publicStore.$reset();

    router.replace('/login');
  });
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.logo {
  display: flex;
  align-items: center;
}

.el-menu-demo {
  height: 60px;
}
</style>
