//  关于用户信息的存储

import { defineStore } from 'pinia';

export default defineStore('user', {
  state: () => {
    return {
      uid: '',
      userInfo: {},
    };
  },

  actions: {
    changeUid(val) {
      this.uid = val;
    },
    changeUerInfo(val) {
      this.userInfo = val;
    },
  },
});
