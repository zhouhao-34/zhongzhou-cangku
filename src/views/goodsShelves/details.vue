<!--
 * @Author: your name
 * @Date: 2022-01-14 09:56:18
 * @LastEditTime: 2022-01-14 10:16:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\views\goodsShelves\details.vue
-->
<template>
  <div class="details">
    <div
      v-for="(v, i) in goodsShelvesData"
      :key="i"
      class="row border"
      :class="i + 1 !== goodsShelvesData.length ? 'border' : ''"
    >
      <div>{{ i + 1 }}列</div>
      <div v-for="(x, y) in v" :key="y" class="col">
        <i
          class="el-icon-box"
          :style="x === '0' ? ' color:#F56C6C' : ' color:#67C23A'"
        ></i>
        <span class="num">{{ y + 1 }}</span>
      </div>
    </div>
    <div class="legend">
      <div>
        <i class="el-icon-box" style="color: #f56c6c"></i><span> 被占用</span>
      </div>
      <div>
        <i class="el-icon-box" style="color: #67c23a"></i><span> 未占用</span>
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
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {
      //货架数据
      goodsShelvesData: [
        ["1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
        ["1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0"],
      ],
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
  methods: {},
};
</script>

<style scoped lang="scss">
.details {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .row {
    display: flex;
    flex-direction: column;
    align-items: center;
    .col {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 5px;
      font-size: 20px;
      .num {
        font-size: 14px;
      }
    }
  }
  //   .border {
  //     border-right: 1px solid;
  //     border-left: 1px solid;
  //   }
  .legend {
    display: flex;
    flex-direction: column;
    font-size: 20px;
  }
}
</style>
