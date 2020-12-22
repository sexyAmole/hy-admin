<!--  -->
<template>
  <div>
    <!--标题 -->
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Web/wxConfig/CarouselList' }">首页轮播</el-breadcrumb-item>
        <el-breadcrumb-item>轮播编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--内容 -->
    <div class="hy-body-centent">
      <div class="el-card__header">
        <div class="clearfix">
          <span style="margin-right:10px">编辑轮播</span>
        </div>
      </div>
      <el-row>
        <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="图片" class="rui-fromDiy-row">
            <el-upload
              ref="upload"
              action="http://up-z2.qiniup.com"
              :data="qiniuData"
              accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PBG"
              :before-upload="beforeAvatarUpload"
              :auto-upload="true"
              :file-list="fileList"
              :on-error="uperror"
              :on-remove="upRemove"
              :on-success="upsuccess"
              :on-exceed="exceedPic"
              limit="1"
            >
              <img v-if="formData.ImgUrl" :src="formData.ImgUrl" class="from-img-200">
              <el-button size="small" type="primary" v-else>上传图片</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="图片链接" class="rui-fromDiy-row">
            <el-input v-model="formData.LinkUrl"></el-input>
          </el-form-item>
          <el-form-item label="使用端" class="rui-fromDiy-row">
            <el-select v-model="formData.Client" placeholder="使用端" style="width:100%">
              <el-option
                v-for="(item,index) in clientData"
                :key="index"
                :label="item.themeStr"
                :value="item.theme"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" class="rui-fromDiy-row">
            <el-select v-model="formData.BannerType" placeholder="类型" style="width:100%">
              <el-option
                v-for="(item,index) in bannerTypeData"
                :key="index"
                :label="item.themeStr"
                :value="item.theme"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" class="rui-fromDiy-row">
            <el-input v-model="formData.Sort"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <div class="btn-form">
        <el-form class="demo-ruleForm" label-width="100px">
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交保存</el-button>
            <el-button>
              <router-link to="/Web/wxConfig/CarouselList">取消</router-link>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  EditHomeBanner,
  QueToken,
  QueryClient,
  QueryBannerType
} from "../../common/axios.config.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      clientData: [],
      bannerTypeData: [],
      formData: {
        ImgUrl: "",
        LinkUrl: "",
        BannerType: 1,
        Client: 1,
        Sort: 1
      },
      qiniuData: {
        //上传七牛数据
        token: "",
        key: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 上传此前获取Token
    beforeAvatarUpload: async function(file) {
      var that = this;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        that.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      } else {
        await that.$axios
          .get(QueToken, { params: { type: "carousel" } })
          .then(res => {
            that.qiniuData.token = res.uptoken;
            that.qiniuData.key = res.saveKey;
          });
      }
    },
    upsuccess(file) {
      var that = this;
      let url = `https://image.huayixh.com/${file.key}`;
      that.formData.ImgUrl = url;
      that.fileList = [];
    },
    uperror() {
      this.$message.error("上传失败");
    },
    exceedPic() {
      this.$message.error("最多只能上传一张;请先删除一张");
    },
    upRemove() {
      this.formData.ImgUrl = "";
    },
    submitForm() {
      var that = this,
        params = that.formData;
      that.$axios
        .post(EditHomeBanner, { jsonData: JSON.stringify(params) })
        .then(res => {
          if (res.Code == "200") {
            that.$message.success("编辑成功");
            that.$router.push("/Web/wxConfig/CarouselList");
          }
        });
    },
    QueryClient() {
      var that = this;
      that.$axios.post(QueryClient, {}).then(res => {
        that.clientData = res;
      });
    },
    QueryBannerType() {
      var that = this;
      that.$axios.post(QueryBannerType, {}).then(res => {
        that.bannerTypeData = res;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let that = this;
    that.$nextTick(function() {
      that.QueryClient();
      that.QueryBannerType();
      var sessionData = JSON.parse(
        sessionStorage.getItem("carouselItem") || false
      );
      that.formData.ImgUrl = sessionData.ImgUrl;
      that.formData.LinkUrl = sessionData.LinkUrl;
      that.formData.Sort = sessionData.Sort;
      that.formData.Client = sessionData.Client;
      that.formData.BannerType = sessionData.BannerType;
      that.formData.Id = sessionData.Id;
    });
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