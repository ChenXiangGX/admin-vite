import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// createApp(App).mount('#app');
const app = createApp(App);

// 路由
import router from './router';
//之所以把这里的app.use(router);写在26行因为路由守卫判断uid，咱们router引用了但是25行的promise还没获取到uid
// app.use(router);

//pinia
import { createPinia } from 'pinia';
app.use(createPinia());
//  element-plus
//全局
//使用了按需所以就注释了
// import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// app.use(ElementPlus);

import init from '@/common/init.js';
//配合侧边栏的菜单，动态生成图标，把图片放到全局
import * as Icons from '@element-plus/icons-vue';
import xIcon from '@/components/x-icon/index.vue';

for (let i in Icons) {
  app.component(i, Icons[i]);
}

app.component('xIcon', xIcon);

init().then((res) => {
  console.log('开始挂载');
  app.use(router);
  app.mount('#app');
});
