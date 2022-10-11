/*
 * @Author: your name
 * @Date: 2022-01-11 11:19:22
 * @LastEditTime: 2022-09-23 14:20:16
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import loading from "./components/loading";
import springFrame from "./components/springFrame.vue";
import HttpPlugin from './http/http-plugin';

Vue.config.productionTip = false;
Vue.component("SpringFrame", springFrame); //全局自定义组件
Vue.use(loading);
Vue.use(ElementUI);
Vue.use(HttpPlugin); // 封装 get post delete put 请求
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
