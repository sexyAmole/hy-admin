<!--  -->
<template>
  <div>
    <!--标题 -->
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item > <a href="javascript:;" @click="$router.back(-1)">返回上级</a> </el-breadcrumb-item>
        <el-breadcrumb-item>添加评论</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--内容 -->
    <div class="hy-body-centent">
      <div class="el-card__header">
        <div class="clearfix">
          <span style="margin-right:10px">添加评论</span>
        </div>
      </div>
      <el-row>
        <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="头像" class="rui-fromDiy-row">
            <img width="100px" :src="formData.HeadImg" v-if="formData.HeadImg">
            <hyUpload
                  :uploadData="{type:2,uploadURL:'comment/userImg'}"
                  :limit="1"
                  @change="SuccessUpload"
                ></hyUpload>
          </el-form-item>
          <el-form-item label="头像链接" class="rui-fromDiy-row">
            <el-input v-model="formData.HeadImg"></el-input>
          </el-form-item>
          <el-form-item label="昵称" class="rui-fromDiy-row">
            <el-input v-model="formData.NickName"></el-input>
          </el-form-item>
          <el-form-item label="评论内容" class="rui-fromDiy-row">
            <el-input v-model="formData.Content"></el-input>
          </el-form-item>
          <el-form-item label="评论图片" class="rui-fromDiy-row">
              <el-table :data="commentImgs" style="width: 100%" border>
                <el-table-column label="排序" type="index" width="80"></el-table-column>
                <el-table-column label="图片">
                  <template slot-scope="scope">
                    <img :src="scope.row" class="el-Flower-picture" />
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="moveUp(commentImgs,scope.$index)">上移</el-button>
                    <el-button type="text" size="small" @click="moveDown(commentImgs,scope.$index)">下移</el-button>
                    <el-button
                      type="text"
                      size="small"
                      @click="pictureRemove(commentImgs,scope.$index)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-add">
                <hyUpload
                  :uploadData="{type:1,uploadURL:'comment/charts'}"
                  :limit="1"
                  @change="SuccessUpload"
                ></hyUpload>
              </div>
          </el-form-item>
          <el-form-item label="评分" class="rui-fromDiy-row">
            <el-select v-model="formData.Score" placeholder="请选择评分">
              <el-option v-for="item in 5" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否匿名" class="rui-fromDiy-row">
            <el-switch v-model="formData.IsHideName"></el-switch>
          </el-form-item>
          <el-form-item label="商品名称" class="rui-fromDiy-row">
            <el-input v-model="productName" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <div class="btn-form">
        <el-form class="demo-ruleForm" label-width="100px">
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交保存</el-button>
            <el-button  @click="$router.back(-1)">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {CommentAdd} from "../../common/axios.config.js";
import { getQueryString } from "../../common/Util.js";
import hyUpload from "../../component/upload/index";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { hyUpload },
  data() {
    //这里存放数据
    return {
      productName: "",//评论商品名称
      commentImgs:[],//评论集合
      formData: {
        Content: "",
        DataId: "",
        DataType: "",
        HeadImg: "",
        ImgUrl: "",
        IsHideName: false,
        NickName: "",
        SkuId:'',
        Score: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //删除列表图片
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
    //上传图片成功
    SuccessUpload(uploadData){
      // 1 为评论图片 2为用户头像
      if (uploadData.type == 1) {
        this.commentImgs.push(uploadData.imgURL);
      }
      if (uploadData.type == 2) {
        this.formData.HeadImg = uploadData.imgURL;
      }
    },
    submitForm() {
      var that = this,
        params = that.formData;
      params.ImgUrl = that.commentImgs.join(",");
      that.$axios.post(CommentAdd, { jsonData: JSON.stringify(params) }).then(res => {
          if (res.Code == "200") {
            that.$message.success("编辑成功");
            // that.$router.push("/Web/wxConfig/CarouselList");
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.formData.DataId = getQueryString("id");
    this.formData.DataType = getQueryString("type");
    this.formData.SkuId = getQueryString("skuID");
    this.productName = getQueryString("name");
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