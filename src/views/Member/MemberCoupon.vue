<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-03 21:08:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-03 23:00:27
 -->
<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
           <el-breadcrumb-item><a href="javscript:;" @click="back">返回上级</a> </el-breadcrumb-item>
          </el-breadcrumb-item>
        <el-breadcrumb-item>优惠卷列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="hy-body-centent" v-loading="loading">
        <el-table :data="userData" stripe style="width: 100%">
          <el-table-column label="头像"  width="100">
            <template slot-scope="scope">
              <block>
                <img :src="scope.row.HeadImg" class="el-Flower-picture">
              </block>
            </template>
          </el-table-column>
          <el-table-column label="名称" width="100">
            <template slot-scope="scope">
                  <router-link :to="{ path: '/Web/Member/MemberDetails?userId='+scope.row.UserId }">{{scope.row.NickName}}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="优惠券名称"  width="150"> 
            <template slot-scope="scope">
                  <router-link :to="{ path: '/Web/Marketing/SetCoupon/edit?couponId='+scope.row.CouponId }">{{scope.row.CouponName}}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="类型" prop="CouponTypeStr"  width="100"></el-table-column>
          <el-table-column label="有效期" prop="ValidStartDate">
            <template slot-scope="scope">
                {{scope.row.ValidStartDate}} -- {{scope.row.ValidEndDate}}
            </template>
          </el-table-column>
          <el-table-column label="是否使用" prop="IsUsed">
<template slot-scope="scope">
                {{scope.row.IsUsed?"已使用":"未使用"}}
            </template>
          </el-table-column>
          <el-table-column label="领取时间" prop="InsertDate"></el-table-column>
          <el-table-column label="使用时间" prop="UsedTime"></el-table-column>
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
import {QueryCouponList} from "../../common/axios.config.js";
import {getQueryString} from "../../common/Util.js";
export default {
  components: {},
  data() {
    return {
      userData: [],
      pageTotal: "",
      loading: false,
      searchData: {
        PageIndex: 1,
        userId:getQueryString("userId")
      }
    };
  },
  methods: {
      back(){
           this.$router.go(-1);
      },
    queryUser() {
      var self = this,
        params = self.searchData;
    let userId = getQueryString("userId");
    let couponId = getQueryString("couponId");
      self.loading = true;
      if(userId){
          params["userId"] = userId
      }
      if(couponId){
          params["couponId"] = couponId
      }
      self.$axios.post(QueryCouponList, params).then(ret => {
        self.loading = false;
        self.userData = ret.Datas;
        self.pageTotal = ret.AllCount;
      });
    },
    //分页
    queryChange(index) {
      this.searchData.PageIndex = index;
      this.queryUser();
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.queryUser();
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