<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-27 22:42:26
 * @LastEditors: zsm
 * @LastEditTime: 2020-04-24 09:31:37
 -->
<template>
  <div>
    <el-upload
      ref="upload"
      action="http://up-z2.qiniup.com"
      :data="qiniuData"
      accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PBG, .GIF"
      :before-upload="beforeUpload"
      :show-file-list="false"
      :auto-upload="autoUpload"
      :on-error="uperror"
      :multiple="multiple"
      :limit="limit"
      :on-success="successUpload"
    ><el-button size="small" type="primary">{{loading?'正在上传':'点击上传'}}<i class="el-icon-loading" v-if="loading"></i></el-button></el-upload>
  </div>
</template>
<script>
import { QueToken } from "../../common/axios.config.js";
export default {
  name: "upload",
  data() {
    return {
      // 七牛上传数据
      qiniuData: {
        token: "",
        key: ""
      },
      loading:false,
      fileList:{},
      fileCount:0,
    };
  },
  props: {
    limit: { //最大允许上传个数
      type: Number,
      default: function() {
        return 30;
      }
    },
    multiple:{
      type: Boolean,
      default: function() {
        return false;
      }
    },
    autoUpload: { //是否在选取文件后立即进行上传
      type: Boolean,
      default: function() {
        return true;
      }
    },
    uploadData: { // 参数
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    // 上传图片之前请求KEY token 和路径 file
    beforeUpload: async function(file) {
      // this.fileList[file.uid] = "";
      this.$set(this.fileList,file.uid,"")
      var that = this;
      that.loading = true;
      let uploadURL = that.uploadData.uploadURL;
      await that.$axios.get(QueToken, { params: { type: uploadURL } }).then(res => {
          that.qiniuData.token = res.uptoken;
          that.qiniuData.key = res.saveKey;
      });
    },
    //上传失败
    uperror() {
      this.loading = false;
      this.$message.error("上传失败");
    },
    // 上传成功
    successUpload(response, file, fileList) {
      const self = this;
      const imgURL = `https://image.huayixh.com/${response.key}`;
      // self.fileList[file.uid] = imgURL;
      this.$set(this.fileList,file.uid,imgURL);
      ++this.fileCount
      if(this.fileCount == fileList.length){
        self.loading = false;
           for (let item of Object.values(self.fileList)) {
            self.uploadData["imgURL"] = item;
            self.$emit("change", self.uploadData);
         }
         self.fileList = {};
         self.fileCount = 0;
         self.$refs.upload.clearFiles();
      }
      // if(!self.fileList){
      //   self.fileList = fileList;
      // }
      // self.fileList['imgURL'] = imgURL;
      // self.fileList[file.uid] = imgURL;
      // console.log(self.$data.fileList);
      // if(self.$data.fileList.length == fileList.length){
      //   self.loading = false;
      //   for (let item of Object.values(self.fileList)) {
      //       self.uploadData["imgURL"] = item;
      //       self.$emit("change", self.uploadData);
      //    }
      //    self.fileList.clear();
      //   //  self.$refs.upload.clearFiles();
      // }
      // // this.$refs.upload.clearFiles();
      // let imgURL = `https://image.huayixh.com/${file.key}`;
      // this.uploadData["imgURL"] = imgURL;
      // this.$emit("change", this.uploadData);
    }
  },
  mounted() {
    
  },
  filters: {
   
  },
  watch: {
    // fileList:{
    //   handler: function (val, oldVal) {
    //       // ++this.fileCount
    //       // if(this.fileCount === val.length){
    //       //   console.log("ss")
    //       // }
    //       console.log(val, oldVal,val.length)
    //   },
    //   deep: true
    // }
  }
};
</script>
<style lang="less" scoped>
.el-icon-loading{
  margin-left: 4px;
}
</style>