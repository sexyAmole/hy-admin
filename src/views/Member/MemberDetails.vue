<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-03 20:11:31
 -->
<!--  -->
<template>
  <div>
    <!--标题 -->
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><a href="javscript:;" @click="back">返回上级</a> </el-breadcrumb-item>
        <el-breadcrumb-item>用户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--内容 -->
    <div class="hy-body-centent">
      <el-form label-width="100px" class="demo-ruleForm hui-from">
        <div class="hy-body-handle">
          <div class="el-card__header">
            <div class="clearfix">
              <span>基本信息</span>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="头像 : ">
                <div><img :src="BaseInfo.HeadImg" style="width:40px;float:left"></div>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="名称 : ">
                <div>{{BaseInfo.NickName}} {{BaseInfo.Sex == 1?'男':(BaseInfo.Sex == 2?'女':'未知')}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="地址 : ">
                <div>{{BaseInfo.County}} {{BaseInfo.Province}} {{BaseInfo.City}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="授权时间 : ">
                <div>{{BaseInfo.InsertDate}}</div>
              </el-form-item>
            </el-col>
          </el-row>

          <div v-for="(item,index) in AccountInfo" :key="index">
             <div class="el-card__header">
            <div class="clearfix">
              <span>{{item.AccountTypeStr}}信息</span>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="Account : " v-if="item.Account">
                <div>{{item.Account}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="rui-fromDiy-row" v-if="item.UnionId">
              <el-form-item label="UnionId : ">
                <div>{{item.UnionId}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="授权时间 : ">
                <div>{{item.InsertDate}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          </div>
         

          <!-- <div class="el-card__header">
            <div class="clearfix">
              <span>授权手机号</span>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="手机号">
                <div>{{phoneInfo.Account}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="rui-fromDiy-row">
              <el-form-item label="授权时间">
                <div>{{phoneInfo.InsertDate  | datetiemr}}  修改时间{{phoneInfo.ModifyTime  | datetiemr}}</div>
              </el-form-item>
            </el-col>
          </el-row> -->

        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {QueryDetail} from "../../common/axios.config.js";
import {getQueryString,FormatDate} from "../../common/Util.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      BaseInfo:{},//基本信息
      AccountInfo:{},
      // openInfo:{},//获取openid 时间
      // phoneInfo:{}//获取电话号码时间 
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    back(){
       this.$router.go(-1);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    var that = this;
    let userId = getQueryString("userId");
    that.$axios.post(QueryDetail, { userId: userId }) .then(ret => {
      if(ret){
          that.BaseInfo = ret.BaseInfo;
          that.AccountInfo = ret.AccountInfo;

          // that.openInfo = ret.AccountInfo[0];
          // that.phoneInfo = ret.AccountInfo[1] || {};
      }
      });
  },
  filters:{
    datetiemr(value) {
      if (!value) return "";
      var { Y, M, D, h, m, s } = FormatDate(value);
      return `${Y}/${M}/${D} ${h}:${m}:${s}`;
    }
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