<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: zsm
 * @LastEditTime: 2020-03-30 22:59:02
 -->
<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <!--  :to="{ path: '/' }" -->
        <el-breadcrumb-item v-if="RouterBack"><a href="javscript:;" @click="back">返回上级</a> </el-breadcrumb-item>
        <el-breadcrumb-item>资金管理</el-breadcrumb-item>
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
        <el-form-item label="交易流水号">
            <el-input placeholder="交易流水号" v-model="searchData.PaymentNo"></el-input>
          </el-form-item>
          <el-form-item label="用户ID">
            <el-input placeholder="用户ID" v-model="searchData.UserId"></el-input>
          </el-form-item>
          <el-form-item label="资金类型">
            <el-select v-model="searchData.FundsType" placeholder="资金类型">
              <el-option label="所有" value></el-option>
              <el-option :label="item.valueStr" :value="item.value" v-for="(item,index) in FundsTypeData" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易状态">
            <el-select v-model="searchData.FundsStatus" placeholder="交易状态">
              <el-option label="所有" value></el-option>
              <el-option :label="item.valueStr" :value="item.value" v-for="(item,index) in FundsStatusData" :key="index"></el-option>
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
          <el-table-column label="用户ID" prop="UserId"  width="100"></el-table-column>
          <!-- <el-table-column label="头像">
            <template slot-scope="scope">
              <block v-if="scope.row.HeadImg">
                <img :src="scope.row.HeadImg" class="el-Flower-picture">
              </block>
              <block v-else>
                <img src="../../assets/images/defaulthead.png" class="el-Flower-picture">
              </block>
            </template>
          </el-table-column> -->
          <el-table-column label="流水号" prop="PaymentNo"  width="280"></el-table-column>
          <el-table-column label="资金类型" prop="FundsTypeStr"  width="100"></el-table-column>
          <el-table-column label="交易状态" prop="FundsStatusStr"  width="100"> </el-table-column>
          <el-table-column label="金额" prop="Amount" width="100"></el-table-column>
          <el-table-column label="到账时间" prop="PaymentTime"   width="160"></el-table-column>
          <el-table-column label="备注" prop="Remark"></el-table-column>
          <el-table-column label="失败原因" prop="PaymentMessage"></el-table-column>
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
  QueryFundsType,
  QueryFundsStatus,
  QueryFundsLogManageList
} from "../../common/axios.config.js";
import { getQueryString } from "../../common/Util.js";
export default {
  components: {},
  data() {
    return {
      searchData: {
        PageIndex:1,
        FundsStatus: "",
        FundsType: "",
        PaymentNo: "",
        UserId: ""
      },
      RouterBack:false,
      FundsTypeData:[],
      FundsStatusData:[],
      pageTotal:0,
      ListData:[]
    };
  },
  methods: {
    //查询类型和状态
    queryTypeAndStatus(){
    const self = this;
      self.$axios.post(QueryFundsType, {}).then(ret => {
        self.FundsTypeData = ret;
      });
      self.$axios.post(QueryFundsStatus, {}).then(ret => {
        self.FundsStatusData = ret;
      });
    },
    queryUser() {
      const self = this;
      self.loading = true;
      self.$axios.post(QueryFundsLogManageList, self.searchData).then(ret => {
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
        FundsStatus: "",
        FundsType: "",
        PaymentNo: "",
        UserId: ""
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
    this.searchData.UserId = getQueryString("userId");
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