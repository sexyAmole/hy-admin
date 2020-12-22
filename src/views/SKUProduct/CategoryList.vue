<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-26 14:15:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-26 14:15:33
 -->
<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          商品分类
          <router-link to="/Web/SKUProduct/EditCategoryList/add"><el-button size="small" icon="el-icon-circle-plus" type="danger">添加分类</el-button></router-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="hy-body-centent">
      <el-row v-loading="loading" :gutter="20">
        <el-tree
          :data="CategoryList"
          node-key="TypeId"
          :props="defaultProps"
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
              {{node.label}}
            </span>
            <span>
              <el-button type="text" size="mini" @click="categoryEdit(data)">修改</el-button>
              <el-button type="text" size="mini" @click="categoryDel(data)">删除</el-button>
            </span>
          </span>
        </el-tree>
      </el-row>
    </div>
  </div>
</template>
<style lang="less" scoped>
</style>
<script>
import {QueryAllGoodsType,DelGoodsType} from "../../common/axios.config.js";
export default {
  data() {
    return {
      CategoryList: [], //分类数据
      defaultProps: {
        children: "Children",
        label: "TypeName"
      },
      // dialogFormVisible: false, //dialog 显示
      loading: true //加载动画
    };
  },
  components: {},
  methods: {
    categoryDel(el) {
      let that = this;
      that.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let params = {
            typeId: el.TypeId
          };
          that.$axios.post(DelGoodsType, params).then(res => {
              if (res) {
                that.$message({
                  message: "删除成功",
                  type: "success"
                });
                that.categoryInfo();
              }
            }).catch(() => {});
        });
    },
    categoryInfo() {
      let that = this;
      that.$axios.post(QueryAllGoodsType, {}).then(res => {
        that.CategoryList = res;
        that.loading = false;
      });
    },
    categoryEdit(el) {
      sessionStorage.setItem("categoryCurr", JSON.stringify(el));
      this.$router.push("/Web/SKUProduct/EditCategoryList/edit");
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.categoryInfo();
    });
  }
};
</script>