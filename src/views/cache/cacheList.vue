<!--
 * @Author: your name
 * @Date: 2022-01-13 15:39:31
 * @LastEditTime: 2022-01-14 18:24:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\views\cache\cacheList.vue
-->
<template>
  <div class="cacheList">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="工单查询">
        <el-input
          v-model="formInline.user"
          placeholder="请输入要查询的工单"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <Table
      style="height: calc(100% - 120px)"
      :tableData="tableData"
      :tableHeader="tableHeader"
    ></Table>
    <Pagination
      :pageSize="pageSize"
      :total="total"
      :currentPage="currentPage"
    ></Pagination>
  </div>
</template>

<script>
// 表格插件
import Table from "../../components/table.vue";
// 分页插件
import Pagination from "../../components/pagination.vue";
export default {
  name: "",
  components: {
    Table,
    Pagination,
  },
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {
      // 查询数据
      formInline: {},
      // 表格数据
      tableData: [
        { 1: "218333", 2: "VAT-TESTK", 3: 31, 4: "扫描未成功", 5: "是" },
        { 1: "218333", 2: "VAT-TESTK", 3: 31, 4: "扫描未成功", 5: "是" },
        { 1: "218333", 2: "VAT-TESTK", 3: 31, 4: "扫描未成功", 5: "是" },
        { 1: "218333", 2: "VAT-TESTK", 3: 31, 4: "扫描未成功", 5: "是" },
        { 1: "218333", 2: "VAT-TESTK", 3: 31, 4: "扫描未成功", 5: "是" },
        { 1: "218333", 2: "VAT-TESTK", 3: 31, 4: "扫描未成功", 5: "是" },
        { 1: "218333", 2: "VAT-TESTK", 3: 31, 4: "扫描未成功", 5: "否" },
      ],
      // 表格表头
      tableHeader: [
        { prop: "1", label: "订单号" },
        { prop: "2", label: "客户" },
        { prop: "3", label: "等待时间(min)" },
        { prop: "4", label: "等待原因" },
        {
          prop: "5",
          label: "镜架是否备好",
          judge: {
            success: { val: "是", color: "#67C23A" },
            fail: {
              val: "否",
              color: "#F56C6C",
            },
          },
        },
      ],
      // 每页多少条
      pageSize: 10,
      // 总条数
      total: 100,
      // 当前页
      currentPage: 1,
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

<style lang="scss">
.cacheList {
  height: 100%;
  .el-form {
    .el-form-item__label {
      font-size: 18px;
      color: #fff;
    }
  }
  .table {
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
  }
  .pagination {
    text-align: right;
    .el-pagination__total,
    .el-pagination__jump {
      color: #fff;
    }
  }
}
</style>
