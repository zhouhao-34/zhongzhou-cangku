<!--
 * @Author: your name
 * @Date: 2022-01-13 17:28:35
 * @LastEditTime: 2022-08-09 16:46:07
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \webdemo\src\views\goodsShelves\index.vue
-->
<template>
  <div class="goodsShelves">
    <div class="goodsShelves-head">旋转货架</div>
    <div class="goodsShelves-content">
      <div class="left">
        <div
          v-for="(v, i) in menuList"
          :key="i"
          class="goodsShelvesMenu"
          :class="memuSelect === v.id ? 'goodsShelvesMenuSelect' : ''"
          @click="menuClick(v.id)"
        >
          <div class="img">
            <img :src="v.img" alt="" />
          </div>
          <div>{{ v.name }}</div>
        </div>
      </div>
      <div class="right">
        <detailedList
          ref="detailedList"
          v-if="memuSelect === '1'"
        ></detailedList>
        <query v-else-if="memuSelect === '3'"></query>
        <div v-else class="jianshe">
          <img src="../../assets/jianshe.png" alt="" />
          <div class="text">暂未开放</div>
        </div>
      </div>
    </div>
    <SpringFrame
      :bool="springFrameBoool"
      :text="springFrameText"
      :cancelShow="cancelShow"
      @cancel="springFrameCancel"
      @determine="springFrameDetermine"
    ></SpringFrame>
  </div>
</template>

<script>
// 货架清单
import detailedList from "./detailedList.vue";
// 查询
import query from "./query.vue";
export default {
  name: "",
  components: {
    detailedList,
    query,
  },
  props: {
    // ***: {
    //   type: ***,
    //   default: ***
    // }
  },
  data() {
    return {
      // 菜单列表
      menuList: [
        {
          name: "货架清单",
          img: require("../../assets/货架.png"),
          id: "1",
        },
        {
          name: "清库",
          img: require("../../assets/清库.png"),
          id: "5",
        },
        // {
        //   name: "清料",
        //   img: require("../../assets/清空.png"),
        //   id: "2",
        // },
        {
          name: "查询",
          img: require("../../assets/查询.png"),
          id: "3",
        },
        // {
        //   name: "拦截",
        //   img: require("../../assets/拦截订单.png"),
        //   id: "4",
        // },
      ],
      // 选中的菜单
      memuSelect: "1",
      // 弹窗开关
      springFrameBoool: false,
      // 取消按钮是否显示
      cancelShow: true,
      //弹窗文字
      springFrameText: "",
      // 刷新表单
      detailedListKey: 0,
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
    menuClick(id) {
      if (id === "5") {
        this.cancelShow = true;
        this.springFrameBoool = true;
        this.springFrameText = "是否执行清库操作";
      } else {
        this.memuSelect = id;
      }
    },
    // 弹窗取消
    springFrameCancel() {
      this.springFrameBoool = false;
      this.$message({
        message: "取消操作",
        type: "warning",
      });
    },
    // 弹窗确定
    async springFrameDetermine() {
      // eslint-disable-next-line no-undef
      let res = await frmKuchun.cangku_Del();
      console.log(JSON.parse(res), "清库");
      if (res) {
        this.springFrameBoool = false;
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.$refs.detailedList.queryData();
      } else {
        this.springFrameBoool = false;
        this.$message.error("操作失败");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.goodsShelves {
  height: 100%;
  .goodsShelves-head {
    height: 60px;
    color: #fff;
    font-size: 32px;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid #e4e7ed;
    box-sizing: border-box;
  }
  .goodsShelves-content {
    height: calc(100% - 60px);
    padding: 20px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    .left {
      width: 150px;
      height: 100%;
      border: 5px solid #e4e7ed;
      border-radius: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 0px;
      .goodsShelvesMenu {
        background: #fff;
        width: 100px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        cursor: pointer;
        margin-bottom: 20px;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .goodsShelvesMenuSelect {
        border: 5px solid #409eff;
        box-sizing: border-box;
      }
    }
    .right {
      width: calc(100% - 200px);
      height: 100%;
      border: 5px solid #e4e7ed;
      border-radius: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .jianshe {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 600px;
          height: 500px;
        }
        .text {
          color: #fff;
          font-size: 30px;
        }
      }
    }
  }
}
</style>
