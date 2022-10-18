<template>
  <loginBg></loginBg>
  <loginBgTWO></loginBgTWO>
  <div style="height: 100vh; overflow: hidden; position: fixed; z-index: 8">
    <particlesJS></particlesJS>
  </div>
  <div class="loginPage" ref="aa">
    <el-form :model="form" class="loginForm" :rules="rules" ref="ruleFormRef">
      <h2>莱头条管理系统</h2>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" />
      </el-form-item>

      <el-form-item>
        <el-button class="loginBtn" type="primary" @click="onSubmit(ruleFormRef)">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
//导入粒子特效
import loginBgTWO from '@/components/cloudBg.vue';
import loginBg from '@/components/clou.vue';
import particlesJS from '@/components/particlesJS/particlesJS.vue';
// 引入表单验证规则
import { rules } from './rules.js';
//点击登录触发校验
import validate from './validate.js';
//使用了按需所以就注释了
// import { ElMessage } from 'element-plus';
//登录相关的接口及参数
import { form, loginAction } from './loginAction';
//pinia获取数据
import useUserStore from '@/store/user';
//引入pinia获取里面的方法，这里要使用在名字后加()
import usePublicStore from '@/store/public';
//引入路由
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const ruleFormRef = ref();
//  获取dom    名字和dom里ref的名字重复  会当成获取dom的操作
async function onSubmit(formEl) {
  let validateRes = await validate(formEl);
  console.log(validateRes);
  if (!validateRes) return;
  loginAction().then((res) => {
    let { code } = res;
    if (code !== 0) {
      ElMessage({
        type: 'error',
        message: res.msg || '登陆失败',
      });
    } else {
      ElMessage({
        type: 'success',
        message: '登陆成功',
      });

      let { token, tokenExpired, uid, userInfo } = res;
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpired', tokenExpired);

      userStore.changeUid(uid);
      userStore.changeUerInfo(userInfo);
      // 保存菜单信息
      const { getMenu } = usePublicStore();
      getMenu(router);
      setTimeout((v) => {
        router.push('/');
      }, 500);
    }
  });
}
</script>

<style>
.loginPage {
  overflow: hidden;
}
.loginForm h2 {
  text-align: center;
}

.loginForm {
  position: fixed;
  top: 20vh;
  left: calc(50% - 190px);

  z-index: 9;
  width: 280px;
  padding: 50px;
  background-color: aliceblue;
  margin: 30px auto 0;
  border-radius: 5px;
}
.loginForm .loginBtn {
  margin: 0 auto;
  width: 80%;
}
</style>
