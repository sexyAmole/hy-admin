<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-26 14:15:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-24 11:48:05
 -->
<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          商品列表
          <router-link to="/Web/SKUProduct/EditSPUList/add">
            <el-button size="small" icon="el-icon-circle-plus" type="danger">添加商品</el-button>
          </router-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="hy-search-box">
      <el-form :inline="true" :model="searchData" ref="searchData" size="small" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input autocomplete="off" @change="handleCurrentChange(1)" v-model="searchData.GoodsName"></el-input>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input autocomplete="off" @change="handleCurrentChange(1)" v-model="searchData.Keywords"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-cascader v-model="searchData.TypeId" :options="CategoryList" :props="attrProp" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchData.GoodsStatus" placeholder="商品状态" style="width:100%">
            <el-option value label="全部">全部</el-option>
            <el-option v-for="item in goodsStatusData" :key="item.value" :value="item.value" :label="item.valueStr"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售方式">
          <el-select v-model="searchData.SaleType" placeholder="商品销售方式" style="width:100%">
            <el-option value label="全部">全部</el-option>
            <el-option v-for="item in saleTypeData" :key="item.value" :value="item.value" :label="item.valueStr"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-select v-model="searchData.IsShow" placeholder="商品销售方式" style="width:100%">
            <el-option value label="全部">全部</el-option>
            <el-option :value="true" label="显示"></el-option>
            <el-option :value="false" label="不显示"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleCurrentChange(1)">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="hy-body-centent" v-loading="loading">
      <el-table :data="listData" stripe style="width: 100%">
        <el-table-column label="ID" width="100px" prop="GoodsId" align="center"></el-table-column>
        <el-table-column label="图片" width="70px">
          <template slot-scope="scope">
            <img :src="scope.row.ImgUrl" class="el-Flower-picture" alt />
          </template>
        </el-table-column>
        <el-table-column label="属性" width="220px">
          <template slot-scope="scope">
            <p v-for="(item, index) in scope.row.AttrListJson" :key="index">{{ item.name || item.Name }} : {{ item.value || item.Value }}</p>
          </template>
        </el-table-column>
        <el-table-column label="SKU属性" width="120px">
          <template slot-scope="scope">
            <p v-for="(item, index) in scope.row.SkuAttrListJson" :key="index">
              {{ item.name || item.Name }} :
              <span v-for="(items, indexs) in item.value || item.Value" :key="indexs">{{ items }}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="GoodsName" width="180px" align="center"></el-table-column>
        <el-table-column label="运营状态" prop="SaleTypeStr" width="120px" align="center"></el-table-column>
        <el-table-column label="销售状态" prop="GoodsStatusStr" width="120px" align="center"></el-table-column>
        <el-table-column label="排序" prop="Sort" width="80px" align="center"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <router-link style="margin-right:6px" :to="'/Web/SKUProduct/EditSPUList/edit?id=' + scope.row.GoodsId">
              <el-link type="primary">编辑</el-link>
            </router-link>
            <el-link type="primary" @click="itemUpDownShelf(scope.row.GoodsId, !scope.row.GoodsStatus)"> {{ !scope.row.GoodsStatus ? "下架" : "上架" }}</el-link>
            <el-link type="primary" @click="itemDel(scope.row.GoodsId)">删除</el-link>
            <el-link type="primary" :href="'/Web/SKUProduct/SKUList?id=' + scope.row.GoodsId">SKU</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination @current-change="handleCurrentChange" background page-size="10" layout="total,prev,pager,next,jumper" :total="pageTotal" :current-page="searchData.PageIndex"></el-pagination>
    </div>
  </div>
</template>
<style lang="less" scoped></style>
<script>
import { QueryGoodsInfoList, QuerySaleType, QueryGoodsStatus, QueryAllGoodsType, UpdateGoodsStatus, DelCategory } from "../../common/axios.config.js";
export default {
  data() {
    return {
      CategoryList: [], //分类数据
      saleTypeData: [], // 商品销售方式
      goodsStatusData: [], // 商品状态
      listData: [],
      attrProp: {
        //分类选择KEY修改
        label: "TypeName",
        value: "TypeId",
        children: "Children",
        checkStrictly: true
      },
      pageTotal: 0,
      searchData: {
        PageIndex: 1,
        GoodsStatus: "",
        GoodsName: "",
        SaleType: "",
        TypeId: "",
        Keywords: "",
        IsShow: ""
      },
      loading: true //加载动画
    };
  },
  components: {},
  methods: {
    //删除
    itemDel(goodsId) {
      let that = this;
      that
        .$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let params = {
            goodsId: goodsId
          };
          that.$axios
            .post(DelCategory, params)
            .then((res) => {
              if (res) {
                that.$message.success("删除成功");
                that.queryGoodsInfoList();
              }
            })
            .catch(() => {});
        });
    },
    categoryInfo() {
      let that = this;
      that.$axios.post(QueryAllGoodsType, { params: {} }).then((res) => {
        that.CategoryList = res;
      });
    },
    // 商品销售方式
    querySaleType() {
      let that = this;
      that.$axios.post(QuerySaleType, {}).then((res) => {
        that.saleTypeData = res;
      });
    },
    // 商品状态
    queryGoodsStatus() {
      let that = this;
      that.$axios.post(QueryGoodsStatus, {}).then((res) => {
        that.goodsStatusData = res;
      });
    },
    // 获取列表
    queryGoodsInfoList() {
      let that = this;
      let params = JSON.parse(JSON.stringify(this.searchData));
      params.TypeId = params.TypeId && params.TypeId[params.TypeId.length - 1];
      localStorage.setItem("spu_params", JSON.stringify(params));
      that.$axios.post(QueryGoodsInfoList, params).then((res) => {
        let Datas = res.Datas;
        for (let i = 0; i < res.Datas.length; i++) {
          Datas[i].AttrListJson = JSON.parse(Datas[i].AttrListJson);
          Datas[i].SkuAttrListJson = JSON.parse(Datas[i].SkuAttrListJson);
        }
        that.listData = res.Datas;
        that.loading = false;
        that.pageTotal = res.AllCount;
      });
    },
    // 上下架
    itemUpDownShelf(goodsId, goodsStatus) {
      let that = this;
      that.$axios.post(UpdateGoodsStatus, { goodsId, goodsStatus }).then((res) => {
        if (res) {
          that.$message.success(goodsStatus ? "下架成功" : "上架成功");
          that.queryGoodsInfoList();
        }
      });
    },
    handleCurrentChange(index) {
      this.searchData.PageIndex = index;
      this.queryGoodsInfoList();
    },
    resetForm() {
      this.searchData = {
        PageIndex: 1,
        GoodsStatus: "",
        GoodsName: "",
        SaleType: "",
        TypeId: "",
        Keywords: "",
        IsShow: ""
      };
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.querySaleType();
      this.queryGoodsStatus();
      this.categoryInfo();
      this.queryGoodsInfoList();
    });
  }
  // beforeRouteEnter:function(){
  //   console.log("ss");
  // },
  // activated: function() {
  //   if (sessionStorage.getItem("ifRefresh")) {
  //     sessionStorage.setItem("ifRefresh", false);
  //     const spu_params = JSON.parse(localStorage.getItem("spu_params") || "{}");
  //     if (spu_params != "{}") {
  //       localStorage.setItem("spu_params", "");
  //       this.searchData = spu_params;
  //     }
  //   }
  //   this.queryGoodsInfoList();
  // }
};
</script>
