<!--
 * @Author: your name
 * @Date: 2022-01-14 10:48:39
 * @LastEditTime: 2022-02-15 15:18:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\components\table.vue
-->
<template>
  <div class="table">
    <el-table :data="tableData" height="100%" style="width: 100%">
      <el-table-column
        :prop="v.prop"
        :label="v.label"
        v-for="(v, i) in tableHeader"
        :key="i"
        align="center"
        :width="v.width"
      >
        <template slot-scope="scope">
          <span v-if="!v.judge"> {{ scope.row[v.prop] }}</span>
          <span
            v-if="v.judge && scope.row[v.prop] === v.judge.success.val"
            :style="'color:' + v.judge.success.color"
          >
            {{ scope.row[v.prop] }}</span
          >
          <span
            v-if="v.judge && scope.row[v.prop] === v.judge.fail.val"
            :style="'color:' + v.judge.fail.color"
          >
            {{ scope.row[v.prop] }}</span
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
    // [Button.name]: Button // 此处是引入组件名字的方法
  },
  props: {
    tableData: {
      type: Array,
      default: Array,
    },
    tableHeader: {
      type: Array,
      default: Array,
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
  methods: {},
};
</script>

<style lang="scss">
.table {
  padding: 20px;
  height: 100%;
  .el-table,
  .el-table tr,
  .el-table td,
  .el-table th {
    background-color: transparent;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
  }
  .el-table tbody tr:hover > td {
    background-color: transparent;
  }
  .el-table--scrollable-y ::-webkit-scrollbar {
    display: none;
  }
}
</style>
