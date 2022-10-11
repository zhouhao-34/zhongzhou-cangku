<!--
 * @Author: your name
 * @Date: 2022-01-13 08:40:18
 * @LastEditTime: 2022-08-09 16:23:56
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\views\scanCodeState\index.vue
-->
<template>
  <div class="scanCodeState">
    <div class="left">
      <div class="title">PLC状态</div>
      <div class="PLC">
        <div class="content">
          <div class="data" v-for="(v, i) in PLCLIst" :key="i">
            <div class="data-img">
              <img src="../../assets/设备管理.png" alt="" />
            </div>
            <div class="data-left">
              <div><span class="label">PLCip：</span>{{ v.IP }}</div>
              <div>
                <span class="label">连接状态：</span
                ><span
                  :style="v.Status === 1 ? 'color:#67C23A' : 'color:red'"
                  >{{ v.Status | stateFilters }}</span
                >
              </div>
            </div>
            <div class="data-right">
              <el-tooltip
                class="item"
                effect="dark"
                content="连接"
                placement="bottom"
              >
                <i class="el-icon-link"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="title">扫码枪状态</div>
      <div class="scanCode">
        <div class="content">
          <div class="data" v-for="(v, i) in scanCodeState" :key="i">
            <div class="data-img">
              <img src="../../assets/扫码.png" alt="" />
            </div>
            <div class="data-left">
              <div>
                <span class="label">扫码枪名称：</span>{{ v.ShebeiName }}
              </div>
              <div><span class="label">扫码枪ip：</span>{{ v.IP }}</div>
              <div>
                <span class="label">连接状态：</span
                ><span
                  :style="v.Status === 1 ? 'color:#67C23A' : 'color:red'"
                  >{{ v.Status | stateFilters }}</span
                >
              </div>
            </div>
            <div class="data-right">
              <el-tooltip
                class="item"
                effect="dark"
                content="连接"
                placement="bottom"
              >
                <i class="el-icon-link"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="title">扫码日志</div>
      <div class="scanCode-journal">
        <div class="content">
          <div
            v-for="(v, i) in scanCodeJournalList"
            :key="i"
            class="journalInformation"
          >
            <div class="scanCode">
              <div>{{ v.Shoutime }}</div>
              <div>
                <span class="shebeiName">{{ v.SaomaCode }}</span> &nbsp;
                <span v-if="v.SaomaData !== 'NG'" class="success"
                  >扫码成功</span
                >
                <span v-if="v.SaomaData === 'NG'" class="fail">扫码失败</span
                >&nbsp; (<span class="receiveVal">{{ v.SaomaData }}</span
                >)
              </div>
            </div>
            <div class="sendOut" v-if="v.SaomaData !== 'NG'">
              <div>{{ v.Fatime }}</div>
              <div>
                <span>发送PLC</span>&nbsp; (<span class="returnVal">
                  {{ v.Operate }}</span
                >)
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="title">连接日志</div>
      <div class="connect-journal">
        <div class="content">
          <div
            v-for="(v, i) in connectJournalList"
            :key="i"
            class="journalInformation"
          >
            <div>{{ v.LogDate }}</div>
            <div>{{ v.ShebeiName }}{{ v.Clientlog }}</div>
          </div>
        </div>
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
  filters: {
    // 状态过滤器
    stateFilters(v) {
      let val = "";
      switch (v) {
        case 2:
          val = "失败";
          break;

        case 1:
          val = "成功";
          break;
      }
      return val;
    },
  },
  data() {
    return {
      // plc数据
      PLCLIst: [],
      // 扫码枪状态数据
      scanCodeState: [],
      // 扫码日志信息
      scanCodeJournalList: [],
      //连接日志信息
      connectJournalList: [],
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
    window.vue = this;
    this.$_showLoading();
    this.queryData();
    this.queryScanCodeLog();
  },
  methods: {
    async queryData() {
      // eslint-disable-next-line no-undef
      let res = await frmKuchun.lianjie();
      console.log(JSON.parse(res));
      this.PLCLIst.splice(0, 1, JSON.parse(res)[0]);
      let arr = JSON.parse(res);
      this.scanCodeState = arr;
      this.scanCodeState.splice(0, 1);
      this.queryLog();
    },
    async queryLog() {
      // eslint-disable-next-line no-undef
      let res = await frmKuchun.log();
      console.log(JSON.parse(res), "log");
      this.connectJournalList = JSON.parse(res);
      this.$_hideLoading();
    },
    // 查询扫码日志
    async queryScanCodeLog() {
      // eslint-disable-next-line no-undef
      let res = await frmKuchun.saomiaoLog();
      console.log(JSON.parse(res), "queryScanCodeLog");
      this.scanCodeJournalList = JSON.parse(res);
    },
    // 扫码日志最新数据
    setScanCodeLog(data) {
      console.log(data, "接收到的数据");
      this.scanCodeJournalList.splice(0, 0, data);
    },
  },
};
</script>

