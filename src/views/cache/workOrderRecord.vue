<!--
 * @Author: your name
 * @Date: 2022-01-13 17:09:57
 * @LastEditTime: 2022-01-14 13:20:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\views\cache\workOrderRecord.vue
-->
<template>
  <div class="workOrderRecord">
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
        {
          jt: "329183",
          shijian: "13:10",
          tiqi: "2022-1-14",
          jieguo: "上线",
          beizhu: "01",
          fasong: "成功",
        },
        {
          jt: "329183",
          shijian: "13:10",
          tiqi: "2022-1-14",
          jieguo: "上线",
          beizhu: "01",
          fasong: "成功",
        },
        {
          jt: "329183",
          shijian: "13:10",
          tiqi: "2022-1-14",
          jieguo: "上线",
          beizhu: "01",
          fasong: "成功",
        },
        {
          jt: "329183",
          shijian: "13:10",
          tiqi: "2022-1-14",
          jieguo: "上线",
          beizhu: "01",
          fasong: "成功",
        },
        {
          jt: "329183",
          shijian: "13:10",
          tiqi: "2022-1-14",
          jieguo: "上线",
          beizhu: "01",
          fasong: "失败",
        },
      ],
      // 表格表头
      tableHeader: [
        { prop: "jt", label: "工单号" },
        { prop: "shijian", label: "扫描时间" },
        { prop: "tiqi", label: "扫描日期" },
        { prop: "jieguo", label: "判断结果" },
        { prop: "beizhu", label: "备注" },
        {
          prop: "fasong",
          label: "数据发送",
          judge: {
            success: { val: "成功", color: "#67C23A" },
            fail: {
              val: "失败",
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
.workOrderRecord {
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
}
</style>
