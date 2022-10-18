<template>
  <div class="tableLayout">
    <el-page-header content="文章管理" @back="$router.back()" />
    <el-divider />

    <el-row>
      <el-col :span="6">
        <el-select v-model="queryForm.cateId" class="m-2" placeholder="请选择分类" clearable>
          <el-option v-for="item in cateDate" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input v-model="queryForm.userId" placeholder="请输入要查询的用户的Id" />
      </el-col>
      <el-col :span="6">
        <el-date-picker v-model="queryForm.startTime" type="date" placeholder="Pick a day" />
        <el-date-picker v-model="queryForm.endTime" type="date" arrow-control placeholder="请输入结束时间" />
      </el-col>
      <el-col :span="6">
        <el-input v-model="queryForm.keyWord" placeholder="请输入关键字" />
      </el-col>
      <el-col :span="4" style="display: flex">
        <el-button type="primary" @click="query">确认</el-button>

        <el-button type="primary" @click="createBoxVisible = true">新增文章</el-button>
      </el-col>
    </el-row>

    <el-table :data="listData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="cate_name" label="分类名字" width="180" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="author_id" label="用户id" />
      <!-- 另一种样式 -->
      <!-- <el-table-column fixed="right" label="操作" width="180">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="openUpdateDialog(row)">编辑</el-button>
          <el-popconfirm
            title="您确定要删除吗?"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="deleteCate(row._id)"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column> -->
      <el-table-column fixed="right" label="Operations" width="180">
        <!-- 通过打印的值#default="scope"是插槽的值里面有row对象可以找到 -->
        <template #default="{ row }">
          <el-popconfirm title="您确认删除吗?" @confirm="deleteCate(row._id)">
            <template #reference>
              <el-button type="primary" :icon="Delete" color="#626aef" />
            </template>
          </el-popconfirm>

          <el-button type="primary" :icon="Edit" color="#626aef" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="currentChange" :key="refreshKey" layout="prev, pager, next" :total="total" />
  </div>
  <!--  新增文章的弹出层 -->
  <el-dialog v-model="createBoxVisible" title="新增文章" width="700px" center>
    <template #default>
      <el-form :model="createForm" ref="addFormRef">
        <el-form-item
          ><el-select v-model="createForm.cateItem" class="m-2" placeholder="请选择分类" clearable>
            <el-option
              v-for="item in cateDate"
              :key="item._id"
              :label="item.name"
              :value="item._id + '-' + `${item.name}`"
            /> </el-select
        ></el-form-item>
        <el-form-item>
          <addimg></addimg>
        </el-form-item>
        <el-form-item>
          <el-input v-model="createForm.title" placeholder="请输入文章标题" />
        </el-form-item>
        <!-- 内容 -->
        <el-form-item>
          <!-- <el-input input type="textarea" v-model="createForm.name" /> -->
          <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
            <Editor
              style="height: 320px; overflow-y: hidden"
              v-model="createForm.content"
              :defaultConfig="editorConfig"
              @onCreated="handleCreated"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 80%; margin: 0 auto" @click="createCate(addFormRef)">确认</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>

<script setup>
import { cateDate, getCate, queryForm, query, listData, total, currentChange, refreshKey } from './get';
import { Delete, Edit } from '@element-plus/icons-vue';
import { createBoxVisible, createForm, createCate } from './createCate'; //增
import { onMounted } from 'vue';
import addimg from './addimg.vue';

import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import { onBeforeUnmount, ref, shallowRef } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
const addFormRef = ref();
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
// const valueHtml = ref('<p>hello</p>');

// // 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
//   }, 1500);
// });

const toolbarConfig = {};
const editorConfig = { placeholder: '快来发布文章吧💕💕💕' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

//获取分类

onMounted(() => {
  getCate();
  query();
});
</script>

<style></style>
