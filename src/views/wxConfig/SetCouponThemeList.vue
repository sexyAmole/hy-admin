<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-04 22:36:59
 -->
<!--  -->
<template>
  <div>
    <!--标题 -->
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Web/wxCoupon/CouponThemeList' }">优惠卷主题</el-breadcrumb-item>
        <el-breadcrumb-item>编辑优惠卷主题</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--内容 -->
    <div class="hy-body-centent">
      <div class="hy-body-handle">
        <div class="el-card__header">
          <div class="clearfix">
            <span style="margin-right:10px">编辑主题</span>
          </div>
        </div>
        <el-row>
          <el-form ref="form" :model="formData" label-width="80px">
            <el-form-item label="标题" class="rui-fromDiy-row">
              <el-input v-model="formData.Title"></el-input>
            </el-form-item>
            <el-form-item label="简介" class="rui-fromDiy-row">
              <el-input v-model="formData.Summary"></el-input>
            </el-form-item>
            <el-form-item label="图片" class="rui-fromDiy-row">
              
              <el-upload
                ref="upload"
                action="http://up-z2.qiniup.com"
                :data="qiniuData"
                accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PBG"
                :before-upload="beforeAvatarUpload"
                :auto-upload="true"
                :file-list="fileList"
                :on-error="uperror"
                :on-remove="upRemove"
                :on-success="upsuccess"
                :on-exceed="exceedPic"
                limit="1"
              >
              <img v-if="formData.ImgUrl" :src="formData.ImgUrl" class="from-img-200">
                <el-button size="small" type="primary" v-else>上传图片</el-button>
              </el-upload>
            </el-form-item >
            <el-form-item label="图片链接" class="rui-fromDiy-row">
              <el-input v-model="formData.LinkUrl"></el-input>
            </el-form-item>
            <el-form-item label="优惠卷" >
              <el-table :data="couponData" empty-text="" border>
                <el-table-column label="名称" prop="CouponName"></el-table-column>
                <el-table-column label="类型">
                  <template slot-scope="scope">{{scope.row.CouponType?"折扣":"立减"}}</template>
                </el-table-column>
                <el-table-column label="金/折" prop="CouponAmount"></el-table-column>
                <el-table-column label="类型">
                  <template slot-scope="scope">{{!scope.row.ValidType?"固定日期":"动态时间"}}</template>
                </el-table-column>
                <el-table-column label="范围">
                  <template slot-scope="scope">{{scope.row.IsFit?"是":"否"}}</template>
                </el-table-column>
                <el-table-column label="满减">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.IsLowestSpend"
                    >满{{scope.row.LowestSpend}}减{{scope.row.CouponAmount}}</span>
                    <span v-else>无门槛</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" type="index" width="120px">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="delCoupon(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-add">
              <el-button size="small" type="primary" @click="grantCoupon">添加优惠卷</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-row>
        <div class="btn-form">
          <el-form class="demo-ruleForm" label-width="100px">
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交保存</el-button>
              <el-button>
                <router-link to="/Web/wxCoupon/CouponThemeList">取消</router-link>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <!-- 弹出优惠券勾选框 -->
    <el-dialog title="选择优惠券" :visible.sync="popCoupon">
      <el-form :inline="true" size="small" class="demo-form-inline">
        <el-form-item label="优惠券名称:" v-model="couponQueryObject.couponName">
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
        <el-button @click="popCoupon = !popCoupon">取 消</el-button>
        <el-button type="primary" @click="confirmCoupon">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  QueryCouponZone,
  QueryCouponInfoList,
  EditCouponZone,
  QueToken
} from "../../common/axios.config.js";
import { getQueryString } from "../../common/Util.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      formData: {
        Title: "",
        Summary: "",
        LinkUrl: "",
        ImgUrl: "",
        CouponIds: []
      },
      fileList: [],
      qiniuData: {
        //上传七牛数据
        token: "",
        key: ""
      },
      couponQueryObject: {
        couponName: "", //名称
        PageIndex: 1,
        pageTotal: 0
      },
      popCoupon: false,
      couponData: [], //选择的优惠卷数据
      couponList: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 上传此前获取Token
    beforeAvatarUpload: async function(file) {
      var that = this;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        that.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      } else {
        await that.$axios
          .get(QueToken, { params: { type: "coupontheme" } })
          .then(res => {
            that.qiniuData.token = res.uptoken;
            that.qiniuData.key = res.saveKey;
          });
      }
    },
    upsuccess(file) {
      var that = this;
      let url = `https://image.huayixh.com/${file.key}`;
      that.formData.ImgUrl = url;
      that.fileList = [];
    },
    uperror() {
      this.$message.error("上传失败");
    },
    exceedPic() {
      this.$message.error("最多只能上传一张;请先删除一张");
    },
    upRemove() {
      this.formData.ImgUrl = "";
    },
    delCoupon(index) {
      var that = this,couponIds = that.formData.CouponIds;
      couponIds.splice(couponIds.indexOf(that.couponData[index].CouponId), 1);
      that.formData.CouponIds = couponIds;
      that.couponData.splice(index, 1);
    },
    //获取优惠卷
    queryCoupon() {
      var params = this.couponQueryObject,
        that = this;
      that.$axios.post(QueryCouponInfoList, params).then(ret => {
        var coupon = ret.Datas;
        for (let i = 0; i < coupon.length; i++) {
          coupon[i].checked = false;
          if (that.formData.CouponIds.indexOf(coupon[i].CouponId) > -1) {
            coupon[i].checked = true;
          }
        }
        that.couponList = coupon;
        that.couponQueryObject.pageTotal = ret.AllCount;
      });
    },
    //弹出优惠券
    grantCoupon() {
      var that = this;
      that.popCoupon = true;
      that.queryCoupon();
    },
    //分页
    couponChange(index) {
      var that = this;
      that.couponQueryObject.PageIndex = index;
      that.queryCoupon();
    },
    confirmCoupon() {
      var that = this,
        coupon = that.couponList,
        lodCoupon = that.couponData,
        lodCouponIds = that.formData.CouponIds;
      for (let i = 0; i < coupon.length; i++) {
        if (coupon[i].checked) {
           lodCoupon.push(coupon[i]);
           lodCouponIds.push(coupon[i].CouponId);
        }
      }
      const res = new Map();
      that.couponData = lodCoupon.filter(item =>!res.has(item.CouponId) && res.set(item.CouponId, 1))
      that.formData.CouponIds = [...new Set(lodCouponIds)];
      that.popCoupon = false;
    },
    submitForm() {
      var that = this,
        params = that.formData;
      that.$axios
        .post(EditCouponZone, { jsonData: JSON.stringify(params) })
        .then(ret => {
          if (ret.Code == "200") {
            that.$message.success("编辑成功");
            that.$router.push("/Web/wxCoupon/CouponThemeList");
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let that = this;
    that.$nextTick(function() {
      let zoneId = getQueryString("id");
      if (zoneId) {
        that.$axios.post(QueryCouponZone, { zoneId: zoneId }).then(res => {
          if (res) {
            that.couponData = res.CouponList;
            that.formData = {
              ImgUrl: res.ImgUrl,
              LinkUrl: res.LinkUrl,
              Summary: res.Summary,
              Title: res.Title,
              CouponIds: res.CouponIds.split("|"),
              ZoneId: res.ZoneId
            };
          }
        });
      }
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