<!--
 * @Author: your name
 * @Date: 2022-01-11 11:19:22
 * @LastEditTime: 2022-03-24 10:32:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\App.vue
-->
<template>
  <div id="app">
    <div class="menu">
      <el-button
        icon="el-icon-menu"
        circle
        class="menu-button"
        @click="menuClick"
      ></el-button>
      <div class="menu-option" id="menu-option">
        <!-- <div class="menuButton" @click="jump('cache')">
          <img class="menu-option-img" src="./assets/缓存.png" alt="" />
        </div> -->
        <div class="menuButton" @click="jump('')">
          <img class="menu-option-img" src="./assets/货架.png" alt="" />
        </div>
        <div class="menuButton" @click="jump('scanCodeState')">
          <img class="menu-option-img" src="./assets/设备状态.png" alt="" />
        </div>
        <!-- <div class="menuButton" @click="jump('lineTail')">
          <img class="menu-option-img" src="./assets/线尾.png" alt="" />
        </div> -->
      </div>
    </div>

    <router-view />
  </div>
</template>
<script>
export default {
  name: "",
  components: {
    // [Button.name]: Button // 此处是引入组件名字的方法
  },
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  filters: {},
  data() {
    return {
      //菜单开关
      menuSwitch: false,
    };
  },
  watch: {
    //***: {
    //immediate: false,
    // handler: function(v) {
    //console.log(v);
    //}
    //}
  },
  created() {},
  mounted() {},
  methods: {
    menuClick() {
      if (this.menuSwitch) {
        document.getElementById("menu-option").style.height = "0px";
      } else {
        document.getElementById("menu-option").style.height = "200px";
      }
      this.menuSwitch = !this.menuSwitch;
    },
    jump(v) {
      this.$router.push({ path: "/" + v });
      this.menuClick();
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,
body,
#app {
  margin: 0px;
  padding: 0px;
  height: 100%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#app {
  background-image: url("./assets/beijing.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 1017px;
  min-width: 1920px;
}
.menu {
  position: absolute;
  right: 20px;
  top: 10px;
  display: flex;
  flex-direction: column;
}
.menu-button {
  z-index: 9;
}
.menu-option {
  width: 40px;
  height: 0px;
  /* background: #dcdfe6;
  border-radius: 0px 0px 10px 10px; */
  z-index: 8;
  position: relative;
  top: -15px;
  transition: height 0.5s;
  -webkit-transition: height 0.5s; /* Safari */
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.menu-option-img {
  width: 20px;
  height: 20px;
}
.menuButton {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #fff;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
