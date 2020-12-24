<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-26 14:15:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-24 14:19:28
 -->
<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Web/SKUProduct/SPUList' }">商品列表</el-breadcrumb-item>
        <el-breadcrumb-item>商品编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="hy-body-centent hy-body-handle">
      <el-form label-width="80px" :model="commodityData" ref="commodityData" :rules="rules" class="demo-ruleForm hui-from rui-fromDiy-row">
        <div class="el-card__header">
          <div class="clearfix">
            <span>分类属性设置</span>
            <el-button type="primary" size="mini">快速添加</el-button>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="兔店id">
              <el-input autocomplete="off" placeholder="输入兔店商品id" v-model="toShopId">
                <el-button slot="append" icon="el-icon-search" :loading="getToShoploading" @click="getToShopInfo">获取</el-button>
              </el-input>
            </el-form-item>

            <el-form-item label="所属分类" prop="CategoryId">
              <!-- :disabled="selectIs" -->
              <el-cascader v-model="category" :options="CategoryList" :props="attrProp" @change="handleChange" clearable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="属性">
              <el-table :data="attrList" style="width: 100%" border cell-class-name="cellclass">
                <el-table-column label="属性" width="160px" prop="name">
                  <!-- <template slot-scope="scope">
                    <el-select v-model="scope.row.attrName" placeholder="属性">
                      <el-option
                        v-for="item in attrList"
                        :key="item.AttrName"
                        :label="item.AttrName"
                        :value="item.AttrName"
                      ></el-option>
                    </el-select>
                  </template>-->
                </el-table-column>
                <el-table-column label="属性值">
                  <template slot-scope="scope">
                    <!-- <el-button class="attr-item" v-for="(item,index) in scope.row.val" :key="item">
                      {{item}}
                      <el-button
                        type="danger"
                        size="mini"
                        @click="delAttrVal(scope.row,index)"
                        icon="el-icon-delete"
                        circle
                        class="attr-delete"
                      ></el-button>
                    </el-button>-->
                    <el-input style="width:50px" v-model="scope.row.value" placeholder="属性值"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="160px">
                  <template slot-scope="scope">
                    <!-- <el-input style="width:50px" v-model="scope.row.input" placeholder="属性值"></el-input> -->
                    <!-- <el-button type="text" @click="addAttrVal(scope.row)">添加</el-button> -->
                    <el-button type="text" size="small" @click="delAttr(1, scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-add">
                <el-select placeholder="属性" v-model="choiceAttrKey" style="width: 200px !important;">
                  <el-option v-for="(item, index) in choiceAttrList" :key="index" :label="item.name" :value="index"></el-option>
                </el-select>
                <el-button @click="addAttr(1)">添加属性</el-button>
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="attrTextarea" @blur="arrtBlur"> </el-input>
              </div>
            </el-form-item>
            <el-form-item label="sku属性">
              <el-table :data="skuAttrList" style="width: 100%" border cell-class-name="cellclass">
                <el-table-column label="属性" width="160px" prop="name">
                  <!-- <template slot-scope="scope">
                    <el-select v-model="scope.row.attrName" placeholder="属性">
                      <el-option
                        v-for="item in skuAttrList"
                        :key="item.AttrName"
                        :label="item.AttrName"
                        :value="item.AttrName"
                      ></el-option>
                    </el-select>
                  </template>-->
                </el-table-column>
                <el-table-column label="属性值">
                  <template slot-scope="scope">
                    <el-button class="attr-item" v-for="(item, index) in scope.row.value" :key="item">
                      {{ item }}
                      <el-button type="danger" size="mini" @click="delAttrVal(scope.row, index)" icon="el-icon-delete" circle class="attr-delete"></el-button>
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="160px">
                  <template slot-scope="scope">
                    <el-input style="width:50px" v-model="scope.row.input" placeholder="属性值"></el-input>
                    <el-button type="text" @click="addAttrVal(scope.row)">添加</el-button>
                    <el-button type="text" size="small" @click="delAttr(2, scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-add">
                <el-select placeholder="属性" v-model="choiceSkuAttrKey" style="width: 200px !important;">
                  <el-option v-for="(item, index) in choiceSkuAttrList" :key="index" :label="item.name" :value="index"></el-option>
                </el-select>
                <el-button @click="addAttr(2)">添加sku属性</el-button>
              </div>
            </el-form-item>
            <!--  prop="AttributeId" -->
          </el-col>
        </el-row>
        <div class="el-card__header">
          <div class="clearfix">
            <span>基本信息</span>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="商品名称" prop="GoodsName">
              <el-input autocomplete="off" placeholder="输入商品名称" v-model="commodityData.GoodsName"></el-input>
            </el-form-item>
            <el-form-item label="关键词" prop="Keywords">
              <el-input autocomplete="off" placeholder="关键词(多个用 | 开)" v-model="commodityData.Keywords"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item label="商品排序" prop="Sort">
                  <el-input autocomplete="off" type="Number" v-model="commodityData.Sort"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item label="成本价" prop="Sort">
                  <el-input autocomplete="off" type="Number" v-model="commodityData.CostPrice"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="销售类型" prop="SaleType">
                  <el-select v-model="commodityData.SaleType" placeholder="属性">
                    <el-option v-for="item in saleTypeList" :key="item.value" :label="item.valueStr" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否显示">
                  <el-switch v-model="commodityData.IsShow"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="备注">
                  <el-input autocomplete="off" v-model="commodityData.Remark"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最低购买">
                  <el-input autocomplete="off" v-model="commodityData.LowestBuyCount" type="Number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当日达">
                  <el-switch v-model="commodityData.IsTodaySend"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="el-card__header">
          <div class="clearfix">
            <span>图片设置</span>
          </div>
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="轮播图">
              <el-table :data="BannerMap" style="width: 100%" border>
                <el-table-column label="排序" type="index" width="80"></el-table-column>
                <el-table-column label="图片">
                  <template slot-scope="scope">
                    <img :src="scope.row" class="el-Flower-picture" />
                    <p>{{ scope.row }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="moveUp(BannerMap, scope.$index)">上移</el-button>
                    <el-button type="text" size="small" @click="moveDown(BannerMap, scope.$index)">下移</el-button>
                    <el-button type="text" size="small" @click="pictureRemove(BannerMap, scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-add">
                <hyUpload :uploadData="{ type: 1, uploadURL: 'commodity/Banner' }" :multiple="true" @change="successUpload"></hyUpload>
              </div>
              <el-form-item label="">
                <el-input v-model="writeLink" placeholder="输入链接" @blur="blurLink('BannerMap', 'writeLink')"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="详情图">
              <el-table :data="detailMap" style="width: 100%" border>
                <el-table-column label="排序" type="index" width="80"></el-table-column>
                <el-table-column label="图片">
                  <template slot-scope="scope">
                    <img :src="scope.row" class="el-Flower-picture" />
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="moveUp(detailMap, scope.$index)">上移</el-button>
                    <el-button type="text" size="small" @click="moveDown(detailMap, scope.$index)">下移</el-button>
                    <el-button type="text" size="small" @click="pictureRemove(detailMap, scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-add">
                <hyUpload :uploadData="{ type: 2, uploadURL: 'commodity/detail' }" :multiple="true" @change="successUpload"></hyUpload>
              </div>
              <el-form-item label="">
                <el-input v-model="writeLink2" placeholder="输入链接" @blur="blurLink('detailMap', 'writeLink2')"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="缩略图">
              <img v-if="commodityData.ImgUrl" :src="commodityData.ImgUrl" class="thumbnail-img" />
              <hyUpload :uploadData="{ type: 3, uploadURL: 'commodity/thumbnail' }" :multiple="false" :limit="1" @change="successUpload"></hyUpload>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="commodityData.ImgUrl" placeholder="输入链接"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
<style lang="less" scoped>
.attr-item {
  margin: 2px;
  position: relative;
  .attr-delete {
    position: absolute;
    top: -15px;
    right: -15px;
    display: none;
    z-index: 1000;
  }
  &:hover .attr-delete {
    display: block;
  }
}
.rui-fromDiy-row {
  max-width: 900px;
}
.thumbnail-img {
  width: 100px;
  height: 100px;
  border-radius: 6px;
}
</style>
<script>
import { QueryAllGoodsType, QueryGoodsAttrByTypeId, QuerySaleType, QueryGoodsInfo, EditGoodsInfo } from "../../common/axios.config.js";
// import { uploadQiniu, getBase64Image } from "@/common/upload-qiniu.js";
import { getGoodxt, verifyImageSuffix } from "@/common/getToShopTool.js";

import { getQueryString } from "../../common/Util.js";
import hyUpload from "../../component/upload/index";
export default {
  components: { hyUpload },
  data() {
    return {
      BannerMap: [], //轮播图
      detailMap: [], //详情图
      CategoryList: [], //分类数据
      attrProp: {
        //分类选择KEY修改
        label: "TypeName",
        value: "TypeId",
        children: "Children",
        checkStrictly: true
      },
      attrTextarea: "",
      toShopId: "",
      writeLink: "",
      writeLink2: "",
      category: [], //选择的属性值
      choiceSkuAttrList: [],
      choiceSkuAttrKey: "",
      choiceAttrKey: "",
      choiceAttrList: [],
      SkuAttrListJsonKey: [],
      AttrListJsonKey: [],
      saleTypeList: [], // 销售方式
      skuAttrList: [], // SKU属性
      attrList: [], // 普通属性
      // attrEditList: [],
      // skuAttrEditList: [],
      commodityData: {
        // 商品数据
        AttrListJson: "",
        Banner: "",
        Content: "",
        GoodsId: 0,
        GoodsName: "",
        ImgUrl: "",
        IsShow: false,
        Keywords: "",
        SaleType: 1,
        SkuAttrListJson: "",
        IsTodaySend: false,
        LowestBuyCount: "1",
        Remark: "",
        Sort: "",
        TypeId: ""
      },
      loading: true, //加载动画
      getToShoploading: false,
      rules: {
        Sort: [{ required: true, message: "输入排序", trigger: "blur" }],
        SaleType: [{ required: true, message: "输入销售类型", trigger: "blur" }],
        Keywords: [{ required: true, message: "输入关键词", trigger: "blur" }],
        GoodsName: [{ required: true, message: "输入名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 属性失去焦点
    arrtBlur() {
      if (this.attrTextarea) {
        const column = this.attrTextarea.split(/[\s\n]/);
        column.forEach((item) => {
          item = item.replace(/\s*/g, "").replace(/[【｜】]/g, "");
          if (item) {
            const row = item.split("：");
            this.attrList.push({
              name: row[0],
              value: row[1]
            });
          }
        });
        this.attrTextarea = "";
      }
    },
    //获取兔店商品信息
    getToShopInfo() {
      const self = this;
      if (!this.toShopId) {
        return this.$message.warning("输入兔店商品ID");
      }
      this.getToShoploading = true;
      this.$axios
        .get("https://api.twoshop.com.cn/api/rest/product/V1.6.3/info", {
          params: { id: this.toShopId }
        })
        .then((res) => {
          this.getToShoploading = false;

          if (res) {
            const resData = res.data;
            // self.BannerMap
            // 循环追加轮播图片
            resData.productAlbumVos.forEach((item) => {
              self.BannerMap.push(item.url);
              // uploadQiniu(item.url, function(ret) {
              //   // console.log(res.key)
              //   self.BannerMap.push("https://image.huayixh.com/" + ret.key);
              // });
            });
            this.commodityData.GoodsName = resData.name;

            //设置sku属性
            const skuList = JSON.parse(resData.specification);
            const skuAttrList = skuList.map((item) => {
              return {
                name: item.name,
                value: item.valueVoList.map((el) => el.value)
              };
            });
            this.skuAttrList = skuAttrList;
            this.commodityData.SaleType = 0;
            this.commodityData.Sort = 1;
            this.commodityData.IsShow = true;
            //获取详情图片
            getGoodxt(resData.textPic, function(urls) {
              urls.desUrls.forEach((item) => {
                if (verifyImageSuffix(item)) {
                  self.detailMap.push(item);
                  // uploadQiniu(item, function(ret) {
                  //   // console.log(res.key)
                  //   self.detailMap.push("https://image.huayixh.com/" + ret.key);
                  // });
                }
              });
            });
            // console.log(skuAttrList);
          }
        });
    },
    blurLink(link, blurModel) {
      this[link].push(this[blurModel]);
      this[blurModel] = "";
    },
    categoryInfo() {
      let that = this;
      that.$axios.post(QueryAllGoodsType, {}).then((res) => {
        if (res) {
          that.CategoryList = res;
          that.loading = false;
        }
      });
    },
    // 上传成功
    successUpload(uploadData) {
      if (uploadData.type == 1) {
        this.BannerMap.push(uploadData.imgURL);
      }
      if (uploadData.type == 2) {
        this.detailMap.push(uploadData.imgURL);
      }
      if (uploadData.type == 3) {
        this.commodityData.ImgUrl = uploadData.imgURL;
      }
    },
    pictureRemove(data, index) {
      data.splice(index, 1);
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
    //循环查询分类
    tree(data, typeId) {
      let that = this;
      for (let i = 0; i < data.length; i++) {
        if (data[i].Children.length && data[i].TypeId != typeId) {
          that.tree(data[i].Children, typeId);
        }
        if (data[i].TypeId == typeId) {
          let PathID = data[i].Path.split("-");
          PathID.shift();
          PathID = PathID.map((item) => {
            return Number(item);
          });
          that.category = PathID;
          that.handleChange(PathID);
          break;
        }
      }
    },
    // 添加属性
    addAttr(typeCode) {
      if (typeCode == 1) {
        let index = this.choiceAttrKey;
        if (index === "") {
          return this.$message.warning("选择属性");
        }
        let key = this.choiceAttrList[index];
        this.attrList.push(key);
        this.choiceAttrList.splice(index, 1);
        this.choiceAttrKey = 0;
      } else {
        if (this.choiceSkuAttrKey === "") {
          return this.$message.warning("选择SKU属性");
        }
        this.skuAttrList.push(this.choiceSkuAttrList[this.choiceSkuAttrKey]);
        this.choiceSkuAttrKey = "";
        this.choiceSkuAttrList.splice(this.choiceSkuAttrKey, 1);
      }
    },
    //删除属性
    delAttr(typeCode, index) {
      if (typeCode == 1) {
        this.choiceAttrList.push(this.attrList[index]);
        this.attrList.splice(index, 1);
      } else {
        this.choiceSkuAttrList.push(this.skuAttrList[index]);
        this.skuAttrList.splice(index, 1);
      }
    },
    //添加属性值
    addAttrVal(el) {
      if (el.input) {
        el.value.push(el.input);
        el.input = "";
      } else {
        this.$message.warning("请输入内容");
      }
    },
    delAttrVal(el, index) {
      el.value.splice(index, 1);
    },
    // 更具分类选择获取属性
    handleChange(item) {
      let typeID = item[item.length - 1];
      let that = this;
      that.commodityData.TypeId = typeID;
      that.$axios.post(QueryGoodsAttrByTypeId, { typeId: typeID }).then((res) => {
        let attrData = [],
          skuAttrData = [];
        //循环去除属性
        res.forEach((element) => {
          if (element.IsSku) {
            if (!that.SkuAttrListJsonKey.includes(element.AttrName)) {
              skuAttrData.push({
                name: element.AttrName,
                value: [],
                input: ""
              });
            }
          } else {
            if (!that.AttrListJsonKey.includes(element.AttrName)) {
              attrData.push({
                name: element.AttrName,
                value: ""
              });
            }
          }
        });
        that.choiceSkuAttrList = skuAttrData;
        that.choiceAttrList = attrData;
      });
    },
    //查询销售方式
    QuerySaleType() {
      let that = this;
      that.$axios.post(QuerySaleType, {}).then((res) => {
        if (res) {
          that.saleTypeList = res;
        }
      });
    },
    // 提交商品
    submitForm() {
      let that = this;
      that.$refs["commodityData"].validate((valid) => {
        if (valid) {
          let commodityData = that.commodityData;
          if (!that.BannerMap.length) {
            that.$message.error("上传轮播图");
          } else if (!that.detailMap.length) {
            that.$message.error("上传轮播图");
          } else if (!commodityData.TypeId) {
            that.$message.error("选择分类");
          } else {
            let skuAttr = that.skuAttrList;
            let attr = that.attrList;
            let skuAttrData = [],
              attrData = [];
            for (let i = 0; i < skuAttr.length; i++) {
              skuAttrData.push({
                name: skuAttr[i].name,
                value: skuAttr[i].value
              });
            }
            for (let i = 0; i < attr.length; i++) {
              attrData.push({
                name: attr[i].name,
                value: attr[i].value
              });
            }
            commodityData.AttrListJson = JSON.stringify(attrData)
              .replace(RegExp("name", "g"), "Name")
              .replace(RegExp("value", "g"), "Value");
            commodityData.SkuAttrListJson = JSON.stringify(skuAttrData)
              .replace(RegExp("name", "g"), "Name")
              .replace(RegExp("value", "g"), "Value");
            commodityData.Banner = that.BannerMap.join(",");
            commodityData.Content = that.detailMap.join(",");
            commodityData.Sort = parseInt(commodityData.Sort);
            that.$axios.post(EditGoodsInfo, { jsonData: JSON.stringify(commodityData) }).then((res) => {
              if (res.Code == 200) {
                that.$message.success("添加成功");
                sessionStorage.setItem("ifRefresh", true);
                that.$router.push("/Web/SKUProduct/SPUList");
                // that.$router.go(-1)
              }
            });
          }
        } else {
          that.$message.error("请完善基本信息");
        }
      });
    },
    queryGoodsInfo(goodsId) {
      let that = this;
      that.$axios.post(QueryGoodsInfo, { goodsId: parseInt(goodsId) }).then((res) => {
        if (res.Code == 200) {
          that.commodityData = res.Data;
          let SkuAttrListJson = JSON.parse(res.Data.SkuAttrListJson.replace(RegExp("Name", "g"), "name").replace(RegExp("Value", "g"), "value"));
          let AttrListJson = JSON.parse(res.Data.AttrListJson.replace(RegExp("Name", "g"), "name").replace(RegExp("Value", "g"), "value"));
          for (let i = 0; i < SkuAttrListJson.length; i++) {
            SkuAttrListJson[i].input = "";
            that.SkuAttrListJsonKey.push(SkuAttrListJson[i].name);
          }
          for (let i = 0; i < AttrListJson.length; i++) {
            that.AttrListJsonKey.push(AttrListJson[i].name);
          }
          that.attrList = AttrListJson;
          that.skuAttrList = SkuAttrListJson;
          that.BannerMap = res.Data.Banner.split(",");
          that.detailMap = res.Data.Content.split(",");
          setTimeout(() => {
            that.tree(that.CategoryList, res.Data.TypeId);
          }, 500);
        }
      });
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.categoryInfo();
      this.QuerySaleType();
      let typeId = this.$route.params.id;
      if (typeId.indexOf("edit") > -1) {
        let GoodsId = getQueryString("id");
        this.queryGoodsInfo(GoodsId);
      }
    });
  }
};
</script>
