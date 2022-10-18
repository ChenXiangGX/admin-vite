<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部组件 -->
      <el-header>
        <lHeader></lHeader>
      </el-header>
      <!--头部结束 -->
      <el-container>
        <!-- 左侧导航 -->
        <el-aside width="200px">
          <lLeft></lLeft>
        </el-aside>
        <!-- 左侧导航结束 -->

        <el-container>
          <el-main>
            <!-- home下的二级路由  右侧的主内容 -->
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import lHeader from '@/views/layout/l-header.vue';
import lLeft from '@/views/layout/l-left.vue';
</script>

<style>
.common-layout {
  width: 100%;
  height: 100vh;
}
</style>
