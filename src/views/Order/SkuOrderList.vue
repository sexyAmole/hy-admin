<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: zsm
 * @LastEditTime: 2020-04-04 23:13:53
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

        <el-form-item label="关联订单号:">
          <el-input placeholder="关联交易订单号" v-model="searchData.TradeOrderNumber"></el-input>
        </el-form-item>
        <el-form-item label="下单渠道:">
          <el-select v-model="searchData.OrderSource" placeholder="下单渠道">
            <el-option label="所有" value></el-option>
            <el-option
              v-for="(item,index) in orderSource"
              :label="item.valueStr"
              :key="index"
              :value="item.value"
            >{{item.valueStr}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="鲜花订单状态:">
          <el-select v-model="searchData.GoodsOrderStatus" placeholder="鲜花订单状态">
            <el-option label="所有" value></el-option>
            <el-option
              v-for="(item,index) in orderStatus"
              :label="item.valueStr"
              :key="index"
              :value="item.value"
            >{{item.valueStr}}</el-option>
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
              <a href="javascript:;" @click="userInfo(scope.row.UserId)">{{scope.row.BuyerPhone}}</a>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="FlowerOrderStatusStr"></el-table-column>
          <el-table-column prop="CouponPrice" label="优惠金额"></el-table-column>
          <el-table-column prop="OrderPrice" label="订单金额"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button type="text" size="small" v-if="scope.row.GoodsOrderStatus == 4" @click="collectReceipt(scope.row.OrderId)">确认收货</el-button> -->
              <el-button type="text" size="small" @click="details(scope.row.OrderId)">查看详情</el-button>
              <!-- <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  快递操作
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <span @click="getExpress(scope.row.OrderId)">修改快递</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="expressCancel(scope.row.OrderId)">取消快递</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="expressRefresh(scope.row.OrderId)">刷新快递</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
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
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  OrderList,
  QueryOrderSource,
  OrderExpressPathRefresh,
  OrderExpressCancel,
  OrderExpressShip,
  // OrderExpress,
  QueryExpressService,
  QueryDelivery,
  QueryExpressType,
  QueryGoodsOrderStatus,
  orderConfirm
} from "../../common/axios.config.js";
import { FormatDate } from "../../common/Util.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      loading: false,
      isExpress: false,
      orderData: [],
      orderSource: [], //订单来源
      orderStatus: [], //花娃订单状态
      express: {
        Count: 1,
        DeliveryId: "",
        DeliveryName: "",
        ExpectTime: "",
        ExpressType: "",
        InsuredValue: "",
        OrderId: "",
        Remark: "",
        ServiceName: "",
        ServiceType: "",
        SpaceX: "",
        SpaceY: "",
        SpaceZ: "",
        UseInsured: 0,
        WaybillId: "",
        SendCity:"",
        SendCountry:"",
        SendProvince:"",
        Weight: ""
      }, // 物流信息
      expressService: [], // 快递服务
      expressType: [], // 快递类型
      expressDelivery: [], // 快递公司
      searchData: {
        GoodsOrderStatus: "", //订单状态
        OrderSource: "", //下单渠道
        TradeOrderNumber: "", //关联交易订单号
        UserId: "", //用户Id
        OrderId: "", //订单ID
        PageSize: 15, //每页大小\
        PageIndex: 1 //页码
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
      that.$axios.post(OrderList, params).then(ret => {
        that.loading = false;
        that.orderData = ret.Data;
        that.pageTotal = ret.AllCount;
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
      this.$router.push(`/Web/Order/SkuOrderDetail/item?orderId=${orderid}`);
    },
    userInfo(UserId) {
      this.$router.push(`/Web/Member/MemberDetails?userId=${UserId}`);
    },
    //查询订单来源
    queryOrderSource() {
      let that = this;
      that.$axios.post(QueryOrderSource, {}).then(ret => {
        that.orderSource = ret;
      });
    },
    //查询订单来源
    queryOrderStatus() {
      let that = this;
      that.$axios.post(QueryGoodsOrderStatus, {}).then(ret => {
        that.orderStatus = ret;
      });
    },
    //验证信息
    inspectExpress(data, inspectType){
      let that = this;
      let dataKey = Object.keys(data);
      let message = {
        WaybillId:'填写三方订单号',
        DeliveryName:'填写物流公司',
        DeliveryId:'填写物流公司ID',
      }
      let messageTwo = {
        DeliveryId:'物流公司',
        Count:'输入数量',
        ExpectTime:'输入揽件时间',
        ExpressType:'输入快递类型',
        ServiceType:'输入服务类型',
        SpaceX:'包裹长',
        SpaceY:'包裹宽',
        SpaceZ:'包裹高',
        Weight:'包裹重量',
      }
      let inspectResult = true;
      for(let i = 0;i<dataKey.length;i++){
        let item = dataKey[i];
           // 验证微信填写信息
        if(inspectType){
          // 判断是否保价
           if(item == "InsuredValue" && data["UseInsured"] && data[item] == ""){
            that.$message.warning("输入保价金额");
            inspectResult = false;
            break 
          }
          if(data[item] === "" && messageTwo[item]){
            that.$message.warning(messageTwo[item]);
            inspectResult = false;
            break 
          }
        }else{
          //验证第三方填写信息
           if(data[item] === ""){
          that.$message.warning(message[item]);
          inspectResult = false;
          break
         }
        }
      }
      return inspectResult;
    },
    // 编辑快递信息
    expressEdit() {
      let that = this;
      let express = that.express;
    
      let params = {};
      if(express.ExpressType == 1){
        params = {
          ExpressType:express.ExpressType,
          WaybillId:express.WaybillId,
          OrderId:express.OrderId,
          SendCity:express.SendCity,
          SendCountry:express.SendCountry,
          SendProvince:express.SendProvince,
          DeliveryName:express.DeliveryName,
          DeliveryId:express.DeliveryId
        }
         if(!that.inspectExpress(params,0)){
          return false;
        }
      }else{
         that.expressDelivery.forEach(element => {
        if (element.value == express.DeliveryId) {
          express.DeliveryName = element.valueStr;
        }
      });
      that.expressService.forEach(element => {
        if (element.value == express.ServiceType) {
          express.ServiceName = element.valueStr;
        }
      });
        params = express;
         if(!that.inspectExpress(params,1)){
          return false;
        }
      }
     
      that.$axios.post(OrderExpressShip, params).then(ret => {
        if (ret) {
          that.$message.success(ret.Message);
        }
      });
    },
    // 删除快递信息
    expressCancel(orderID) {
      let that = this;
      that.$confirm("你确定要取消快递信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.$axios
            .post(OrderExpressCancel, {
              orderId: orderID
            })
            .then(ret => {
              if (ret) {
                that.$message.success("确定成功");
              }
            });
        });
    },
    //确认收货
    collectReceipt(orderID){
        let that = this;
      that.$confirm("你确定要收货?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          that.$axios
            .post(orderConfirm, {
              orderId: orderID
            })
            .then(ret => {
              if (ret) {
                that.$message.success("确认收货成功");
                that.orderinfo();
              }
            });
        });
    },
    // 刷新快递信息
    expressRefresh(orderID) {
      let that = this;
      that.$axios
        .post(OrderExpressPathRefresh, {
          orderId: orderID
        })
        .then(ret => {
          if (ret) {
            that.$message.success("更新成功");
          }
        });
    },
    //查询物流信息
    // getExpress(orderID) {
    //   let that = this;
    //   that.isExpress = true;
    //   that.express.OrderId = orderID;
    //   that.$axios
    //     .post(OrderExpress, {
    //       orderId: orderID
    //     })
    //     .then(ret => {
    //       if (ret) {
    //         that.express = ret.Data;
    //       }
    //     });
    // },
    //查询快递服务类型
    getExpressService() {
      let that = this;
      that.$axios.post(QueryExpressService, {}).then(ret => {
        if (ret) {
          that.expressService = ret;
        }
      });
    },
    //查询快递服务类型
    getExpressType() {
      let that = this;
      that.$axios.post(QueryExpressType, {}).then(ret => {
        if (ret) {
          that.expressType = ret;
        }
      });
    },
    //查询快递公司信息
    getDelivery() {
      let that = this;
      that.$axios.post(QueryDelivery, {}).then(ret => {
        if (ret) {
          that.expressDelivery = ret;
        }
      });
    },
    //搜索表单重置
    resetForm() {
      this.searchData = {
        FlowerOrderStatus: "", //订单状态
        OrderSource: "", //下单渠道
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
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.orderinfo();
    this.queryOrderSource();
    this.queryOrderStatus();
    // this.getDelivery();
    // this.getExpressType();
    // this.getExpressService();
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