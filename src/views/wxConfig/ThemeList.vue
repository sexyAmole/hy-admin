<!--  -->
<template>
  <div>
    <!--标题 -->
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          主题列表
          <router-link tag="span" to="/Web/wxConfig/ThemeList/Add"><el-button size="small"  icon="el-icon-circle-plus" type="danger">添加主题</el-button></router-link>
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
          <el-form-item label="名称:">
            <el-input placeholder="主题名称" v-model="queryData.Title"></el-input>
          </el-form-item>
           <el-form-item label="专区样式">
              <el-select v-model="queryData.Theme" placeholder="专区样式">
                <el-option
                  v-for="(item,index) in ThemeData"
                  :key="index"
                  :label="item.themeStr"
                  :value="item.theme"
                ></el-option>
              </el-select>
            </el-form-item>
          <el-form-item>
           
            <!-- QueryZoneTheme -->
            <el-button type="primary" size="small" @click="queryList">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
    <!--内容 -->
    <div class="hy-body-centent" v-loading="loading">
        <el-table :data="listData" stripe style="width: 100%">
          <el-table-column label="ID" prop="ZoneId" align="center" width="80px"></el-table-column>
          <el-table-column label="主题图">
            <template slot-scope="scope">
              <img :src="scope.row.ImgUrl" style="max-width:100px">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="Title" align="center"></el-table-column>
          <el-table-column label="说明" prop="Summary" align="center"></el-table-column>
          <el-table-column label="样式" prop="ThemeStr" align="center"></el-table-column>
          <el-table-column label="是否显示"  align="center">
                         <template slot-scope="scope">
                            <el-switch disabled v-model="scope.row.IsList"> </el-switch>
                          </template>
          </el-table-column>
          <el-table-column label="排序" prop="Sort" align="center"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">
                <router-link
                  tag="span"
                  :to="'/Web/wxConfig/ThemeList/edit?id='+scope.row.ZoneId"
                >查看详情</router-link>
              </el-button>
              <el-button type="text" size="small" @click="itemDel(scope.row.ZoneId)">删除主题</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="page-box">
      <el-pagination
          @current-change="queryChange"
          page-size="10"
          layout="total,prev,pager,next,jumper"
          :total="pageTotal"
          background
          :current-page="queryData.PageIndex"
        ></el-pagination>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  QueryFlowerZoneList,
  DelFlowerZone,
  QueryZoneTheme
} from "../../common/axios.config.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      ThemeData: [],
      queryData: {
        Title: "",
        Theme: "",
        PageIndex:1,
      },
      pageTotal:'',
      listData: [],
      loading: true
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
        Title: "",
        Theme: ""
      };
    },
      queryChange(index){
      this.queryData.PageIndex = index;
      this.queryList();
    },
    queryList() {
      var that = this,
        params = that.queryData;
      that.$axios.post(QueryFlowerZoneList, params ).then(ret => {
        that.loading = false;
        that.listData = ret.Datas;
         that.pageTotal = ret.AllCount;
      });
    },
    itemDel(zoneId) {
      var that = this;
      that
        .$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let params = {
            zoneId: zoneId
          };
          that.$axios.post(DelFlowerZone, params).then(ret => {
            if (ret.Code == "200") {
              that.queryList();
            }
          });
        });
    },
    QueryZoneTheme() {
      var that = this;
      that.$axios.post(QueryZoneTheme, {}).then(ret => {
        that.ThemeData = ret;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    var that = this;
    that.$nextTick(() => {
      that.queryList();
      that.QueryZoneTheme();
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