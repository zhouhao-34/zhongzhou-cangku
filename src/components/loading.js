/*
 * @Author: your name
 * @Date: 2022-01-15 10:07:43
 * @LastEditTime: 2022-08-09 08:45:07
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\components\loading.js
 */

import { Loading } from "element-ui";
export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    // eslint-disable-next-line no-unused-vars
    let loadingCount = 0;
    let loading;
    const startLoading = () => {
      loading = Loading.service({
        lock: true,
        text: "加载中……",
        background: "rgba(0, 0, 0, 0.7)",
      });
    };
    const endLoading = () => {
      loadingCount = 0;
      loading.close();
    };
    Vue.prototype.$_showLoading = () => {
      if (loadingCount>0) {
        endLoading()
      }
      startLoading();
      setTimeout(() => {
        endLoading();
      }, 30000);
      loadingCount = 1;
    };
    Vue.prototype.$_hideLoading = () => {
      setTimeout(() => {
        endLoading();
      }, 500);
    };
  },
};
