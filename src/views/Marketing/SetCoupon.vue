<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: zsm
 * @LastEditTime: 2020-04-11 14:34:34
 -->
<template>
  <div>
    <!--标题 -->
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Web/Marketing/CouponList' }">优惠券管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--内容 -->
    <div class="hy-body-centent hy-body-handle">
      <el-form label-width="100px" :model="couponObject" class="demo-ruleForm hui-from">
        <div class="el-card__header">
          <div class="clearfix">
            <span>优惠券设置</span>
          </div>
        </div>
        <el-row :gutter="20" class="rui-fromDiy-row">
          <el-col :span="24">
            <el-form-item label="优惠券名称">
              <el-input autocomplete="off" type="text" v-model="couponObject.CouponName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="优惠券类型">
              <el-select v-model="couponObject.CouponType" placeholder="请选择">
                <el-option label="立减券" :value="0"></el-option>
                <el-option label="折扣券" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额/折扣">
              <el-input autocomplete="off" type="number" v-model="couponObject.CouponAmount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数量">
              <el-input autocomplete="off" type="number" v-model="couponObject.CouponCount"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="领取限制">
              <el-input autocomplete="off" type="number" v-model="couponObject.CouponLimit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="说明">
              <el-input autocomplete="off" type="text" v-model="couponObject.Description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="有效期类型">
              <el-select v-model="couponObject.ValidType" placeholder="请选择">
                <el-option label="固定日期" :value="0"></el-option>
                <el-option label="动态时间" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="couponObject.ValidType == 0">
            <el-form-item label="固定时间设置">
              <el-date-picker
                v-model="FixedDate"
                type="datetimerange"
                @blur="dateChange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <block v-if="couponObject.ValidType == 1">
            <el-col :span="12">
              <el-form-item label="几天生效">
                <el-input autocomplete="off" type="number" v-model="couponObject.ValidStartDate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效期天数">
                <el-input autocomplete="off" type="number" v-model="couponObject.ValidDayCount"></el-input>
              </el-form-item>
            </el-col>
          </block>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="送达时间">
                <el-switch v-model="couponObject.IsLimitSendDate"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="couponObject.IsLimitSendDate">
              <el-date-picker
                v-model="IsLimitDate"
                type="datetimerange"
                @blur="IsLimitChange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="是否最低消费">
                <el-switch v-model="couponObject.IsLowestSpend"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="couponObject.IsLowestSpend">
              <el-form-item label="最低消费">
                <el-input autocomplete="off" type="number" v-model="couponObject.LowestSpend">
                  <span slot="append">￥</span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <!-- <el-col :span="24">
              <el-form-item label="商品">
                  <el-table :data="product" style="width: 100%" empty-text border>
                    <el-table-column prop="NowPrice" label="价格" width="80"></el-table-column>
                      <template slot-scope="scope">{{scope.row.Status?'下架':'上架'}}</template>
                    <el-table-column label="缩略图" width="80">
                      <template slot-scope="scope">
                        <img :src="scope.row.SmImg || scope.row.ImgUrl +'?imageView2/2/w/100/h/100/q/100|imageslim'" class="el-Flower-picture" alt>
                      </template>
                    </el-table-column>
                    <el-table-column prop="Keywords" label="名称"></el-table-column>
                    <el-table-column label="价格" width="100">
                      <template slot-scope="scope">
                        {{scope.row.SalePrice || scope.row.NowPrice}}
                        <img :src="scope.row.SmImg || scope.row.ImgUrl" class="el-Flower-picture" alt>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                          <el-button type="text" size="small" v-if="scope.$index != 0" @click="setSort(false,scope.$index,scope.$index-1)">上移</el-button>
                          <el-button type="text" size="small" v-if="scope.$index != item.DataList.length -1" @click="setSort(false,scope.$index,scope.$index+1)">下移</el-button>
                          <el-button type="text" size="small" @click="product.splice(scope.$index, 1)">删除商品</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="table-add">
                    <el-button size="small" type="primary" @click="ProdutShow = true">添加商品</el-button>
                  </div>
            </el-form-item>
          </el-col> -->
         
          <!-- <el-col :span="24">
            <el-form-item label="范围设置">
              <el-switch v-model="couponObject.IsFit"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="couponObject.IsFit">
            <el-col :span="24">
              <el-form-item label="可用分类">
                <el-checkbox-group v-model="couponObject.FitCategory">
                  <el-checkbox
                    v-for="(items,index) in categoryData"
                    :label="items.CategoryId+''"
                    :key="index"
                    :disabled="disabledFitCategory(items.CategoryId)"
                  >{{items.CategoryName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="不可用分类">
                <el-checkbox-group v-model="couponObject.NotFitCategory">
                  <el-checkbox
                    v-for="(items,index) in categoryData"
                    :label="items.CategoryId+''"
                    :key="index"
                    :disabled="disabledNotFitCategory(items.CategoryId)"
                  >{{items.CategoryName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-col> -->

          <el-col :span="24">
            <el-form-item label="可使用商品">
              <el-input autocomplete="off" v-model="couponObject.ApplySkuId" type="text"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="简介">
              <el-input autocomplete="off" v-model="couponObject.Summary" type="text"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="使用须知">
              <el-input autocomplete="off" v-model="couponObject.Notice" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn-form">
        <el-form class="demo-ruleForm" label-width="120px">
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交保存</el-button>
            <el-button>
              <router-link to="/Web/Marketing/CouponList">取消</router-link>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 商品选择框 -->
    <el-dialog title="选择商品" :visible.sync="ProdutShow">
      <product :Flowers="product" :show="ProdutShow" :SelectType="true" @change="onSelect"></product>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ProdutShow = false">取 消</el-button>
        <el-button type="primary" @click="ProdutShow = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  EditCouponInfo,
  QueryCategoryList,
  QueryCouponInfo
} from "../../common/axios.config.js";
import { formatDateString, getQueryString } from "../../common/Util.js";
import product from "../../component/product/index";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { product },
  data() {
    //这里存放数据
    return {
      title: "",
      categoryData: [], //分类数据
      ProdutShow:false,
      product:[],//sku产品
      couponObject: {
        ApplySkuId:'',//商品ID
        CouponName: "", //优惠券名称
        CouponType: "", //优惠券类型 0：立减 1：折扣券
        CouponId: "",
        CouponAmount: "", //优惠金额/折扣
        CouponCount: "", //优惠券数量
        CouponLimit: "", //优惠券领券限制数量
        ValidDayCount: "", //有效天数
        ValidType: 0, //有效期类型
        FixedEndDate: "", //固定日期结束时间
        FixedStartDate: "", //固定日期开始时间
        IsLimitSendDate: false, //是否设置使用时间
        LimitSendStartDate: "",
        LimitSendEndDate: "",
        // IsFit: false, //是否有适用范围
        Notice: "", //使用须知
        Summary: "", //简介
        // NotFitCategory: [], //不适用分类
        // FitCategory: [], //适用分类
        Description: "", //说明
        IsLowestSpend: false, //是否需要最低消费
        LowestSpend: "", //是否需要最低消费
        ValidStartDate: "" //开始生效时间
      },
      FixedDate: [],
      IsLimitDate: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //商品选择回调
    onSelect(value) {
      const self = this;
      const data = JSON.parse(JSON.stringify(value));
      const product = self.product;
      if (data.checked) {
        product.push(data);
      } 
      else {
        for (let i = 0; i < product.length; i++) {
          if (product[i].SkuId == data.SkuId) {
            product.splice(i, 1);
            break;
          }
        }
      }
    },
    disabledNotFitCategory(id) {
      return this.couponObject.FitCategory.indexOf(id.toString()) > -1
        ? true
        : false;
    },
    disabledFitCategory(id) {
      return this.couponObject.NotFitCategory.indexOf(id.toString()) > -1
        ? true
        : false;
    },
    queryDetails() {
      var that = this;
      that.$axios.get(QueryCategoryList).then(res => {
        var categoryData = [];
        res.forEach(function(item) {
          categoryData = [...categoryData, ...item.Children];
        });
        that.categoryData = categoryData;
      });
    },
    dateChange() {
      var date = this.FixedDate;
      this.couponObject.FixedStartDate = date ? date[0] : "";
      this.couponObject.FixedEndDate = date ? date[1] : "";
    },
    IsLimitChange() {
      var date = this.IsLimitDate;
      this.couponObject.LimitSendStartDate = date ? date[0] : "";
      this.couponObject.LimitSendEndDate = date ? date[1] : "";
    },
    qeuryProductId(){
      const el_product = this.product;
      let skuIds = [];
      if(el_product.length){
        el_product.forEach(item=>{
          skuIds.push(item.SkuId)
        })
      }
      return skuIds.join("|")
    },
    submitForm() {
      var that = this,
        params = JSON.parse(JSON.stringify(that.couponObject));
      // params.NotFitCategory = params.NotFitCategory.join(",");
      // params.FitCategory = params.FitCategory.join(",");
      // params.ApplySkuId = that.qeuryProductId();
      that.$axios.post(EditCouponInfo, params).then(res => {
        if (!res) {
          that.$message.error(res.Message);
        } else {
          that.$message.success("添加成功");
          that.$router.push("/Web/Marketing/CouponList");
        }
      });
    },
    couponInfo(couponId) {
      var that = this,
        couponObject = JSON.parse(JSON.stringify(that.couponObject));
      that.$axios
        .get(QueryCouponInfo, { params: { couponId: couponId } })
        .then(ret => {
          if (ret) {
            ret.FixedEndDate = formatDateString(ret.FixedEndDate);
            ret.FixedStartDate = formatDateString(ret.FixedStartDate);
            ret.LimitSendEndDate = formatDateString(ret.LimitSendEndDate);
            ret.LimitSendStartDate = formatDateString(ret.LimitSendStartDate);
            // ret.NotFitCategory = ret.NotFitCategory
            //   ? ret.NotFitCategory.split(",")
            //   : [];
            // ret.FitCategory = ret.FitCategory ? ret.FitCategory.split(",") : [];
            this.couponObject = { ...couponObject, ...ret };
            that.FixedDate = [ret.FixedStartDate, ret.FixedEndDate];
            that.IsLimitDate = [ret.LimitSendStartDate, ret.LimitSendEndDate];
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let that = this,
      typeId = this.$route.params;
    if (typeId.id == "add" || typeId.id == "edit") {
      that.title = typeId.id == "add" ? "添加商品" : "编辑商品";
      var couponId = getQueryString("couponId");
      if (couponId) {
        that.couponInfo(couponId);
      }
    } else {
      that.$router.push("/404");
    }
    that.queryDetails();
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