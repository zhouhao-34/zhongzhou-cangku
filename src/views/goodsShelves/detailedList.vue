<!--
 * @Author: your name
 * @Date: 2022-01-13 17:42:23
 * @LastEditTime: 2022-09-19 09:34:46
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\views\goodsShelves\detailedList.vue
-->
<template>
  <div class="detailedList">
    <div class="goodsShelves">
      <div
        class="border"
        @click="selectClick('0')"
        :class="goodsShelvesSelect === '0' ? 'select' : ''"
      >
        <div>全部</div>
      </div>
      <div
        class="border"
        @click="selectClick('1')"
        :class="goodsShelvesSelect === '1' ? 'select' : ''"
      >
        <div>货架A</div>
      </div>
      <div
        class="border"
        :class="goodsShelvesSelect === '2' ? 'select' : ''"
        @click="selectClick('2')"
      >
        <div>货架C</div>
      </div>
      <div
        class="border"
        :class="goodsShelvesSelect === '3' ? 'select' : ''"
        @click="selectClick('3')"
      >
        <div>货架B</div>
      </div>
      <div
        class="border"
        :class="goodsShelvesSelect === '4' ? 'select' : ''"
        @click="selectClick('4')"
      >
        <div>货架D</div>
      </div>
    </div>
    <div class="available">
      <div>
        <span>总仓位数</span>：
        <span class="num">{{ totalPosition }}</span>
      </div>
      <div class="underline">
        <span
          @click="queryLocation(1)"
          :class="formInline.cangweiStatus === 1 ? 'select' : ''"
          >可用仓位</span
        >：
        <span class="num">{{ available }}</span>
      </div>
      <div class="underline">
        <span
          @click="queryLocation(2)"
          :class="formInline.cangweiStatus === 2 ? 'select' : ''"
          >已用仓位</span
        >
        ：<span class="num">{{ availableNo }}</span>
      </div>
      <!-- <el-popover placement="right" width="500" trigger="click">
        <Details></Details>
        <span class="but" slot="reference">详情</span>
      </el-popover> -->
    </div>
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
          <el-button
            type="primary"
            @click="checkData('ruleForm')"
            :disabled="bool"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <Table
      style="height: calc(100% - 280px)"
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
// import Details from "./details.vue";
export default {
  name: "",
  components: {
    Table,
    Pagination,
    // Details,
  },
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },

  data() {
    var validateKuweihao = (rule, value, callback) => {
      // if (value === "") {
      //   callback(new Error("请再次输入密码"));
      // } else if (value !== this.ruleForm.pass) {
      //   callback(new Error("两次输入密码不一致!"));

      if (value !== undefined && value !== "") {
        console.log(!isNaN(value[2]));

        if (value.length < 5) {
          return callback(new Error("仓位号格式不正确"));
        }
        console.log(value[3]);
        if (
          value[0] !== "A" &&
          value[0] !== "B" &&
          value[0] !== "C" &&
          value[0] !== "D" &&
          value[0] !== "a" &&
          value[0] !== "b" &&
          value[0] !== "c" &&
          value[0] !== "d"
        ) {
          return callback(new Error("仓位号格式不正确"));
        }
        if (
          (value[1] !== "0" && value[1] !== "1") ||
          (value[3] !== "0" && value[3] !== "1")
        ) {
          return callback(new Error("仓位号格式不正确"));
        }
        if (isNaN(value[2]) || isNaN(value[4])) {
          return callback(new Error("仓位号格式不正确"));
        } else {
          if (value[1] === "1" && value[2] * 1 > 0) {
            return callback(new Error("仓位号格式不正确"));
          }
          if (value[3] === "1" && value[4] * 1 > 2) {
            return callback(new Error("仓位号格式不正确"));
          }
        }
      }

      callback();
    };
    return {
      rloading: null,
      //总仓位
      totalPosition: 480,
      // 可用仓位
      available: 0,
      // 不可用仓位
      availableNo: 0,
      // 选中的货架
      goodsShelvesSelect: "0",
      // 条件查询
      formInline: {
        kuweihao: "",
        jinjiaCode: "",
        ckStatus: "",
        barCode: "",
        cangweiStatus: 0,
      },
      // 条件查询的表头
      formHeader: [
        { label: "仓位号", prop: "kuweihao", type: "input" },
        { label: "镜架工单号", prop: "jinjiaCode", type: "input" },
        {
          label: "状态",
          prop: "ckStatus",
          type: "select",
          option: [
            { label: "待匹配", value: "待匹配" },
            { label: "已匹配", value: "已匹配" },
          ],
        },
        { label: "镜片工单号", prop: "barCode", type: "input" },
      ],
      // 校验
      rules: { kuweihao: [{ validator: validateKuweihao, trigger: "blur" }] },
      // 表格数据
      tableData: [],
      // 表格表头
      tableHeader: [
        { prop: "kuweihao", label: "仓位号" },
        // { prop: "cangkuCode", label: "旋转仓库编号" },
        // { prop: "columnCode", label: "列号" },
        // { prop: "rowCode", label: "行号" },
        { prop: "jinjiaCode", label: "工单号" },
        { prop: "ckStatus", label: "状态" },
        // { prop: "barCode", label: "镜片工单号" },
        { prop: "createTime", label: "入库时间" },
        { prop: "shijian", label: "停留时间(min)" },
      ],

      // 每页多少条
      pageSize: 10,
      // 总条数
      total: 480,
      // 当前页
      currentPage: 1,
      bool: false,
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
    setTimeout(() => {
      this.queryData();
    }, 1000);
    // setInterval(() => {
    //   this.$_showLoading();
    //   this.queryData();
    // }, 1000);
  },
  methods: {
    // 查询数据
    async queryData() {
      let res = null;
      if (this.goodsShelvesSelect === "0") {
        console.log(
          this.currentPage - 1,
          this.pageSize,
          JSON.stringify(this.formInline)
        );
        // eslint-disable-next-line no-undef
        res = await frmKuchun.kucun_All(
          this.currentPage - 1,
          this.pageSize,
          JSON.stringify(this.formInline)
        );
      } else {
        console.log(
          this.currentPage - 1,
          this.pageSize,
          this.goodsShelvesSelect === "1"
            ? "A"
            : this.goodsShelvesSelect === "2"
            ? "C"
            : this.goodsShelvesSelect === "3"
            ? "B"
            : "D",
          JSON.stringify(this.formInline)
        );
        // eslint-disable-next-line no-undef
        res = await frmKuchun.kucun_class(
          this.currentPage - 1,
          this.pageSize,
          this.goodsShelvesSelect === "1"
            ? "A"
            : this.goodsShelvesSelect === "2"
            ? "C"
            : this.goodsShelvesSelect === "3"
            ? "B"
            : "D",
          JSON.stringify(this.formInline)
        );
      }
      console.log(res);
      if (this.goodsShelvesSelect === "0") {
        this.totalPosition = 480;
      } else {
        this.totalPosition = 120;
      }
      this.tableData = res[2];
      this.total = res[0][0];
      this.available = this.totalPosition - res[3][0];
      this.availableNo = res[3][0];
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].createTime !== null) {
          let time = new Date().getTime();
          this.tableData[i].shijian = (
            (time - this.tableData[i].createTime.getTime()) /
            60000
          ).toFixed(0);
          this.tableData[i].createTime = this.timestampToTime(
            this.tableData[i].createTime
          );
        }
        this.tableData[i].kuweihao =
          this.tableData[i].cangkuCode +
          this.tableData[i].columnCode +
          this.tableData[i].rowCode;
      }
      this.bool = false;
      this.$_hideLoading();
    },
    // 校验数据
    checkData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.bool = true;
          this.$_showLoading();
          this.queryData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 仓位查询
    queryLocation(v) {
      if (this.formInline.cangweiStatus === v) {
        this.formInline.cangweiStatus = 0;
      } else {
        this.formInline.cangweiStatus = v;
      }
      this.$_showLoading();
      this.queryData();
    },
    // 切换货架
    selectClick(v) {
      this.currentPage = 0;
      for (const key in this.formInline) {
        this.formInline[key] = "";
      }
      this.formInline.cangweiStatus = 0;
      this.goodsShelvesSelect = v;
      this.$_showLoading();
      this.queryData();
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
    // 时间格式化
    timestampToTime(timestamp) {
      var date = new Date(timestamp);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    },
  },
};
</script>

<style lang="scss">
.detailedList {
  height: 100%;
  position: relative;
  .goodsShelves {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    border-bottom: 5px solid #e4e7ed;
    .border {
      height: 40px;
      text-align: center;
      font-size: 28px;
      font-weight: 600;
      cursor: pointer;
      color: #fff;
      padding: 0px 40px;
      border: solid 3px;
      transform: skewX(-40deg);
      > div {
        transform: skewX(40deg);
      }
    }

    .select {
      color: #ffd240;
      background: #4da0f33d;
    }
  }
  .available {
    padding: 20px;
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    display: flex;
    > div {
      margin-right: 20px;
      .num {
        font-weight: 700;
      }
    }
    .underline {
      span:nth-child(1) {
        border-bottom: 1px solid #fff;
        cursor: pointer;
      }
      .select {
        border-bottom: 1px solid #ffd240 !important;
        color: #ffd240;
      }
    }
    .but {
      cursor: pointer;
      margin-left: 30px;
      border-bottom: 1px solid #fff;
    }
  }
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
