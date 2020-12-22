<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-24 17:22:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-05 23:01:18
 -->
<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Web/SKUProduct/Attribute' }">商品属性</el-breadcrumb-item>
        <el-breadcrumb-item>编辑属性</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="hy-body-centent">
      <div class="hy-body-handle">
        <div class="el-card__header">
          <div class="clearfix">
            <span>属性信息</span>
          </div>
        </div>
        <el-row class="rui-fromDiy-row">
          <el-col :span="24">
            <el-form
              :model="FlowerData"
              ref="FlowerData"
              :rules="rules"
              label-width="100px"
              class="demo-ruleForm hui-from"
            >
              <el-form-item label="所属分类">
                <el-cascader
                  :disabled="selectIs"
                  v-model="category"
                  :options="CategoryList"
                  :props="attrProp"
                  @change="handleChange"
                  clearable
                ></el-cascader>
              </el-form-item>
              <el-form-item label="属性名称" prop="AttrName">
                <el-input type="text" v-model="FlowerData.AttrName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="属性排序">
                <el-input type="text" v-model="FlowerData.Sort" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="sku属性">
                <el-switch v-model="FlowerData.IsSku"></el-switch>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="btn-form">
          <el-form class="demo-ruleForm" label-width="120px">
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交保存</el-button>
              <el-button>
                <router-link to="/Web/SKUProduct/Attribute">取消</router-link>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { QueryAllGoodsType, EditGoodsAttr } from "../../common/axios.config.js";
export default {
  data() {
    return {
      CategoryList: [], //分类数据
      category: [], //分类选择数据
      FlowerData: {
        //分类数据
        AttrId: "",
        AttrName: "",
        IsSku: false,
        TypeId: "",
        Sort: 1
      },
      attrProp: {
        //分类选择KEY修改
        label: "TypeName",
        value: "TypeId",
        children: "Children",
        checkStrictly: true
      },
      selectIs: false, //设置分类是否可选择
      rules: {
        //验证数据
        AttrName: [
          { required: true, message: "请输入分类名称", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleChange(item) {
      let that = this;
      that.FlowerData.TypeId = item[item.length - 1];
    },
    submitForm() {
      var that = this;
      that.$refs["FlowerData"].validate(valid => {
        if (valid) {
          let params = that.FlowerData;
          if (!that.FlowerData.TypeId) {
            return that.$message.warning("选择分类");
          }
          let AttrName = JSON.parse(JSON.stringify(params.AttrName));
          const newAttrName = AttrName.split("|");
          var nameData = Array.from(new Set(newAttrName));
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          for (let i = 0; i < nameData.length; i++) {
            that.$axios
              .post(EditGoodsAttr, {
                AttrId: params.AttrId,
                AttrName: nameData[i],
                IsSku: params.IsSku,
                TypeId: params.TypeId,
                Sort: params.Sort
              })
              .then(res => {
                if (res) {
                  if (i == nameData.length - 1) {
                    that.$message.success("添加成功");
                    that.$router.push("/Web/SKUProduct/Attribute");
                    loading.close();
                  }
                } else {
                  that.$message.error("添加失败");
                }
              });
          }
        }
      });
    },
    tree(data, typeId) {
      let that = this;
      for (let i = 0; i < data.length; i++) {
        if (data[i].Children.length && data[i].TypeId != typeId) {
          that.tree(data[i].Children, typeId);
        }
        if (data[i].TypeId == typeId) {
          let PathID = data[i].Path.split("-");
          PathID.shift();
          PathID = PathID.map(item => {
            return Number(item);
          });
          that.category = PathID;
          break;
        }
      }
    }
  },
  mounted: function() {
    let that = this;
    that.$nextTick(function() {
      let typeId = that.$route.params.id;
      that.$axios.post(QueryAllGoodsType, {}).then(res => {
        that.CategoryList = res;
        if (typeId == "edit") {
          let sessionData = JSON.parse(
            sessionStorage.getItem("attrData") || false
          );
          that.FlowerData = sessionData;
          that.tree(res, sessionData.TypeId);
          that.selectIs = true;
        }
      });
    });
  }
};
</script>
<style lang="less" scoped>
</style>