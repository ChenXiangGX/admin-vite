<template>
  <div class="table_layout">
    <el-page-header :content="$route.meta.title" @back="$router.back()" />

    <el-divider />

    <div style="text-align: right">
      <el-button type="primary" @click="createBoxVisible = true">新增分类</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" align="center" header-align="center">
      <el-table-column prop="_id" label="ID" width="210" />
      <el-table-column prop="name" label="分类名字" width="180" />
      <el-table-column prop="status" label="状态(0开启,1关闭)" />
      <el-table-column prop="sort" label="排序(越小越靠前)" />
      <el-table-column fixed="right" label="操作" width="180">
        <!-- 通过打印的值#default="scope"是插槽的值里面有row对象可以找到 -->
        <template #default="{ row }">
          <el-popconfirm title="您确认删除吗?" @confirm="deleteCate(row._id)">
            <template #reference>
              <el-button type="primary" :icon="Delete" color="#626aef" />
            </template>
          </el-popconfirm>

          <el-button type="primary" @click="editOpen(row._id)" :icon="Edit" color="#626aef" />
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!--  新增分类的弹出层-->
  <el-dialog v-model="createBoxVisible" title="新增分类" width="400px" center>
    <template #default>
      <el-form :model="createForm" :rules="rules" ref="createFormRef">
        <el-form-item prop="name">
          <el-input v-model="createForm.name" placeholder="请输入分类" />
        </el-form-item>
        <el-form-item>
          <el-input v-model.number="createForm.sort" placeholder="请输入排序,越小权越靠前" />
        </el-form-item>
        <el-form-item>
          <span>是否开启true为开启 </span>
          <el-switch v-model="createForm.status" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width: 80%; margin: 0 auto" @click="createCate(createFormRef)"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
  <edit></edit>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import edit from './edit.vue';
import { tableData, getCate } from './getCate';
import { createBoxVisible, createForm, createCate, rules } from './createCate';

import { editBoxVisible, editOpen } from './editCate';
import { deleteCate } from './deleteCate';
import { Delete, Edit } from '@element-plus/icons-vue';
//最后确定新增的一个校验
const createFormRef = ref();
// const editFormRef = ref();

onMounted(function () {
  getCate();
});
</script>

<style>
.table_layout {
  padding: 20px;
  border-radius: 5px;
  background: #fff;
}
</style>
