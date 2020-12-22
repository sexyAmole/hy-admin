<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-11 22:23:56
 -->
<template>
  <div>
    <!--标题 -->
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>交易订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 搜索 -->
     <div class="hy-search-box">
      <el-form
        :inline="true"
        :model="searchData"
        ref="searchData"
        size="small"
        class="demo-form-inline"
      >
        <el-form-item label="用户账号:">
          <el-input placeholder="用户账号" v-model="searchData.NickName"></el-input>
        </el-form-item>
        <el-form-item label="订单号:">
          <el-input placeholder="订单号" v-model="searchData.OrderNumber"></el-input>
        </el-form-item>
        <el-form-item label="交易名称:">
          <el-input placeholder="交易名称" v-model="searchData.DealName"></el-input>
        </el-form-item>
        <el-form-item label="支付方式:">
          <el-select v-model="searchData.PayBusiness" placeholder="支付方式">
            <el-option label="所有" value=""></el-option>
            <el-option  v-for="(item,index) in payStateData" :key="index" :label="item.PayBusinessStr" :value="item.PayBusiness"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易状态:">
          <el-select v-model="searchData.DealStatus" placeholder="交易状态">
            <el-option label="所有" value=""></el-option>
            <el-option  v-for="(item,index) in dealStatusData" :key="index" :label="item.DealStatusStr" :value="item.DealStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="queryOrder">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--内容 -->
    <div class="hy-body-centent"  v-loading="loading">
        <template>
          <el-table :data="orderData" stripe style="width: 100%">
            <el-table-column label="状态" prop="DealStatusStr" width="70"></el-table-column>
            <el-table-column label="支付方式" prop="PayBusinessStr" width="120"></el-table-column>
            <el-table-column label="用户信息" width="100">
              <template slot-scope="scope">
                  <block v-if="scope.row.HeadImg">
                <img :src="scope.row.HeadImg" class="el-Flower-picture">
              </block>
              <block v-else>
                <img src="../../assets/images/defaulthead.png" class="el-Flower-picture">
              </block>
                <p>{{scope.row.NickName || "未知"}}</p>
              </template>
            </el-table-column>
            <el-table-column label="订单号">
              <template slot-scope="scope">
                <p>交易订单号：{{scope.row.OrderNumber}}</p>
                <p>鲜花订单号：{{scope.row.BusinessOrderId}}</p>
                <p>微信订单号：{{scope.row.PayInterfaceId}}</p>
              </template>
            </el-table-column>
            <el-table-column label="商品信息" prop="DealName"></el-table-column>
            <el-table-column label="金额信息">
              <template slot-scope="scope">
                <p>商品金额：{{scope.row.DealPrice}}</p>
                <p>优惠金额：{{scope.row.ReductionPrice}}</p>
                <p>支付金额：{{scope.row.PayPrice}}</p>
              </template>
            </el-table-column>
            <el-table-column label="支付时间" prop="SendDate">
               <template slot-scope="scope">
                <p>创建时间：{{scope.row.InsertDate}}</p>
                <p>支付时间：{{scope.row.PayTime}}</p>
              </template>
            </el-table-column>
          
            <!-- <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="details(scope.row.OrderId)">查看详情</el-button>
                <el-button type="text" size="small" @click="addOrderLog(scope.row.OrderId)">添加日志</el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.ThirdPartyOrderStatus && scope.row.FlowerOrderStatus == 1"
                  @click="offerShopp(scope.row.OrderId)"
                >报价花店</el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.ThirdPartyOrderStatus && scope.row.FlowerOrderStatus == 1"
                  @click="pushMoney(scope.row.OrderId)"
                >追加金额</el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.ThirdPartyOrderStatus == -2"
                  @click="pushhw(scope.row.OrderId)"
                >推送花娃</el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.ThirdPartyOrderStatus && scope.row.FlowerOrderStatus == 1"
                  @click="refreshstate(scope.row.OrderId)"
                >刷新花娃状态</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </template>
    </div>

    <!-- 分页 -->
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
import {QueryPayBusiness,TradeOrderList,QueryDealStatus} from "../../common/axios.config.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      loading: false,
      orderData: [],
      payStateData:[],
      dealStatusData:[],
      searchData: {
        DealName: "", //交易名称
        DealStatus: "", //交易状态
        NickName:"",//用户帐号
        OrderNumber:"",
        PayBusiness:"",
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
      that.$axios.get(TradeOrderList, {params}).then(ret => {
        that.loading = false;
        that.orderData = ret.Datas;
        that.pageTotal = ret.AllCount;
      });
    },
    queryOrder(){
      this.searchData.PageIndex = 1;
      this.orderinfo();
    },
    payState(){
      var that = this;
      that.$axios.get(QueryPayBusiness, { params :{}}).then(ret => {
        that.payStateData = ret;
      });
    },
    dealStatus(){
      var that = this;
      that.$axios.get(QueryDealStatus, { params :{}}).then(ret => {
         that.dealStatusData = ret;
      });
    },
    handleCurrentChange(index) {
      this.searchData.PageIndex = index;
      this.orderinfo();
    },
    resetForm() {
      this.searchData = {
        DealName: "", //交易名称
        DealStatus: "", //交易状态
        NickName:"",//用户帐号
        OrderNumber:"",
        PayBusiness:"",
        PageSize: 15, //每页大小\
        PageIndex: 1 //页码
      };
    }
  },
  filters: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.orderinfo();
    this.payState();
    this.dealStatus();
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