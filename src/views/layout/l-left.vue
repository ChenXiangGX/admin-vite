<template>
  <el-row class="leftBar">
    <el-col :span="24">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        router
      >
        <!-- dashboard -->
        <!-- 仪表盘 -->
        <el-menu-item index="/dashboard">
          <xIcon icon="HomeFilled"></xIcon>
          <span>控制台</span>
        </el-menu-item>

        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>内容管理</span>
          </template>
          <el-menu-item index="1-1">分类管理</el-menu-item>
          <el-menu-item index="1-2">文章管理</el-menu-item>
        </el-sub-menu> -->

        <!-- <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item> -->
        <!-- 这里想弄个盒子包着，也不行用div所以用templa包着 -->
        <!-- 这里循环返回的职位不一样菜单也不一样，动态菜单 -->
        <template v-for="(item, index) in PublicStore.menu" :key="index">
          <el-sub-menu :index="item.path" v-if="item.children && item.children.length">
            <template #title>
              <xIcon :icon="item.icon"></xIcon>
              <span>{{ item.title }}</span>
            </template>

            <el-menu-item v-for="(item2, index2) in item.children" :key="index2" :index="item2.path">
              <xIcon :icon="item2.icon"></xIcon>
              {{ item2.title }}</el-menu-item
            >
          </el-sub-menu>

          <el-menu-item :index="item.path" v-else>
            <xIcon :icon="item.icon"></xIcon>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>

        <el-menu-item disabled="false" index="/setting">
          <el-icon><setting /></el-icon>
          <span>设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
import useUserStore from '@/store/public';
// import router from '@/router';vue2写法下面是vue3写法
import { useRouter, useRoute } from 'vue-router';
import { toRef, ref, watch } from 'vue';
let router = useRouter();

let route = useRoute();

let active_path = route.path || '/dashboard';
let defaultActive = ref(active_path);

let PublicStore = useUserStore();
watch(route, function (n, b) {
  defaultActive.value = n.path;
});
</script>

<style scoped>
.leftBar {
  height: calc(100vh - 60px);
  background-color: #545c64;
}
.el-col-24 .el-menu {
  border-right: none;
}
</style>
