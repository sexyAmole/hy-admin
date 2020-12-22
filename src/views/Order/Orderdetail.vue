<!--  -->
<template>
  <div>
    <!--标题 -->
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Web/Order/OrderList' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--内容 -->
    <div class="hy-body-centent">
      <el-form label-width="100px" class="demo-ruleForm hui-from">
        <div class="hy-body-handle">
          <div class="el-card__header">
            <div class="clearfix">
              <span>订单信息</span>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="订单号">
                <div>{{orderDetail.OrderId}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="订单状态:">
                <div>{{orderDetail.FlowerOrderStatusStr}}</div>
                <!-- <div>{{orderDetail.FlowerOrderStatus | myOrderStatus}}</div> -->
              </el-form-item>
            </el-col>
            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="下单时间:">
                <div>{{orderDetail.InsertDate}}</div>
                <!-- <div>{{orderDetail.InsertDate | datetiemr}}</div> -->
              </el-form-item>
            </el-col>

            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="备注:">
                <div>{{orderDetail.Remark}}</div>
                <!-- <div>{{orderDetail.InsertDate | datetiemr}}</div> -->
              </el-form-item>
            </el-col>
          </el-row>

       

          <div class="el-card__header">
            <div class="clearfix">
              <span>商品信息</span>
            </div>
          </div>
          <el-table :data="[orderDetail]" stripe style="width: 100%">
            <el-table-column label="缩略图">
              <template slot-scope="scope">
                <img :src="scope.row.ImgUrl+'?imageView2/1/w/100/h/100'" style="width:100px;">
              </template>
            </el-table-column>
            <el-table-column label="名称" prop="FlowerName"></el-table-column>
            <el-table-column label="属性名称" prop="CategoryName"></el-table-column>
            <el-table-column label="材料" prop="Material"></el-table-column>
          </el-table>


          <div class="el-card__header">
            <div class="clearfix">
              <span>送花人or收花人信息</span>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="8" class="rui-fromDiy-row">
              <el-form-item label="送花人电话:">
                <a href="javascript:;" @click="userInfo(orderDetail.UserId)">{{orderDetail.SendPhone}}</a>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="rui-fromDiy-row">
              <el-form-item label="配送时间:">
                <div>{{orderDetail.SendDate}}【{{orderDetail.DeliveryTimeStr}}】</div>
              </el-form-item>
            </el-col>
             <el-col :span="8" class="rui-fromDiy-row">
              <el-form-item label="贺卡" prop="CategoryId:">
                <div>{{orderDetail.Card}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" class="rui-fromDiy-row">
              <el-form-item label="收花人" prop="CategoryId:">
                <div>{{orderDetail.LinkName}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="rui-fromDiy-row">
              <el-form-item label="收花人电话:">
                <div>{{orderDetail.LinkPhone}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="rui-fromDiy-row">
              <el-form-item label="收花人地址:">
                <div>{{orderDetail.Province}} {{orderDetail.City}} {{orderDetail.Country}} {{orderDetail.LinkAddress}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="el-card__header">
            <div class="clearfix">
              <span>第三方订单信息</span>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="8" class="rui-fromDiy-row">
              <el-form-item label="名称:">
                <div>{{orderDetail.ThirdPartyOrderTypeStr}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="rui-fromDiy-row">
              <el-form-item label="订单号:">
                <div>{{orderDetail.ThirdPartyOrderNumber}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="rui-fromDiy-row">
              <el-form-item label="关联订单号:">
                <div>{{orderDetail.TradeOrderNumber}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="rui-fromDiy-row">
              <el-form-item label="订单状态:">
                <div>{{orderDetail.ThirdPartyOrderStatusStr}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="rui-fromDiy-row">
              <el-form-item label="推送时间:">
                <div>{{orderDetail.ThirdPartyPushTime | datetiemr}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="el-card__header">
            <div class="clearfix">
              <span>物流信息</span>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="客户端:">
                <div v-for="item in orderDetail.ClientFlowerOrderLogList" :key="item.Id">
                  <span>{{item.InsertDate | datetiemr}} </span>
                  <span> {{item.Content}}</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="服务端:">
                <div v-for="item in orderDetail.ServiceFlowerOrderLogList" :key="item.Id">
                  <span>{{item.InsertDate | datetiemr}}</span>
                  <span>{{item.Content}}</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { QueryOrderDetail } from "../../common/axios.config.js";
import { getQueryString, FormatDate } from "../../common/Util.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      orderDetail: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
     userInfo(UserId) {
      this.$router.push(`/Web/Member/MemberDetails?userId=${UserId}`);
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
    },
    orderStatus(value) {
      if (value == undefined) return "";
      var t;
      switch (value.toString()) {
        case "-2":
          t = "推送失败";
          break;
        case "-1":
          t = "未知";
          break;
        case "0":
          t = "下单方主动取消";
          break;
        case "1":
          t = "待支付";
          break;
        case "2":
          t = "待发布";
          break;
        case "3":
          t = "退款中";
          break;
        case "4":
          t = "已取消";
          break;
        case "5":
          t = "已过期";
          break;
        case "6":
          t = "待接收";
          break;
        case "7":
          t = "待接单";
          break;
        case "8":
          t = "竞价单待出价";
          break;
        case "9":
          t = "配送中";
          break;
        case "10":
          t = "待确认完成";
          break;
        case "11":
          t = "已完成";
          break;
      }
      return t;
    },
    myOrderStatus(value) {
      if (value == undefined) return "";
      var t;
      switch (value.toString()) {
        case "0":
          t = "未支付";
          break;
        case "1":
          t = "已支付";
          break;
        case "2":
          t = "已取消";
          break;
      }
      return t;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    var that = this;
    let orderId = getQueryString("orderId");
    that.$axios
      .get(QueryOrderDetail, { params: { orderId: orderId } })
      .then(ret => {
        this.orderDetail = ret;
      });
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
//@import url(); 引入公共css类
</style>