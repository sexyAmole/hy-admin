<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: zsm
 * @LastEditTime: 2020-04-04 22:24:55
 -->
<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
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
        <el-form-item label="账号">
          <el-input placeholder="唯一账号" v-model="searchData.Account"></el-input>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input placeholder="用户ID" v-model="searchData.UserId"></el-input>
        </el-form-item>
        <el-form-item label="上级ID">
          <el-input placeholder="上级ID" v-model="searchData.ParentId"></el-input>
        </el-form-item>
        <el-form-item label="分销等级">
          <el-input placeholder="分销等级" v-model="searchData.SaleLevel"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input placeholder="用户名称" v-model="searchData.NickName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="searchData.Sex" placeholder="性别">
            <el-option label="所有" value></el-option>
            <el-option label="未知" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="分销等级">
          <el-select v-model="searchData.SaleLevel" placeholder="性别">
            <el-option label="所有" value></el-option>
            <el-option label="基础用户" value=""></el-option>
            <el-option label="一级分销" value="1"></el-option>
            <el-option label="二级分销" value="2"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="状态">
          <el-select v-model="searchData.UserStatus" placeholder="用户状态">
            <el-option label="所有" value></el-option>
            <el-option label="正常" value="0"></el-option>
            <el-option label="禁用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="queryChange(1)">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="hy-body-centent" v-loading="loading">
      <el-table :data="userData" stripe style="width: 100%">
        <el-table-column label="用户ID" prop="UserId" width="80"></el-table-column>
        <el-table-column label="头像" width="100">
          <template slot-scope="scope">
            <block v-if="scope.row.HeadImg">
              <img :src="scope.row.HeadImg" class="el-Flower-picture" />
            </block>
            <block v-else>
              <img src="../../assets/images/defaulthead.png" class="el-Flower-picture" />
            </block>
          </template>
        </el-table-column>
        <el-table-column label="性别" width="80">
          <template slot-scope="scope">{{scope.row.Sex == 1?'男':(scope.row.Sex == 2?'女':'未知')}}</template>
        </el-table-column>
        <el-table-column label="名称" prop="NickName" width="120">
          <template slot-scope="scope">{{scope.row.NickName || '未命名'}}</template>
        </el-table-column>
        <el-table-column label="等级" width="120">
          <template slot-scope="scope">
            <!-- {{scope.row.SaleLevel}} -->
            <el-tag v-if="scope.row.SaleLevel === 0" effect="dark" type="info">普通用户</el-tag>
            <!-- <el-tag v-if="scope.row.SaleLevel === 1" effect="dark" type="danger">一级分销</el-tag> -->
            <el-tag v-else effect="dark" type="warning">{{scope.row.SaleLevel}}级分销</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="邀请码" width="100" prop="InviteCode"></el-table-column>
        <el-table-column label="上级码" width="100" prop="MarkCode"></el-table-column>
        <!-- <el-table-column label="地址" prop="NickName" width="200">
            <template
              slot-scope="scope"
            >{{scope.row.County}} {{scope.row.Province}} {{scope.row.City}}</template>
        </el-table-column>-->
        <el-table-column label="状态" prop="NickName" width="80">
          <template slot-scope="scope">{{scope.row.UserStatus?'禁用':'正常'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="hover" @command="handleCommand">
              <span class="el-dropdown-link">
                基本信息
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- @click="browse(scope.row.UserId)" @click="details(scope.row.UserId) -->
                <el-dropdown-item  :command="{fun:'browse',data:scope.row.UserId}">浏览记录</el-dropdown-item>
                <el-dropdown-item :command="{fun:'details',data:scope.row.UserId}">查看详情</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown trigger="hover"  @command="handleCommand">
              <span class="el-dropdown-link">
                优惠券设置
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- @click="grantCoupon(scope.row)"  @click="coupon(scope.row.UserId)"-->
                <el-dropdown-item  :command="{fun:'grantCoupon',data:scope.row}">发放优惠卷</el-dropdown-item>
                <el-dropdown-item :command="{fun:'coupon',data:scope.row.UserId}">查看优惠卷</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
             <el-dropdown trigger="hover"  @command="handleCommand">
              <span class="el-dropdown-link">
                分销设置
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- @click="upgrade(scope.row.UserId)"  @click="money(scope.row.UserId)" @click="sales(scope.row.UserId)"-->
                <el-dropdown-item :command="{fun:'upgrade',data:scope.row.UserId}" v-if="scope.row.SaleLevel === 0">升级分销商</el-dropdown-item>
                <el-dropdown-item :command="{fun:'money',data:scope.row.UserId}" v-if="scope.row.SaleLevel > 0">资金明细</el-dropdown-item>
                <el-dropdown-item :command="{fun:'sales',data:scope.row.UserId}" v-if="scope.row.SaleLevel > 0">销售订单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-button
              type="text"
              size="small"
              @click="upgrade(scope.row.UserId)"
              v-if="scope.row.SaleLevel === 0"
            >升级分销商</el-button> -->
            <!-- <el-button type="text" size="small" @click="browse(scope.row.UserId)">浏览记录</el-button>
            <el-button type="text" size="small" @click="coupon(scope.row.UserId)">优惠卷</el-button>
            <el-button type="text" size="small" @click="details(scope.row.UserId)">查看详情</el-button>
            <el-button type="text" size="small" @click="grantCoupon(scope.row)">发放优惠卷</el-button>
            <el-button type="text" size="small" @click="money(scope.row.UserId)">资金明细</el-button>
            <el-button type="text" size="small" @click="sales(scope.row.UserId)">销售订单</el-button> -->
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
    <!-- 弹出优惠券勾选框 -->
    <el-dialog title="指定发放优惠券" :visible.sync="popCoupon">
      <el-form :inline="true" size="small" class="demo-form-inline">
        <el-form-item>
          <div class="pop-user-warp">
            <img :src="objCurrentUser.HeadImg" />
            <span>{{objCurrentUser.NickName}}</span>
          </div>
        </el-form-item>
        <el-form-item label="优惠券名称:" v-model="searchData.FlowerName">
          <el-input placeholder="优惠券名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="queryCoupon">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="couponList">
        <el-table-column label="名称" prop="CouponName" align="center"></el-table-column>
        <el-table-column label="优惠券类型">
          <template slot-scope="scope">{{scope.row.CouponType?"折扣":"立减"}}</template>
        </el-table-column>
        <el-table-column label="金额/折扣" prop="CouponAmount"></el-table-column>
        <el-table-column label="选择">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="couponChange"
        page-size="10"
        layout="prev,pager,next,jumper,total"
        :total="couponQueryObject.pageTotal"
        :current-page="couponQueryObject.PageIndex"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCoupon">取 消</el-button>
        <el-button type="primary" @click="confirmCoupon">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  UserQueryList,
  QueryCouponInfoList,
  SetSaleUserFirst,
  Grant
} from "../../common/axios.config.js";
import { pushChecked } from "../../common/Util.js";
export default {
  components: {},
  data() {
    return {
      searchData: {
        Account: "",
        AccountType: "",
        NickName: "",
        Sex: "",
        SaleLevel:'',
        ParentId:'',
        UserId: "",
        PageIndex: 1,
        UserStatus: ""
      },
      userData: [],
      pageTotal: "",
      couponList: [], //优惠券数据
      popCoupon: false, //弹出框
      loading: false,
      objCurrentUser: {}, //当前点击用户对象
      // currentUserId: "", //当前点击名称
      couponQueryObject: {
        couponName: "", //名称
        PageIndex: 1,
        pageTotal: 0
      }
    };
  },
  methods: {
    queryUser() {
      var self = this,
        params = self.searchData;
      self.loading = true;
      self.$axios.post(UserQueryList, params).then(ret => {
        self.loading = false;
        self.userData = ret.Datas;
        self.pageTotal = ret.AllCount;
      });
    },
    //升级为一级分销商
    upgrade(userId) {
      const self = this;
      self
        .$confirm("你却都要升级该用户为分销商, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          self.$axios
            .post(SetSaleUserFirst, {
              userId: userId
            })
            .then(res => {
              if (res) {
                self.$message({
                  message: "升级成功",
                  type: "success"
                });
                self.queryUser();
              }
            })
            .catch(() => {});
        });
    },
    //分页
    queryChange(index) {
      this.searchData.PageIndex = index;
      this.queryUser();
    },
    //分页
    couponChange(index) {
      var that = this;
      that.couponQueryObject.PageIndex = index;
      that.queryCoupon();
    },
    //重置表单
    resetForm() {
      this.searchData = {
        Account: "",
        AccountType: "",
        NickName: "",
        Sex: "",
        UserId: "",
        SaleLevel:'',
        ParentId:'',
        UserStatus: ""
      };
    },
    handleCommand(command){
      this[command.fun](command.data)
      //ParentId
      //SaleLevel
    },
    details(userId) {
      this.$router.push(`/Web/Member/MemberDetails?userId=${userId}`);
    },
    browse(userId) {
      this.$router.push(`/Web/Member/MemberBrowse?userId=${userId}`);
    },
    coupon(userId) {
      this.$router.push(`/Web/Member/MemberCoupon?userId=${userId}`);
    },
    money(userId) {
      this.$router.push(`/Web/Member/MoneyList?userId=${userId}`);
    },
    sales(userId) {
      this.$router.push(`/Web/Member/SalesList?userId=${userId}`);
    },
    //弹出优惠券
    grantCoupon(item) {
      var that = this;
      that.objCurrentUser = item;
      that.popCoupon = true;
      that.queryCoupon();
    },
    //获取优惠卷
    queryCoupon() {
      var params = this.couponQueryObject,
        that = this;
      that.$axios.post(QueryCouponInfoList, params).then(ret => {
        that.couponList = pushChecked(ret.Datas, false);
        that.couponQueryObject.pageTotal = ret.AllCount;
      });
    },
    //取消发放优惠卷
    cancelCoupon() {
      var that = this;
      that.popCoupon = false;
      that.objCurrentUser = {};
    },
    //确定选择
    confirmCoupon() {
      var couponChecked = [],
        that = this,
        userId = that.objCurrentUser.UserId || false;
      that.couponList.forEach(function(item) {
        if (item.checked) {
          couponChecked.push(item.CouponId);
        }
      });
      if (couponChecked.length && userId) {
        that.$axios
          .post(Grant, { userId: userId, couponId: couponChecked.join(",") })
          .then(ret => {
            if (ret) {
              that.$message.success("发放成功");
              that.popCoupon = false;
            }
          });
      } else {
        this.$message("请填写完善");
      }
    }
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
// 下拉框
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    margin-right: 10px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>