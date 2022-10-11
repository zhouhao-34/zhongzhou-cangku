<!--
 * @Author: your name
 * @Date: 2022-03-24 10:50:16
 * @LastEditTime: 2022-09-23 11:09:06
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\views\goodsShelves\query.vue
-->
<template>
  <div class="query">
    <div class="form">
      <el-form
        :rules="rules"
        ref="ruleForm"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item
          :label="v.label"
          v-for="(v, i) in formHeader"
          :key="i"
          :prop="v.prop"
        >
          <el-input
            v-if="v.type === 'input'"
            v-model="formInline[v.prop]"
            :placeholder="v.label"
          ></el-input>
          <el-select
            v-if="v.type === 'select'"
            clearable
            v-model="formInline[v.prop]"
            :placeholder="v.label"
          >
            <el-option
              v-for="item in v.option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Table
      style="height: calc(100% - 140px)"
      :tableData="tableData"
      :tableHeader="tableHeader"
    ></Table>
    <Pagination
      :pageSize="pageSize"
      :total="total"
      :currentPage="currentPage"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
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
      // 条件查询
      formInline: {
        jinjiaCode: "",
      },
      // 条件查询的表头
      formHeader: [{ label: "工单号", prop: "jinjiaCode", type: "input" }],
      // 校验
      rules: {},
      // 表格数据
      tableData: [],
      // 表格表头
      tableHeader: [
        // { prop: "barCode", label: "镜片信息" },
        { prop: "jinjiaCode", label: "工单号" },
        { prop: "cangkuCode", label: "仓位号" },
        { prop: "createTime", label: "入库时间" },
        { prop: "createTimeTwo", label: "出库时间" },
        // { prop: "shijian", label: "停留时间(s)" },
      ],

      // 每页多少条
      pageSize: 10,
      // 总条数
      total: 480,
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
  mounted() {
    this.$_showLoading();
    window.vue = this;
    this.queryData();
  },
  methods: {
    // 查询数据
    async queryData() {
      this.$_showLoading();
      let res = null;
      // eslint-disable-next-line no-undef
      res = await frmKuchun.kucunjilu_class(
        this.currentPage - 1,
        this.pageSize,
        this.formInline.jinjiaCode
      );
      res = JSON.parse(res);
      this.tableData = res.data;
      this.total = res.total;
      console.log("res: ", res);
      this.$_hideLoading();
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].createTime !== null) {
          this.tableData[i].createTime = this.tableData[i].createTime.replace(
            "T",
            " "
          );
          if (this.tableData[i].createTimeTwo !== undefined) {
            this.tableData[i].createTimeTwo = this.tableData[
              i
            ].createTimeTwo.replace("T", " ");
          }

          let time = new Date().getTime();
          let time2 = new Date(this.tableData[i].createTime);
          this.tableData[i].shijian = ((time - time2) / 1000).toFixed(0);
        }
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 0;
      this.$_showLoading();
      this.queryData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$_showLoading();
      this.queryData();
    },
  },
};
</script>

<style lang="scss">
.query {
  height: 100%;
  padding: 20px;
  .form {
    padding: 0px 20px;
    .el-form {
      .el-form-item__label {
        font-size: 18px;
        color: #fff;
      }
      .el-form-item__error {
        font-size: 16px;
        color: red;
      }
      .el-input__inner {
        height: 30px;
        width: 200px;
      }
      .el-input--suffix {
        width: 150px;
        .el-input__inner {
          width: 150px;
        }
      }
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
