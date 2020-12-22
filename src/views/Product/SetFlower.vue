<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-07 15:55:02
 -->
<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Web/Product/FlowerList' }">商品列表</el-breadcrumb-item>
        <el-breadcrumb-item>设置商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="hy-body-centent" v-loading="loading">
      <el-form
        label-width="80px"
        :model="FlowerData"
        ref="FlowerData"
        :rules="rules"
        class="demo-ruleForm hui-from"
      >
        <div class="hy-body-handle">
          <div class="el-card__header">
            <div class="clearfix">
              <span>分类属性设置</span>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="24" class="rui-fromDiy-row">
              <el-form-item label="所属分类" prop="CategoryId">
                <el-cascader
                  :options="categoryData"
                  :value="selectedCategory"
                  :props="categoryProps"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <!--  prop="AttributeId" -->
              <block v-for="(item,indexs) in attributeData" :key="indexs">
                <el-form-item
                  v-if="item.Children.length"
                  :label="item.AttributeName+'属性'"
                  prop="AttributeId"
                >
                  <el-checkbox-group v-model="FlowerData.AttributeId">
                    <el-checkbox
                      v-for="(items,index) in item.Children"
                      :label="items.AttributeId"
                      :key="index"
                    >{{items.AttributeName}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </block>
            </el-col>
          </el-row>
          <div class="el-card__header">
            <div class="clearfix">
              <el-tooltip class="item" effect="dark" content="权重越高排名越高" placement="right">
                <span>
                  基础信息设置
                  <i class="el-icon-warning" style="margin-left:8px;"></i>
                </span>
              </el-tooltip>
            </div>
          </div>
          <el-row class="rui-fromDiy-row">
            <el-col :span="24">
              <el-form-item label="商品名称" prop="FlowerName">
                <el-input autocomplete="off" placeholder="输入商品名称" v-model="FlowerData.FlowerName"></el-input>
              </el-form-item>
              <el-form-item label="商品花语">
                <el-input autocomplete="off" placeholder="例如:爱你一万年" v-model="FlowerData.FlowerMean"></el-input>
              </el-form-item>
              <el-form-item label="商品花材" prop="Material">
                <el-input
                  autocomplete="off"
                  placeholder="例如:1朵玫瑰、2朵红玫瑰"
                  v-model="FlowerData.Material"
                ></el-input>
              </el-form-item>
              <el-form-item label="关键词" prop="Keywords">
                <el-input
                  autocomplete="off"
                  placeholder="关键词(多个用 | 开)"
                  v-model="FlowerData.Keywords"
                ></el-input>
              </el-form-item>
              <el-form-item label="最低数量" prop="LowestBuyCount">
                <el-input autocomplete="off" v-model="FlowerData.LowestBuyCount"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品单位">
                    <el-input autocomplete="off" v-model="FlowerData.FlowerUnit"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="销量">
                    <el-input autocomplete="off" v-model="FlowerData.Sales"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品排序">
                    <el-input autocomplete="off" v-model="FlowerData.Sort"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="商品数量">
                    <el-input autocomplete="off" v-model="FlowerData.FlowerCount"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="el-card__header">
            <div class="clearfix">
              <span>营销设置</span>
            </div>
          </div>
          <el-row class="rui-fromDiy-row">
            <el-col :span="24">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="是否特价">
                    <el-switch v-model="FlowerData.IsSpecial"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否推荐">
                    <el-switch v-model="FlowerData.IsRecommend"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否热门">
                    <el-switch v-model="FlowerData.IsHot"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="当日达">
                    <el-switch v-model="FlowerData.IsTodaySend"></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="el-card__header">
            <div class="clearfix">
              <span>价格比例设置</span>
            </div>
          </div>
          <el-row class="rui-fromDiy-row">
            <el-col :span="24">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="基础价" prop="BasePrice">
                    <el-input autocomplete="off" type="number" v-model="FlowerData.BasePrice">
                      <span slot="append">￥</span>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="转单比例">
                    <el-input
                      autocomplete="off"
                      :disabled="true"
                      type="number"
                      v-model="Proportion.ShiftPercent"
                    >
                      <span
                        slot="prepend"
                      >￥{{(FlowerData.BasePrice * Proportion.ShiftPercent)|toInteger}}</span>
                      <span slot="append">%</span>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="销售比例">
                    <el-input
                      autocomplete="off"
                      :disabled="true"
                      type="number"
                      v-model="Proportion.SellPercent"
                    >
                      <span
                        slot="prepend"
                      >￥{{FlowerData.BasePrice * Proportion.SellPercent|toInteger}}</span>
                      <span slot="append">%</span>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="市场比例">
                    <el-input
                      autocomplete="off"
                      :disabled="true"
                      type="number"
                      v-model="Proportion.MarketPercent"
                    >
                      <span
                        slot="prepend"
                      >￥{{FlowerData.BasePrice * Proportion.MarketPercent|toInteger}}</span>
                      <span slot="append">%</span>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="加减价">
                    <el-input autocomplete="off" type="number" v-model="FlowerData.FloatPrice">
                      <span slot="append">￥</span>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="最终价">
                    <el-input autocomplete="off" :disabled="true" type="number" :value="finalPrice"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- <el-form-item label="时间段" prop="TimeSlot">
                                <el-date-picker v-model="TimeSlot" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
              </el-form-item>-->
            </el-col>
          </el-row>
          <div class="el-card__header">
            <div class="clearfix">
              <span>图片设置</span>
            </div>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="轮播图">
                <el-table :data="BannerMap" style="width: 100%" border>
                  <el-table-column label="排序" type="index" width="80"></el-table-column>
                  <el-table-column label="图片">
                    <template slot-scope="scope">
                      <img :src="scope.row" class="el-Flower-picture" />
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="moveUp(BannerMap,scope.$index)">上移</el-button>
                      <el-button
                        type="text"
                        size="small"
                        @click="moveDown(BannerMap,scope.$index)"
                      >下移</el-button>
                      <el-button
                        type="text"
                        size="small"
                        @click="pictureRemove(BannerMap,scope.$index)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="table-add">
                  <el-upload
                    ref="upload"
                    action="http://up-z2.qiniup.com"
                    :data="qiniuData"
                    accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PBG"
                    :before-upload="bannerUpload"
                    :show-file-list="false"
                    :auto-upload="true"
                    :on-error="uperror"
                    :multiple="true"
                    :on-success="BannerSuccess"
                  >上传图片</el-upload>
                </div>
              </el-form-item>
              <el-form-item label="详情图">
                <el-table :data="detailmap" style="width: 100%" border>
                  <el-table-column label="排序" type="index" width="80"></el-table-column>
                  <el-table-column label="图片">
                    <template slot-scope="scope">
                      <img :src="scope.row" class="el-Flower-picture" />
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="moveUp(detailmap,scope.$index)">上移</el-button>
                      <el-button
                        type="text"
                        size="small"
                        @click="moveDown(detailmap,scope.$index)"
                      >下移</el-button>
                      <el-button
                        type="text"
                        size="small"
                        @click="pictureRemove(detailmap,scope.$index)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="table-add">
                  <el-upload
                    ref="upload"
                    action="http://up-z2.qiniup.com"
                    :data="qiniuData"
                    accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PBG"
                    :before-upload="detailsUpload"
                    :auto-upload="true"
                    :show-file-list="false"
                    :on-error="uperror"
                    :multiple="true"
                    :on-success="detailmapsuccess"
                  >上传图片</el-upload>
                </div>
              </el-form-item>
               <el-form-item label="">
                <el-input v-model="writeLink" placeholder="输入链接" @blur="blurLink"></el-input>
              </el-form-item>
              <el-form-item label="缩略图">
                <el-upload
                  ref="upload"
                  action="http://up-z2.qiniup.com"
                  list-type="picture-card"
                  :data="qiniuData"
                  accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PBG"
                  :before-upload="thumbnailUpload"
                  :file-list="thumbnail"
                  :auto-upload="true"
                  :on-error="uperror"
                  :on-remove="thumbnailRemove"
                  :on-success="thumbnailsuccess"
                  :on-exceed="exceedPic"
                  limit="1"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
                 <el-form-item label="">
                <el-input v-model="omitLink" placeholder="输入链接" @blur="setOmitLink"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div class="btn-form">
        <el-form class="demo-ruleForm" label-width="120px">
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交保存</el-button>
            <el-button>
              <router-link to="/Web/Product/FlowerList">取消</router-link>
            </el-button>
          </el-form-item>
            
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  AttributeList,
  QueryCategoryList,
  QueToken,
  EditFlower,
  QueryFlowerDetail,
  CategoryPrice
} from "../../common/axios.config.js";
import { emptyFalse, getQueryString, FormatDate } from "../../common/Util.js";
export default {
  data() {
    const pictureEmpty = (rule, value, callback) => {
      if (!value) {
        callback(new Error(rule.message));
      } else {
        callback();
      }
    };
    return {
      attributeData: [], //属性对象
      categoryData: [], //分类对象
      TimeSlot: [], //时间段
      loading: false,
      finalPrice: 0, //最终价
      writeLink:'',//写入链接
      omitLink:'',//写入链接
      FlowerData: {
        //鲜花对象
        AttributeId: [], //属性数组
        BasePrice: "", //基础价格
        CategoryId: "", //分类ID
        Content: "", //详情内容
        FlowerCount: 520, //鲜花数量
        FlowerMean: "", //花语
        FlowerName: "", //产品名称
        FlowerUnit: "束", //鲜花单位（只、束....）
        ImgUrl: "", //主题图片
        Banner: "", //缩略图
        IsHot: false, //是否热门
        IsRecommend: false, //是否推荐
        IsSpecial: false, //是否特价
        Material: "", //材质
        Sales: 1314, //销量
        Keywords: "", //关键词
        IsTodaySend: true, // 是否当日达
        LowestBuyCount: 1, //最低购买数量
        FloatPrice: 0, //加减价
        Sort: 1 //排序
      },
      selectedCategory: [], //分类
      thumbnail: [],
      detailmap: [],
      BannerMap: [],
      qiniuData: {
        token: "",
        key: ""
      },
      Proportion: {
        ShiftPercent: "", //转单比例
        SellPercent: "", //销售
        MarketPercent: "" //市场
      }, //鲜花价格比例
      categoryProps: {
        //分类选择KEY修改
        label: "CategoryName",
        value: "CategoryId",
        children: "Children"
      },
      rules: {
        //数据验证
        AttributeId: [
          {
            type: "array",
            required: true,
            message: "勾选属性",
            trigger: "change"
          }
        ],
        CategoryId: [
          { required: true, message: "选择分类", trigger: "change" }
        ],
        FlowerName: [{ required: true, message: "输入名称", trigger: "blur" }],
        Material: [{ required: true, message: "输入花材", trigger: "blur" }],
        BasePrice: [{ required: true, message: "输入价格", trigger: "blur" }],
        Keywords: [{ required: true, message: "输入关键字", trigger: "blur" }],
        ImgUrl: [
          {
            validator: pictureEmpty,
            message: "输入上传主图",
            trigger: "change"
          }
        ],
        Content: [
          {
            validator: pictureEmpty,
            message: "输入上传详情图",
            trigger: "change"
          }
        ],
        Banner: [
          {
            validator: pictureEmpty,
            message: "请上传轮播图",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    blurLink(){
      let writeLink = this.writeLink;
      if(writeLink.indexOf("https")> -1){
        this.detailmap.push(writeLink);
         this.writeLink = "";
      }
    },
    //写入缩略图
    setOmitLink(){
      let omitLink = this.omitLink;
      if(omitLink.indexOf("https")> -1){
        this.thumbnail=[{ url: omitLink }];
        this.FlowerData.ImgUrl = omitLink;
        this.omitLink = "";
      }
    },
    handleChange(item) {
      let that = this;
      that.FlowerData.CategoryId = item[1];
      that.$axios.post(CategoryPrice, { categoryId: item[1] }).then(ret => {
        that.Proportion.ShiftPercent = ret.ShiftPercent;
        that.Proportion.SellPercent = ret.SellPercent;
        that.Proportion.MarketPercent = ret.MarketPercent;
      });
    },
    submitForm() {
      let that = this;
      this.$refs["FlowerData"].validate(valid => {
        if (valid) {
          that.FlowerData.Banner = that.BannerMap.join(",");
          that.FlowerData.Content = that.detailmap.join(",");
          let params = {
            ...that.FlowerData,
            Prices: [{ StartDate: that.TimeSlot[0], EndDate: that.TimeSlot[1] }]
          };
          that.$axios
            .post(EditFlower, { jsonData: JSON.stringify(params) })
            .then(res => {
              if (res.Code == 200) {
                that.$message.success(
                  that.FlowerData.FlowerId ? "修改成功" : "添加成功"
                );
                that.$router.push("/Web/Product/FlowerList");
              }
            });
        }
      });
    },
    thumbnailsuccess(file) {
      let url = `https://image.huayixh.com/${file.key}`;
      this.FlowerData.ImgUrl = url;
      this.$refs["FlowerData"].validateField(["ImgUrl"]);
    },

    detailmapsuccess(file) {
      let urls = `https://image.huayixh.com/${file.key}`;
      this.detailmap.push(urls);
      //   let Content = this.FlowerData.Content;
      //   let isd = Content ? "," : "";
      //   this.FlowerData.Content = Content + isd + urls;
      this.$refs["FlowerData"].validateField(["Content"]);
    },
    exceedPic() {
      this.$message.error("最多只能上传一张;请先删除一张");
    },
    BannerSuccess(file) {
      let urls = `https://image.huayixh.com/${file.key}`;
      this.BannerMap.push(urls);
      this.$refs["FlowerData"].validateField(["Banner"]);
    },
    uperror() {
      this.$message.error("上传失败");
    },
    thumbnailRemove() {
      this.FlowerData.ImgUrl = "";
      this.$refs["FlowerData"].validateField(["ImgUrl"]);
    },
    pictureRemove(data, index) {
      data.splice(index, 1);
      //   let SuccessData = this.FlowerData.Banner.split(",");
      //   let urls = file.response ? file.response.key : file.url.replace(",", "");
      //   for (var i = 0; i < SuccessData.length; i++) {
      //     if (urls.indexOf(SuccessData[i]) > -1) {
      //       SuccessData.splice(i, 1);
      //       break;
      //     }
      //   }
      //   this.FlowerData.Banner = SuccessData.length ? SuccessData.join(",") : "";
      //   this.$refs["FlowerData"].validateField(["Banner"]);
    },
    detailmapRemove(file) {
      let SuccessData = this.FlowerData.Content.split(",");
      let urls = file.response ? file.response.key : file.url.replace(",", "");
      for (var i = 0; i < SuccessData.length; i++) {
        if (urls.indexOf(SuccessData[i]) > -1) {
          SuccessData.splice(i, 1);
          break;
        }
      }
      this.FlowerData.Content = SuccessData.length ? SuccessData.join(",") : "";
      this.$refs["FlowerData"].validateField(["Content"]);
    },
    bannerUpload: async function() {
      //上传七牛之前要获取KEY token
      var that = this;
      await that.$axios
        .get(QueToken, { params: { type: "flower/banner" } })
        .then(res => {
          that.qiniuData.token = res.uptoken;
          that.qiniuData.key = res.saveKey;
        });
    },
    detailsUpload: async function() {
      //上传七牛之前要获取KEY token
      var that = this;
      await that.$axios
        .get(QueToken, { params: { type: "flower/details" } })
        .then(res => {
          that.qiniuData.token = res.uptoken;
          that.qiniuData.key = res.saveKey;
        });
    },
    thumbnailUpload: async function() {
      //上传七牛之前要获取KEY token
      var that = this;
      await that.$axios
        .get(QueToken, { params: { type: "flower/thumbnail" } })
        .then(res => {
          that.qiniuData.token = res.uptoken;
          that.qiniuData.key = res.saveKey;
        });
    },
    moveDown(data, index) {
      // 下移
      if (data.length - 1 != index) {
        data[index] = data.splice(index + 1, 1, data[index])[0];
      }
    },
    moveUp(data, index) {
      // 上移
      if (index != 0) {
        data[index] = data.splice(index - 1, 1, data[index])[0];
      }
    },
    initialize() {
      let that = this;
      that.$axios.get(AttributeList).then(res => {
        that.attributeData = res;
      });
      that.$axios.get(QueryCategoryList).then(res => {
        that.categoryData = emptyFalse(res);
      });
      let FlowerId = getQueryString("FlowerId");
      if (FlowerId) {
        that.loading = true;
        that.$axios
          .get(QueryFlowerDetail, { params: { id: FlowerId } })
          .then(res => {
            let FlowerData = that.FlowerData,
              attribute = res.FlowerAttributeList,
              FlowerInfo = res.FlowerInfo,
              FlowerPriceList = res.FlowerPriceList[0],
              FlowerCategory = res.FlowerCategory;
            //添加属性ID;
            attribute.forEach(function(item) {
              FlowerData.AttributeId.push(item.AttributeId);
            });

            that.Proportion.ShiftPercent = FlowerPriceList.ShiftPercent;
            that.Proportion.SellPercent = FlowerPriceList.SellPercent;
            that.Proportion.MarketPercent = FlowerPriceList.MarketPercent;
            //时间段转码;{Y,M,D,h,m,s}追加
            let SDate = FormatDate(FlowerPriceList.StartDate);
            let Eate = FormatDate(FlowerPriceList.EndDate);
            that.TimeSlot.push(
              new Date(SDate.Y, SDate.M, SDate.D, SDate.h, SDate.m, SDate.s)
            );
            that.TimeSlot.push(
              new Date(Eate.Y, Eate.M, Eate.D, Eate.h, Eate.m, Eate.s)
            );
            FlowerData.StartDate = `${SDate.Y}-${SDate.M}-${SDate.D} ${SDate.h}:${SDate.m}:${SDate.s}`;
            FlowerData.EndDate = `${Eate.Y}-${Eate.M}-${Eate.D} ${Eate.h}:${Eate.m}:${Eate.s}`;
            that.FlowerData = Object.assign(FlowerData, FlowerInfo);
            //商品图片追加 Content ImgUrl
            let getContent = FlowerInfo.Content;
            let getImgUrl = FlowerInfo.ImgUrl;
            let getBanner = FlowerInfo.Banner;
            if (getContent) {
              let Content = getContent.split(",");
              that.detailmap = Content;
              //   Content.forEach(function(item) {
              //     that.detailmap.push({ url: item });
              //   });
            }
            if (getImgUrl) {
              that.thumbnail.push({ url: getImgUrl });
            }
            if (getBanner) {
              let Banner = getBanner.split(",");
              that.BannerMap = Banner;
              //   Banner.forEach(function(item) {
              //     that.BannerMap.push({ url: item });
              //   });
            }
            that.loading = false;
            that.selectedCategory.push(FlowerCategory.ParentId);
            that.selectedCategory.push(FlowerCategory.CategoryId);
            that.FlowerData.CategoryId = FlowerCategory.CategoryId;
          });
      }
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      let that = this,
        typeId = this.$route.params;
      that.initialize();
      if (typeId.id == "add" || typeId.id == "edit") {
        that.setclsName = typeId.id == "add" ? "添加商品" : "编辑商品";
      } else {
        that.$router.push("/404");
      }
    });
  },
  filters: {
    toInteger: function(value) {
      //比例算换成整数
      if (!value) return "0";
      return value / 100;
    }
  },
  watch: {
    FlowerData: {
      deep: true,
      handler: function(newVal, oldVal) {
        var BasePrice = parseInt(oldVal.BasePrice),
          FloatPrice = parseInt(oldVal.FloatPrice),
          SellPercent = parseInt(this.Proportion.SellPercent);
        var newSellPercent = Math.ceil((BasePrice * SellPercent) / 100),
          remainder = parseInt(newSellPercent % 10);
        if (remainder != 0) {
          //判断是否整数
          oldVal.CategoryId;
          if (
            oldVal.CategoryId == 23 ||
            oldVal.CategoryId == 25 ||
            oldVal.CategoryId == 29 ||
            oldVal.CategoryId == 31
          ) {
            newSellPercent = newSellPercent + (10 - remainder - 2);
          } else {
            newSellPercent = newSellPercent + (10 - remainder - 1);
          }
        } else {
          --newSellPercent;
        }
        this.finalPrice = newSellPercent + FloatPrice;
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>