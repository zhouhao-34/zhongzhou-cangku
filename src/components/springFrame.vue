<!--
 * @Author: your name
 * @Date: 2022-02-16 13:43:05
 * @LastEditTime: 2022-02-16 15:38:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\components\springFrame.vue
-->
<template>
  <div class="springFrame" v-if="bool">
    <div class="subject">
      <div class="title">{{ title }}</div>
      <div class="text">{{ text }}</div>
      <div class="button">
        <div class="determine" @click="determine">确定</div>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
    // [Button.name]: Button // 此处是引入组件名字的方法
  },
  props: {
    bool: {
      default: false,
    },
    cancelShow: {
      default: true,
    },
    title: {
      default: "提示",
    },
    text: {
      default: "提示文字",
    },
  },
  data() {
    return {};
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
    cancel() {
      this.$emit("cancel");
    },
    determine() {
      this.$emit("determine");
    },
  },
};
</script>

<style scoped lang="scss">
.springFrame {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  .subject {
    width: 600px;
    height: 450px;
    background: #dcdfe6;
    border-radius: 60px;
    .title {
      height: 60px;
      line-height: 60px;
      text-align: center;
      border-bottom: 1px solid #e6a23c;
      font-size: 40px;
      font-weight: 500;
    }
    .text {
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 45px;
      padding: 0px 20px;
      word-break: break-all;
    }
    .button {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .cancel,
      .determine {
        width: 150px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
        cursor: pointer;
        color: #fff;
        font-size: 25px;
      }
      .cancel {
        background: #e6a23ccc;
      }
      .determine {
        background: #65d82bd2;
      }
    }
  }
}
</style>
