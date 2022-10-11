<!--
 * @Author: your name
 * @Date: 2022-01-14 12:37:25
 * @LastEditTime: 2022-01-15 16:31:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\components\pagination.vue
-->
<template>
  <div class="pagination">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  components: {
    // [Button.name]: Button // 此处是引入组件名字的方法
  },
  props: {
    pageSize: {
      type: Number,
      default: Number,
    },
    total: {
      type: Number,
      default: Number,
    },
    currentPage: {
      type: Number,
      default: Number,
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
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
  },
};
</script>

<style lang="scss">
.pagination {
  text-align: right;
  padding: 0px 20px;
  .el-pagination__total,
  .el-pagination__sizes,
  .el-pager,
  .el-pagination__jump {
    color: #fff;
    font-size: 16px !important;
  }
}
</style>
