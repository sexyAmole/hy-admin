<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-24 14:42:35
 -->
<template>
  <div>
    <!--标题 -->
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="hy-search-box">
      <el-form
        :inline="true"
        :model="searchData"
        ref="searchData"
        size="small"
        class="demo-form-inline"
      >
        <el-form-item label="用户ID:">
          <el-input placeholder="用户ID" v-model="searchData.UserId"></el-input>
        </el-form-item>
        <el-form-item label="订单ID:">
          <el-input placeholder="订单ID" v-model="searchData.OrderId"></el-input>
        </el-form-item>

        <el-form-item label="商品ID:">
          <el-input placeholder="商品ID" v-model="searchData.FlowerId"></el-input>
        </el-form-item>
        <el-form-item label="第三方订单id:">
          <el-input placeholder="第三方订单id" v-model="searchData.FlowerName"></el-input>
        </el-form-item>
        <el-form-item label="第三方订单号:">
          <el-input placeholder="第三方订单号" v-model="searchData.FlowerName"></el-input>
        </el-form-item>
        <el-form-item label="关联订单号:">
          <el-input placeholder="关联交易订单号" v-model="searchData.Keywords"></el-input>
        </el-form-item>
        <el-form-item label="下单渠道:">
          <el-select v-model="searchData.OrderSource" placeholder="下单渠道">
            <el-option label="所有" value></el-option>
            <el-option label="花娃" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="鲜花订单状态:">
          <el-select v-model="searchData.FlowerOrderStatus" placeholder="鲜花订单状态">
            <el-option label="全部" value=""></el-option>
            <el-option :label="item.valueStr" :value="item.value" v-for="(item,index) in orderStatus" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="queryOrder">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--内容 -->
    <div class="hy-body-centent" v-loading="loading">
      <template>
        <el-table :data="orderData" stripe style="width: 100%">
          <el-table-column label="来源" width="80" prop="OrderSourceStr"></el-table-column>
          <el-table-column label="订单号" prop="OrderId"></el-table-column>
          <el-table-column label="缩略图" width="80">
            <template slot-scope="scope">
              <img :src="scope.row.ImgUrl+'?imageView2/1/w/60/h/60'" class="el-Flower-picture" />
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="InsertDate"></el-table-column>
          <el-table-column label="订花人电话">
            <template slot-scope="scope">
              <a href="javascript:;" @click="userInfo(scope.row.UserId)">{{scope.row.SendPhone}}</a>
            </template>
          </el-table-column>
          <el-table-column label="配送时间" prop="SendDate"></el-table-column>
          <!-- <el-table-column align="center" label="第三方平台类型">
              <template slot-scope="scope">{{scope.row.ThirdPartyOrderType | orderType}}</template>
          </el-table-column>-->
          <!-- <el-table-column prop="ThirdPartyOrderNumber" label="第三方订单号"></el-table-column> -->
          <el-table-column label="第三方订单状态" prop="ThirdPartyOrderStatusStr"></el-table-column>
          <el-table-column label="状态" prop="FlowerOrderStatusStr"></el-table-column>
          <!-- <el-table-column prop="TradeOrderNumber" label="关联交易订单号"></el-table-column> -->
          <el-table-column prop="CouponPrice" label="优惠金额"></el-table-column>
          <el-table-column prop="OrderPrice" label="订单金额"></el-table-column>
          <el-table-column prop="OrderShiftPrice" label="转单金额"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="details(scope.row.OrderId)">查看详情</el-button>
              <el-dropdown trigger="click">
                <!--  @command="handleCommand" -->
                <span class="el-dropdown-link">
                  更多操作
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <span @click="addOrderLog(scope.row.OrderId)">添加日志</span>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.FlowerOrderStatus == 3">
                    <span @click="offerShopp(scope.row)">报价花店</span>
                  </el-dropdown-item>
                  <!-- 其中有指定花店 和 选择报价花店 -->
                  <el-dropdown-item v-if="scope.row.FlowerOrderStatus == 3">
                    <span @click="pushMoney(scope.row.OrderId)">追加金额</span>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.ThirdPartyOrderStatus == -2||scope.row.ThirdPartyOrderStatus == -1">
                    <span @click="pushhw(scope.row.OrderId)">重新推送</span>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="scope.row.FlowerOrderStatus == 3 || scope.row.FlowerOrderStatus == 4"
                  >
                    <span @click="refreshstate(scope.row.OrderId)">刷新花娃状态</span>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.FlowerOrderStatus == 3">
                    <span @click="cancelHwOrder(scope.row.OrderId)">取消花娃订单</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="updateHwOrder(scope.row.OrderId)">更新花娃订单</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <div class="page-box">
      <el-pagination
        @current-change="handleCurrentChange"
        page-size="15"
        layout="total,prev,pager,next,jumper"
        :total="pageTotal"
        :current-page="searchData.PageIndex"
      ></el-pagination>
    </div>
    <!-- 选择报价花店 -->
    <el-dialog title="报价花店" :visible.sync="isOfferShopp" width="50%">
      <el-table :data="offerShoppObj" v-loading="OfferShoppLoading">
        <el-table-column property="add_time" label="报价时间"></el-table-column>
        <el-table-column property="store_name" label="花店名称"></el-table-column>
        <el-table-column property="area_info" label="花店地址"></el-table-column>
        <el-table-column property="store_mobile" label="花店电话"></el-table-column>
        <el-table-column property="price" label="报价"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="choiceShop(scope.row)">选择花店</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-link @click="appointShop">指定花店</el-link>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isOfferShopp = false">取 消</el-button>
        <el-button type="primary" @click="isOfferShopp = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 更新花娃订单 -->
    <el-dialog title="更新花娃订单" :visible.sync="isUpdateThird" width="30%">
      <el-form
        :model="thirdPartyObj"
        :rules="thirdPartyObjRules"
        ref="thirdPartyObjRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="花娃订单id" prop="name">
          <el-input v-model="thirdPartyObj.ThirdPartyOrderId"></el-input>
        </el-form-item>
        <el-form-item label="花娃订单号" prop="name">
          <el-input v-model="thirdPartyObj.ThirdPartyOrderNumber"></el-input>
        </el-form-item>
        <el-form-item label="花娃订单状态" prop="region">
          <el-select v-model="thirdPartyObj.ThirdPartyOrderStatus" placeholder="花娃订单状态">
            <el-option
              v-for="(item,index) in thirdPartyOrderStatus"
              :key="index"
              :label="item.statusStr"
              :value="item.status"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isUpdateThird = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdateThird">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  QueryOrderList,
  PushFlowerOrder,
  AddOrderLog,
  RefreshFlowerOrder,
  AddHuawaPrice,
  QueryHuawaStoreList,
  AssignHuawaStore,
  CancelHuawaOrder,
  UpdateThirdPartyOrderInfo,
  QueryThirdPartyOrderStatus,
  QueryFlowerOrderStatus,
  SelectHuawaPrice
} from "../../common/axios.config.js";
import { FormatDate } from "../../common/Util.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      loading: false,
      OfferShoppLoading: false,
      orderData: [],
      isUpdateThird: false,
      thirdPartyObj: {
        OrderId: "",
        ThirdPartyOrderId: "",
        ThirdPartyOrderNumber: "",
        ThirdPartyOrderStatus: ""
      }, //更新花娃订单数据
      orderStatus:[],//订单状态
      thirdPartyOrderStatus: [], //花娃订单状态
      isOfferShopp: false, //显示隐藏报价列表
      offerShoppObj: [], //报价花店列表
      currentData: {}, //当前选择数据
      searchData: {
        FlowerId: "", //鲜花ID
        FlowerOrderStatus: "", //订单状态
        OrderSource: "", //下单渠道
        ThirdPartyOrderId: "", //三方订单id
        ThirdPartyOrderNumber: "", // 第三方订单号
        ThirdPartyOrderStatus: "", // 第三方订单状态
        ThirdPartyOrderType: "", //第三方平台类型
        TradeOrderNumber: "", //关联交易订单号
        UserId: "", //用户Id
        OrderId: "", //订单ID
        PageSize: 15, //每页大小\
        PageIndex: 1 //页码
      },
      thirdPartyObjRules: {
        ThirdPartyOrderId: [
          { required: true, message: "填写订单ID", trigger: "change" }
        ],
        ThirdPartyOrderNumber: [
          { required: true, message: "填写订单号", trigger: "change" }
        ],
        ThirdPartyOrderStatus: [
          { required: true, message: "请选择订单状态", trigger: "change" }
        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    orderinfo() {
      var that = this,
        params = that.searchData;
      that.loading = true;
      that.$axios.get(QueryOrderList, { params }).then(ret => {
        that.loading = false;
        that.orderData = ret.Data;
        that.pageTotal = ret.AllCount;
      });
    },
    // 查询鲜花订单状态
    queryOrderStatus(){
      var that = this;
       that.$axios.post(QueryFlowerOrderStatus, { }).then(ret => {
        that.orderStatus = ret;
      });
    },
    queryOrder() {
      this.searchData.PageIndex = 1;
      this.orderinfo();
    },
    handleCurrentChange(index) {
      this.searchData.PageIndex = index;
      this.orderinfo();
    },
    details(orderid) {
      this.$router.push(`/Web/Order/Orderdetail/item?orderId=${orderid}`);
    },
    userInfo(UserId) {
      this.$router.push(`/Web/Member/MemberDetails?userId=${UserId}`);
    },
    addOrderLog(orderid) {
      var that = this;
      that
        .$prompt("请输入内容", "添加日志", {
          confirmButtonText: "确定",
          distinguishCancelAndClose: true,
          inputPattern: /(^\s*|\s*$)/,
          inputErrorMessage: "内容不能为空"
        })
        .then(({ value }) => {
          that.$axios
            .post(AddOrderLog, {
              orderId: orderid,
              content: value
            })
            .then(ret => {
              if (ret) {
                that.$message.success("添加成功");
              }
            });
        });
    },
    //推送花娃
    pushhw(orderid) {
      var that = this;
      that.$prompt("输入花店会员名", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(({value }) => {
          that.$axios
            .post(PushFlowerOrder, {
              orderId: orderid,
              memberName:value
            })
            .then(ret => {
              if (ret) {
                that.$message.success("推送成功");
                that.orderinfo();
              }
            });
        })
        .catch(() => {});
    },

    //报价花店 el 选中订单数据
    offerShopp(el) {
      var that = this;
      that.currentData = el;
      that.isOfferShopp = true;
      that.OfferShoppLoading = true;
      that.$axios
        .post(QueryHuawaStoreList, {
          thirdPartyOrderId: el.ThirdPartyOrderId
        })
        .then(ret => {
          if (ret) {
            var returnData = ret.data.price_list;
            that.offerShoppObj = returnData;
            that.OfferShoppLoading = false;
          }
        });
    },
    //选择花店
    choiceShop(item) {
      var that = this,
        priceId = item.price_id,
        currentData = that.currentData;
      that
        .$confirm("确认报价花店差价将会自动填补?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          var price =
            parseFloat(item.price) - parseFloat(currentData.OrderShiftPrice);
          that.$axios
            .post(AddHuawaPrice, {
              orderId: currentData.OrderId, //订单ID
              price: price //价格
            })
            .then(ret => {
              if (ret) {
                that.$axios
                  .post(SelectHuawaPrice, {
                    thirdPartyOrderId: currentData.ThirdPartyOrderId,
                    priceId: priceId
                  })
                  .then(ret => {
                    if (ret.result) {
                      that.$message.success("选择花店成功");
                      that.isOfferShopp = false;
                      that.orderinfo();
                    } else {
                      that.$message.success(ret.message);
                    }
                  });
              } else {
                that.$message.success(ret.message);
              }
            });
        })
        .catch(() => {});
    },
    //指定花店
    appointShop() {
      var that = this,
        currentData = that.currentData;
      that
        .$prompt("指定花店", "花店会员名", {
          confirmButtonText: "确定",
          distinguishCancelAndClose: true
          // // inputPattern: /(^\s*|\s*$)/,
          // inputPattern: /(^\d{1,}$)/,
          // inputErrorMessage: "请输入正确的金额"
        })
        .then(({ value }) => {
          that
            .$confirm("确定要操作", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              that.$axios
                .post(AssignHuawaStore, {
                  thirdPartyOrderId: currentData.ThirdPartyOrderId,
                  memberName: value
                })
                .then(ret => {
                  if (ret.result) {
                    that.$message.success("指定成功");
                    that.isOfferShopp = false;
                    that.orderinfo();
                  } else {
                    that.$message.success(ret.message);
                  }
                });
            })
            .catch(() => {});
        });
    },
    //追加金额
    pushMoney(orderid) {
      var that = this;
      that
        .$prompt("输入金额", "追加金额", {
          confirmButtonText: "确定",
          distinguishCancelAndClose: true,
          // inputPattern: /(^\s*|\s*$)/,
          inputPattern: /(^\d{1,}$)/,
          inputErrorMessage: "请输入正确的金额"
        })
        .then(({ value }) => {
          that
            .$confirm("确定要操作", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              that.$axios
                .post(AddHuawaPrice, {
                  orderId: orderid, //订单ID
                  price: value //价格
                })
                .then(ret => {
                  if (ret) {
                    that.$message.success("价格追加成功");
                    that.orderinfo();
                  } else {
                    that.$message.success(ret.message);
                  }
                });
            })
            .catch(() => {});
        });
    },
    //刷新花娃状态
    refreshstate(orderid) {
      var that = this;
      that
        .$confirm("确定要操作", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.$axios
            .post(RefreshFlowerOrder, {
              orderId: orderid
            })
            .then(ret => {
              if (ret) {
                that.$message.success("刷新成功");
                that.orderinfo();
              }
            });
        })
        .catch(() => {});
    },
    //取消花娃订单
    cancelHwOrder(orderid) {
      var that = this;
      that
        .$prompt("取消订单", "取消原因", {
          confirmButtonText: "确定",
          distinguishCancelAndClose: true
        })
        .then(({ value }) => {
          that
            .$confirm("确定要操作", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              that.$axios
                .post(CancelHuawaOrder, {
                  orderId: orderid,
                  reason: value
                })
                .then(ret => {
                  if (ret) {
                    that.$message.success("取消成功");
                    that.orderinfo();
                  }
                });
            })
            .catch(() => {});
        });
    },

    //更新花娃订单弹窗
    updateHwOrder(OrderId) {
      var that = this;
      that.thirdPartyObj.OrderId = OrderId;
      if (that.thirdPartyOrderStatus.length) {
        that.isUpdateThird = true;
      } else {
        that
          .$confirm("确定要操作", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            that.$axios.post(QueryThirdPartyOrderStatus, {}).then(ret => {
              if (ret) {
                that.thirdPartyOrderStatus = ret;
                that.isUpdateThird = true;
              }
            });
          })
          .catch(() => {});
      }
    },
    //更新花娃订单
    confirmUpdateThird() {
      var that = this;
      that.$refs["thirdPartyObjRules"].validate(valid => {
        if (valid) {
          that
            .$confirm("确定要操作", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              that.$axios
                .post(UpdateThirdPartyOrderInfo, that.thirdPartyObj)
                .then(ret => {
                  if (ret) {
                    that.isUpdateThird = false;
                    that.$message.success("更新成功");
                    that.orderinfo();
                  }
                });
            })
            .catch(() => {});
        }
      });
    },
    resetForm() {
      this.searchData = {
        FlowerId: "", //鲜花ID
        FlowerOrderStatus: "", //订单状态
        OrderSource: "", //下单渠道
        ThirdPartyOrderId: "", //三方订单id
        ThirdPartyOrderNumber: "", // 第三方订单号
        ThirdPartyOrderStatus: "", // 第三方订单状态
        ThirdPartyOrderType: "", //第三方平台类型
        TradeOrderNumber: "", //关联交易订单号
        UserId: "", //用户Id
        OrderId: "", //订单ID
        PageSize: 15, //每页大小
        PageIndex: 1 //页码
      };
    }
  },
  filters: {
    datetiemr(value) {
      if (!value) return "";
      var { Y, M, D, h, m, s } = FormatDate(value);
      return `${Y}/${M}/${D} ${h}:${m}:${s}`;
    },
    orderType(value) {
      return value == 0 ? "未分配" : "花娃";
    }
    // orderStatus(value) {
    //   var t;
    //   switch (value.toString()) {
    //     case "-2":
    //       t = "推送失败";
    //       break;
    //     case "-1":
    //       t = "未知";
    //       break;
    //     case "0":
    //       t = "下单方主动取消";
    //       break;
    //     case "1":
    //       t = "待支付";
    //       break;
    //     case "2":
    //       t = "待发布";
    //       break;
    //     case "3":
    //       t = "退款中";
    //       break;
    //     case "4":
    //       t = "已取消";
    //       break;
    //     case "5":
    //       t = "已过期";
    //       break;
    //     case "6":
    //       t = "待接收";
    //       break;
    //     case "7":
    //       t = "待接单";
    //       break;
    //     case "8":
    //       t = "竞价单待出价";
    //       break;
    //     case "9":
    //       t = "配送中";
    //       break;
    //     case "10":
    //       t = "待确认完成";
    //       break;
    //     case "11":
    //       t = "已完成";
    //       break;
    //   }
    //   return t;
    // },
    // myOrderStatus(value) {
    //   var t;
    //   switch (value.toString()) {
    //     case "0":
    //       t = "未支付";
    //       break;
    //     case "1":
    //       t = "已支付";
    //       break;
    //     case "2":
    //       t = "已取消";
    //       break;
    //     case "3":
    //       t = "已转单";
    //       break;
    //     case "4":
    //       t = "已接单";
    //       break;
    //     case "5":
    //       t = "已完成";
    //       break;
    //   }
    //   return t;
    // }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.queryOrderStatus();
    this.orderinfo();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
  margin-left: 10px;
}
//@import url(); 引入公共css类
</style>