/*
 * @Author: your name
 * @Date: 2022-01-11 11:19:49
 * @LastEditTime: 2022-03-10 13:55:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import cache from "../views/cache";
import scanCodeState from "../views/scanCodeState";
import goodsShelves from "../views/goodsShelves";

Vue.use(VueRouter);

const routes = [
  {
    path: "/cache",
    name: "cache",
    component: cache,
  },
  {
    path: "/",
    name: "goodsShelves",
    component: goodsShelves,
  },
  {
    path: "/scanCodeState",
    name: "scanCodeState",
    component: scanCodeState,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
