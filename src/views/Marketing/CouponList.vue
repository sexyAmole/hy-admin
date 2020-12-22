<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-03 23:03:53
 -->
<!--  -->
<template>
  <div>
    <!--标题 -->
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          优惠卷管理
          <el-button size="small" @click="addCoupon" icon="el-icon-circle-plus" type="danger">添加优惠券</el-button>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="hy-search-box">
      <el-form
        :inline="true"
        :model="queryData"
        ref="queryData"
        size="small"
        class="demo-form-inline"
      >
        <el-form-item label="名称:">
          <el-input placeholder="优惠卷名称" v-model="queryData.CouponName"></el-input>
        </el-form-item>
        <el-form-item label="属性">
          <el-select v-model="queryData.CouponType" placeholder="优惠券属性">
            <el-option label="立减券" value="0"></el-option>
            <el-option label="折扣券" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="queryCoupon">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--内容 -->
    <div class="hy-body-centent" v-loading="loading">
      <el-table :data="couponData" stripe style="width: 100%">
        <el-table-column label="名称" prop="CouponName" align="center"></el-table-column>
        <el-table-column label="说明" prop="Description" align="center"></el-table-column>
        <el-table-column label="优惠券类型">
          <template slot-scope="scope">{{scope.row.CouponType?"折扣":"立减"}}</template>
        </el-table-column>
        <el-table-column label="金额/折扣" prop="CouponAmount"></el-table-column>
        <el-table-column label="数量" prop="CouponCount"></el-table-column>
        <el-table-column label="有效期类型">
          <template slot-scope="scope">{{!scope.row.ValidType?"固定日期":"动态时间"}}</template>
        </el-table-column>
        <!-- <el-table-column label="是否有范围设置">
          <template slot-scope="scope">{{scope.row.IsFit?"是":"否"}}</template>
        </el-table-column> -->
        <el-table-column label="满减">
          <template slot-scope="scope">
            <!-- {{scope.row.IsLowestSpend?"是":"否"}} -->
            <span
              v-if="scope.row.IsLowestSpend"
            >满{{scope.row.LowestSpend}}减{{scope.row.CouponAmount}}</span>
            <span v-else>无门槛</span>
          </template>
        </el-table-column>
        <el-table-column label="领取数量" prop="GrantCount"></el-table-column>
        <el-table-column label="操作"  width="320">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="couponReceive(scope.row.CouponId)">领取详情</el-button>
            <el-button type="text" size="small" @click="couponInfo(scope.row.CouponId)">查看详情</el-button>
            <el-button type="text" size="small" @click="delCoupon(scope.row.CouponId)">删除优惠券</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page-box">
      <el-pagination
        @current-change="queryChange"
        page-size="10"
        layout="total,prev,pager,next,jumper"
        :total="pageTotal"
        background
        :current-page="queryData.PageIndex"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  QueryCouponInfoList,
  DelCouponInfo
} from "../../common/axios.config.js";
// import {  } from "../../common/Util.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      loading: false,
      queryData: {
        CouponName: "", //名称
        PageIndex: "",
        CouponType: "" //优惠券类型
      },
      pageTotal: "",
      couponData: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //重置表单
    resetForm() {
      this.queryData = {
        CouponName: "", //名称
        CouponType: "" //优惠券类型
      };
    },
    //分页
    queryChange(index) {
      this.queryData.PageIndex = index;
      this.queryCoupon();
    },
    //查询
    queryCoupon() {
      var params = this.queryData,
        that = this;
      that.loading = true;
      that.$axios.post(QueryCouponInfoList, params).then(ret => {
        that.loading = false;
        that.couponData = ret.Datas;
        that.pageTotal = ret.AllCount;
      });
    },
    addCoupon() {
      this.$router.push("/Web/Marketing/SetCoupon/add");
    },
    couponReceive(couponId){
      this.$router.push(`/Web/Member/MemberCoupon?couponId=${couponId}`);
    },
    delCoupon(couponId) {
      var that = this;
      that
        .$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let params = {
            couponId: couponId
          };
          that.$axios.post(DelCouponInfo, params).then(res => {
            if (res.Code == 200) {
              that.queryCoupon();
            }
          });
        })
        .catch(() => {});
    },
    couponInfo(couponId) {
      this.$router.push(`/Web/Marketing/SetCoupon/edit?couponId=${couponId}`);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.queryCoupon();
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