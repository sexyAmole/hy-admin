<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-24 17:22:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-11-05 22:57:37
 -->
<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Web/SKUProduct/CategoryList' }">商品分类</el-breadcrumb-item>
        <el-breadcrumb-item>编辑分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="hy-body-centent">
      <div class="hy-body-handle">
        <div class="el-card__header">
          <div class="clearfix">
            <span>分类信息</span>
          </div>
        </div>
        <el-row class="rui-fromDiy-row">
          <el-col :span="24">
            <el-form
              :model="CategoryData"
              ref="CategoryData"
              :rules="rules"
              label-width="100px"
              class="demo-ruleForm hui-from"
            >
              <el-form-item label="上级分类">
                <el-cascader
                  placeholder="一级分类"
                  v-model="category"
                  :options="CategoryList"
                  :props="attrProp"
                  @change="handleChange"
                  clearable
                ></el-cascader>
                <!-- <el-select v-model="CategoryData.ParentId" placeholder="一级分类" :disabled="selectIs">
                  <el-option label="一级分类" :value="0"></el-option>
                  <el-option
                    v-for="(item,index) in CategoryList"
                    :label="item.TypeName"
                    :key="index"
                    :value="item.TypeId"
                  ></el-option>
                </el-select>-->
              </el-form-item>
              <el-form-item label="分类名称" prop="TypeName">
                <el-input type="text" v-model="CategoryData.TypeName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="分类排序">
                <el-input type="text" v-model="CategoryData.Sort" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="btn-form">
          <el-form class="demo-ruleForm" label-width="120px">
            <el-form-item>
              <el-button type="primary" @click="submitForm" style="margin-right:10px">提交保存</el-button>
              <router-link to="/Web/SKUProduct/CategoryList">
                <el-button>取消</el-button>
              </router-link>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { QueryAllGoodsType, EditGoodsType } from "../../common/axios.config.js";
export default {
  data() {
    return {
      CategoryList: [], //分类数据
      attrProp: {
        //分类选择KEY修改
        label: "TypeName",
        value: "TypeId",
        children: "Children",
        checkStrictly: true
      },
      category: [], //选择的属性值
      CategoryData: {
        //分类数据
        TypeId: "",
        TypeName: "",
        ParentId: 0,
        Sort: 1
      },
      selectIs: false, //设置分类是否可选择
      rules: {
        //验证数据
        TypeName: [
          { required: true, message: "请输入分类名称", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 更具分类选择获取属性
    handleChange(item) {
      if (!item.length) {
        this.CategoryData.ParentId = "";
      } else {
        let typeID = item[item.length - 1];
        this.CategoryData.ParentId = typeID;
      }
    },
    submitForm() {
      var that = this;
      that.$refs["CategoryData"].validate(valid => {
        if (valid) {
          let params = that.CategoryData;
          that.$axios.post(EditGoodsType, params).then(res => {
              if (res) {
                  that.$message.success("添加成功");
                  that.$router.push("/Web/SKUProduct/CategoryList");
              } else {
                that.$message.error("添加失败");
              }
            });
          // let typeName = JSON.parse(JSON.stringify(params.TypeName));
          // const nameData = typeName.split("|");
          // const loading = this.$loading({
          //   lock: true,
          //   text: "Loading",
          //   spinner: "el-icon-loading",
          //   background: "rgba(0, 0, 0, 0.7)"
          // });
          // for (let i = 0; i < nameData.length; i++) {
          //   params.TypeName = nameData[i];
            
          // }
        }
      });
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
            sessionStorage.getItem("categoryCurr") || false
          );
          that.CategoryData = sessionData;
          let PathID = sessionData.Path.split("-");
          PathID.shift();
          PathID = PathID.map(item => {
            return Number(item);
          });
          that.category = PathID;
        }
      });
    });
  }
};
</script>
<style lang="less" scoped>
</style>