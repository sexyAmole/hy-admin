<!--  -->
<template>
  <div>
    <!--标题 -->
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          首页轮播
          <el-button size="small" @click="addList" icon="el-icon-circle-plus" type="danger">添加轮播</el-button>
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
        <el-form-item label="使用端">
          <el-select v-model="queryData.Client" placeholder="使用端" style="width:100%">
            <el-option
              v-for="(item,index) in clientData"
              :key="index"
              :label="item.themeStr"
              :value="item.theme"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="queryData.BannerType" placeholder="类型" style="width:100%">
            <el-option
              v-for="(item,index) in bannerTypeData"
              :key="index"
              :label="item.themeStr"
              :value="item.theme"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="queryList">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--内容 -->
    <div class="hy-body-centent" v-loading="loading">
      <el-table :data="listData" stripe style="width: 100%">
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.ImgUrl" style="max-width:100px">
          </template>
        </el-table-column>
        <el-table-column label="链接" prop="LinkUrl" align="center"></el-table-column>
        <el-table-column label="排序" prop="Sort" align="center"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="itemEdit(scope.row)">查看详情</el-button>
            <el-button type="text" size="small" @click="itemDel(scope.row.Id)">删除轮播</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <!-- <div class="page-box">
      <el-pagination
        @current-change="queryChange"
        page-size="10"
        layout="total,prev,pager,next,jumper"
        :total="pageTotal"
        background
        :current-page="queryData.PageIndex"
      ></el-pagination>
    </div>-->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  QueryHomeBannerList,
  DelHomeBanner,
  QueryClient,
  QueryBannerType
} from "../../common/axios.config.js";
// import {} from "../../common/Util.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      bannerTypeData: [],
      clientData: [],
      queryData: {
        BannerType: "",
        Client: "",
        PageIndex: 1
      },
      listData: [],
      pageTotal: "",
      loading: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    resetForm() {
      var that = this;
      that.queryData = {
        BannerType: "",
        Client: "",
        PageIndex: 1
      };
    },
    queryList() {
      var that = this,
        params = that.queryData;
      that.loading = true;
      params.PageIndex = 1;
      that.$axios.post(QueryHomeBannerList, params).then(ret => {
        that.loading = false;
        that.listData = ret;
      });
    },
    itemDel(id) {
      var that = this;
      that
        .$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let params = {
            id: id
          };
          that.$axios.post(DelHomeBanner, params).then(ret => {
            if (ret.Code == "200") {
              that.queryList();
            }
          });
        });
    },
    addList() {
      this.$router.push("/Web/wxConfig/CarouselList/add");
      sessionStorage.removeItem("carouselItem");
    },
    itemEdit(el) {
      sessionStorage.setItem("carouselItem", JSON.stringify(el));
      this.$router.push("/Web/wxConfig/CarouselList/edit");
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
    var that = this;
    that.$nextTick(() => {
      that.queryList();
      that.QueryClient();
      that.QueryBannerType();
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