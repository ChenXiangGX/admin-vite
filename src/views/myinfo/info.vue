<template>
  <div style="display: flex; flex-wrap: wrap; min-width: 300px">
    <el-card class="box-card">
      <template #header>
        <p style="margin: 0; background-color: #f0f3f4; text-align: center">个人资料</p>
        <div class="card-header">
          <!-- <span>Card name</span> -->
          <!--覆盖自带的上传行为 -->

          <el-upload action="" :http-request="handleRequest" :show-file-list="false">
            <div v-if="userStore.userInfo.avatar">
              <img :src="imageUrl" class="avatar" />
              <p class="avatarP">点击修改头像</p>
            </div>
            <div v-else>
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__text">点击上传头像</div>
            </div>
          </el-upload>
        </div>
      </template>
      <div class="infoMsg">
        <span>
          <el-icon size="18px"><Avatar /></el-icon>登录名称</span
        ><span>{{ userStore.userInfo.nickname }}</span>
      </div>
      <el-divider />
      <div class="infoMsg">
        <span
          ><el-icon size="18px"><Briefcase /></el-icon>所属部门</span
        ><span>{{ userStore.userInfo.role[0] }}</span>
      </div>

      <el-divider />
      <div class="infoMsg">
        <span
          ><el-icon size="18px"><PhoneFilled /></el-icon>手机号码</span
        ><span>{{ userStore.userInfo.username }}</span>
      </div>
      <el-divider />
      <div class="infoMsg">
        <span
          ><el-icon size="18px"><Discount /></el-icon>生日</span
        ><span>{{ userStore.userInfo.birthday }}</span>
      </div>
    </el-card>
    <div style="flex: 1">
      <infoModule></infoModule>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useUserStore from '@/store/user';
const userStore = useUserStore();
//上传头像的逻辑
import { handleRequest, upload, submit, imageUrl } from './upload';
//导入组件
import infoModule from './infoMdule.vue';
</script>
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.box-card {
  width: 300px !important;
}
.card-header > div:first-child {
  margin: 0 auto;
}
/* 取消头像外的padding */
.el-card__header {
  padding: 0;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.avatarP {
  text-align: center;
  margin: 0;
  padding: 0;
}
.el-divider--horizontal {
  margin: 9px 0;
}
.infoMsg {
  display: flex;
  justify-content: space-between;
}
.el-icon {
  vertical-align: sub;
}
</style>