<style scoped lang="scss">
.scanCodeState {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  padding: 40px;
  .left {
    height: 100%;
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 24px;
      color: #fff;
      font-weight: 700;
    }
    .PLC {
      width: 100%;
      border: 5px solid #dcdfe6;
      border-radius: 10px;
      position: relative;
      padding: 20px;
      box-sizing: border-box;
      .content {
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .data {
          border: 1px solid #dcdfe6;
          background: #e4e7ed;
          padding: 20px;
          width: 45%;
          box-sizing: border-box;
          height: 100px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .data-img {
            img {
              width: 40px;
              height: 40px;
            }
          }
          .data-left {
            font-size: 20px;
            font-weight: 600;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .label {
              display: inline-block;
              width: 100px;
              text-align: right;
            }
          }
          .data-right {
            width: 20%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            i {
              font-size: 24px;
              cursor: pointer;
              color: #409eff;
            }
          }
        }
      }
    }
    .scanCode {
      height: 70%;
      border: 5px solid #dcdfe6;
      border-radius: 10px;
      position: relative;
      padding: 20px;
      box-sizing: border-box;
      .title {
        position: absolute;
        top: -40px;
        font-size: 24px;
        color: #fff;
        font-weight: 700;
      }
      .content {
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .data {
          border: 1px solid #dcdfe6;
          background: #e4e7ed;
          padding: 20px;
          width: 45%;
          box-sizing: border-box;
          height: 130px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .data-img {
            img {
              width: 40px;
              height: 40px;
            }
          }
          .data-left {
            width: 70%;
            font-size: 20px;
            font-weight: 600;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .label {
              display: inline-block;
              width: 120px;
              text-align: right;
            }
          }
          .data-right {
            width: 10%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            i {
              font-size: 24px;
              cursor: pointer;
              color: #409eff;
            }
          }
        }
      }
    }
  }
  .right {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 24px;
      color: #fff;
      font-weight: 700;
    }
    .connect-journal,
    .scanCode-journal {
      background: #fff;
      height: calc(50% - 127px);
      border: 5px solid #dcdfe6;
      border-radius: 10px;
      padding: 20px;
      box-sizing: border-box;
      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
        .journalInformation {
          padding: 20px;
          background: #dcdfe6;
          border-radius: 10px;
          margin-bottom: 20px;
          font-size: 16px;
        }
      }
      ::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
    }
    .scanCode-journal {
      height: 50%;
      .journalInformation {
        display: flex;
        .scanCode {
          width: 50%;
          .shebeiName,
          .receiveVal {
            font-weight: 600;
          }
          .success {
            color: #67c23a;
          }
          .fail {
            color: #f56c6c;
          }
        }
        .sendOut {
          .returnVal {
            font-weight: 600;
          }
          .success {
            color: #67c23a;
          }
          .fail {
            color: #f56c6c;
          }
        }
      }
    }
  }
}
</style>
