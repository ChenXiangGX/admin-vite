<template>
  <!-- 编辑分类的弹出层 -->
  <el-dialog v-model="editBoxVisible" title="修改分类" width="400px" center>
    <template #default>
      <el-form :model="editForm" :rules="editrules" ref="editFormRef">
        <el-form-item prop="name">
          <el-input v-model="editForm.name" placeholder="请输入分类" />
        </el-form-item>
        <el-form-item>
          <el-input v-model.number="editForm.sort" placeholder="请输入排序,越小权越靠前" />
        </el-form-item>
        <el-form-item>
          <span>是否开启true为开启 </span>
          <el-switch v-model="editForm.status" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 80%; margin: 0 auto" @click="editCate(editFormRef)">确认</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { editBoxVisible, editForm, editCate, editrules } from './editCate';
import { Delete, Edit } from '@element-plus/icons-vue';
const editFormRef = ref();
</script>

<style></style>
