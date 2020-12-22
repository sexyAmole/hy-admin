<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-26 14:15:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-26 16:17:19
 -->
<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          属性列表
          <router-link to="/Web/SKUProduct/EditAttribute/add">
            <el-button size="small" icon="el-icon-circle-plus" type="danger">添加属性</el-button>
          </router-link>
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
        <el-form-item label="分类">
          <el-cascader
            v-model="searchData.TypeId"
            :options="CategoryList"
            :props="attrProp"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="是否SKU">
          <el-select v-model="searchData.IsSku" placeholder="是否SKU" style="width:100%">
            <el-option  value="" label="全部">全部</el-option>
            <el-option :value="false" label="否">否</el-option>
            <el-option :value="true" label="是">是</el-option>
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
        <el-table-column label="所属分类" prop="TypeName"></el-table-column>
        <el-table-column label="属性名称" prop="AttrName" align="center"></el-table-column>
        <el-table-column label="排序" prop="Sort" align="center"></el-table-column>
        <el-table-column label="是否SKU属性" prop="Sort" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.IsSku" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="itemEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="itemDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        page-size="15"
        layout="total,prev,pager,next,jumper"
        :total="pageTotal"
        :current-page="searchData.PageIndex"
      ></el-pagination>
    </div>
  </div>
</template>
<style lang="less" scoped>
</style>
<script>
import { QueryGoodsAttr, DelGoodsAttr,QueryAllGoodsType, } from "../../common/axios.config.js";
export default {
  data() {
    return {
      listData: [], //分类数据
      CategoryList: [],
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
        TypeId: "",
        IsSku: ""
      },
      loading: true //加载动画
    };
  },
  components: {},
  methods: {
    QueryAllGoodsType() {
      let that = this;
      that.$axios.post(QueryAllGoodsType, {}).then(res => {
        that.CategoryList = res;
      });
    },
    itemDel(el) {
      let that = this;
      that.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let params = {
            AttrId: el.AttrId
          };
          that.$axios
            .post(DelGoodsAttr, params)
            .then(res => {
              if (res) {
                that.$message({
                  message: "删除成功",
                  type: "success"
                });
                that.QueryInfo();
              }
            })
            .catch(() => {});
        });
    },
    handleCurrentChange(index) {
      this.searchData.PageIndex = index;
      this.QueryInfo();
    },
    resetForm(){
      this.searchData = {
        PageIndex: 1,
        TypeId: "",
        IsSku: ""
      }
    },
    QueryInfo() {
      let that = this;
      let params = this.searchData;
      params.TypeId = params.TypeId && params.TypeId[params.TypeId.length - 1];
      that.$axios.post(QueryGoodsAttr, params).then(res => {
        that.loading = false;
        that.listData = res.Datas;
        that.pageTotal = res.AllCount;
      });
    },
    itemEdit(el) {
      sessionStorage.setItem("attrData", JSON.stringify(el));
      this.$router.push("/Web/SKUProduct/EditAttribute/edit");
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.QueryInfo();
      this.QueryAllGoodsType();
    });
  }
};
</script>