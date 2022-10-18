//  关于用户信息的存储

import { defineStore } from 'pinia';

import { getMenu as getMenuAction } from '@/api/user';

import { addRoute } from '@/common/routerUtil';

export default defineStore('public', {
  state: () => {
    return {
      menu: [],
    };
  },

  actions: {
    getMenu(router) {
      return getMenuAction().then((res) => {
        // console.log(router);
        if (res.code == 0) {
          console.log('-----------拿到menu信息 ------------');
          this.menu = res.data;
          console.log('-----------解析菜单 生成路由 ------------');
          addRoute(router, res.data);
          console.log('-----------路由生成成功 ------------');
          // return 123;
        }
      });
      // .then((res) => {
      //   return res + 1;
      // })
      // .catch((err) => {});
    },
  },
});
