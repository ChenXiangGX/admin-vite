<template>
  <el-tabs type="border-card">
    <el-tab-pane label="修改资料">
      <div style="margin: 20px" />
      <el-form label-position="left">
        <el-form-item style="max-width: 460px" label="用户名称">
          <el-input v-model="user.nickname" />
        </el-form-item>
        <el-form-item label="出生年月">
          <div class="block">
            <el-date-picker
              v-model="value2"
              type="date"
              placeholder="Pick a day"
              :disabled-date="disabledDate"
              :shortcuts="shortcuts"
            />
          </div>
        </el-form-item>
        <el-button type="primary" @click="send">更新资料</el-button>
      </el-form></el-tab-pane
    >
    <el-tab-pane label="修改密码">
      <div style="margin: 20px" />
      <el-form :model="userPass" style="max-width: 460px" :rules="rules" ref="ruleFormRef">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="userPass.oldPassword" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="userPass.newPassword" />
        </el-form-item>
        <el-button type="primary" @click="editPass(ruleFormRef)">确认修改</el-button>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { editUserInfo } from '@/api/user';
import useUserStore from '@/store/user';
import { formDate } from '@/com/date';
//验证规则
import { rules } from './rule';
//修改密码内容验证
import validate from './validate';
//接口
import { updatePwd } from '@/api/user';
import { useRouter } from 'vue-router';
let router = useRouter();
const userStore = useUserStore();
let user = reactive({
  nickname: '',
});
let uid = userStore.uid;
/**
 * @msg :修改信息的方法
 * @param { STRING } 形参birthday
 * @param { STRING } 形参nickname
 * @param { STRING } 形参uid
 * @return :
 */
function send() {
  let birthday = formDate(value2.value);
  //   console.log(birthday);
  let { nickname } = user;
  editUserInfo({
    birthday,
    nickname,
    uid,
  })
    .then((res) => {
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
      userStore.userInfo.nickname = nickname;
      userStore.userInfo.birthday = birthday;
      user.nickname = '';
      // console.log(res);
    })
    .catch((err) => {});
}
//日期
let value2 = ref('');
const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
];
const disabledDate = (time) => {
  return time.getTime() > Date.now();
};
//修改密码
let userPass = reactive({
  oldPassword: '',
  newPassword: '',
});
let ruleFormRef = ref();
async function editPass(formEl) {
  let validateRes = await validate(formEl);
  console.log(validateRes);
  if (!validateRes) return;
  let { oldPassword, newPassword } = userPass;
  updatePwd({
    uid,
    oldPassword,
    newPassword,
  }).then((res) => {
    ElMessage({
      type: 'success',
      message: '修改成功',
    });
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
<style>
/* 日期选择 */
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
