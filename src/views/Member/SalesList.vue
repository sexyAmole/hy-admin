<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: zsm
 * @LastEditTime: 2020-03-30 22:58:55
 -->
<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="RouterBack"><a href="javscript:;" @click="back">返回上级</a> </el-breadcrumb-item>

        <el-breadcrumb-item>销售订单列表</el-breadcrumb-item>
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
          <el-form-item label="用户ID">
            <el-input placeholder="用户ID" v-model="searchData.SaleUserId"></el-input>
          </el-form-item>
          <el-form-item label="资金类型">
            <el-select v-model="searchData.SaleOrderStatus" placeholder="资金类型">
              <el-option label="所有" value></el-option>
              <el-option :label="item.valueStr" :value="item.value" v-for="(item,index) in SaleOrderStatusData" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否下级">
            <el-select v-model="searchData.IsNext" placeholder="是否下级">
              <el-option label="所有" value></el-option>
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="queryChange(1)">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    <div class="hy-body-centent" v-loading="loading">
        <el-table :data="ListData" stripe style="width: 100%">
          <el-table-column label="订单ID" prop="SaleOrderId"  width="310">
              <template slot-scope="scope">
                  <p>销售ID：{{scope.row.SaleOrderId}}</p>
                  <p>订单ID：{{scope.row.OrderId}}</p>
                  <p>详情ID：{{scope.row.DetailId}}</p>
              </template>
          </el-table-column>
          <!-- <el-table-column label="订单ID" prop="OrderId"  width="100"></el-table-column>
          <el-table-column label="详情ID" prop="DetailId"  width="100"></el-table-column> -->
          <el-table-column label="分销用户ID" prop="SaleUserId"  width="150"></el-table-column>
          <el-table-column label="是否下级" width="100">
              <template slot-scope="scope">{{scope.row.IsNext?'是':'否'}}</template>
          </el-table-column>
          <!-- <el-table-column label="商品名称" prop="GoodsName"  width="100"></el-table-column> -->
           <el-table-column label="时间踪迹"   width="340">
            <template slot-scope="scope">
                <p>下单时间：{{scope.row.InsertDate}}</p>
                <p>确认时间：{{scope.row.ReceiptTime}}</p>
                <p  style="color:#F56C6C" v-if="scope.row.CountdownTime">入账倒计时：{{scope.row.CountdownTime}}</p>
                <p>入账时间：{{scope.row.CreditTime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="金额明细" width="340">
            <template slot-scope="scope">
                <p>订单金额：{{scope.row.SubtotalPrice}}</p>
                <p>预计提成金额：{{scope.row.PredictCommission}}</p>
                <p style="color:#F56C6C">提成：{{scope.row.Commission}}</p>
            </template>
          </el-table-column>
          <el-table-column label="商品信息">
            <template slot-scope="scope">
                <img :src="scope.row.ImgUrl" class="el-Flower-picture">
                <p>{{scope.row.GoodsName}}</p>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="page-box">
      <el-pagination
          @current-change="queryChange"
          page-size="10"
          layout="total,prev,pager,next,jumper"
          :total="pageTotal"
          background
          :current-page="searchData.PageIndex"
        ></el-pagination>
    </div>
   
  </div>
</template>
<script>
import {
  QuerySaleOrderStatus,
  QueryOrderSaleManageList
} from "../../common/axios.config.js";
import { getQueryString } from "../../common/Util.js";
export default {
  components: {},
  data() {
    return {
      searchData: {
        PageIndex:1,
        IsNext: "",
        SaleOrderStatus: "",
        SaleUserId: ""
      },
      RouterBack:false,
      SaleOrderStatusData:[],
      pageTotal:0,
      ListData:[]
    };
  },
  methods: {
    //查询类型和状态
    queryTypeAndStatus(){
    const self = this;
      self.$axios.post(QuerySaleOrderStatus, {}).then(ret => {
        self.SaleOrderStatusData = ret;
      });
    },
    queryUser() {
      const self = this;
      self.loading = true;
      self.$axios.post(QueryOrderSaleManageList, self.searchData).then(ret => {
        self.loading = false;
        self.ListData = ret.Datas;
        self.pageTotal = ret.AllCount;
      });
    },
    //分页
    queryChange(index) {
      this.searchData.PageIndex = index;
      this.queryUser();
    },
    //重置表单
    resetForm() {
      this.searchData = {
        PageIndex:1,
        IsNext: "",
        SaleOrderStatus: "",
        SaleUserId: ""
      };
    },
    back(){
       this.$router.go(-1);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
       if(getQueryString("userId")){
          this.RouterBack = true;
      }
    this.searchData.SaleUserId = getQueryString("userId");
    this.queryUser();
    this.queryTypeAndStatus();
  }
};
</script>
<style lang="less" scoped>
.inline-block {
  display: inline-block;
}
.pop-user-warp {
  display: flex;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    margin-right: 10px;
  }
}
</style>