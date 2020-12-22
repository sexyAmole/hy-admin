<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-03 21:08:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-01 19:58:28
 -->
<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Web/Member/MemberList' }">返回列表</el-breadcrumb-item>
        <el-breadcrumb-item>浏览列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="hy-body-centent" v-loading="loading">
        <el-table :data="userData" stripe style="width: 100%">
          <el-table-column label="时间" prop="InsertDate"  width="200"></el-table-column>
          <el-table-column label="商品"  width="100">
            <template slot-scope="scope">
              <block>
                <img :src="scope.row.ImgUrl" class="el-Flower-picture">
              </block>
            </template>
          </el-table-column>
          <!-- <el-table-column label="分类" prop="CategoryName" width="80"></el-table-column> -->
          <el-table-column label="价格" prop="NowPrice" width="80"> </el-table-column>
          <el-table-column label="名称" prop="Title"></el-table-column>
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
import {QueryBrowseList} from "../../common/axios.config.js";
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
    queryUser() {
      var self = this,
        params = self.searchData;
      self.loading = true;
      self.$axios.post(QueryBrowseList, params).then(ret => {
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