<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          商品管理
          <el-button size="small" @click="SetFlower" icon="el-icon-circle-plus" type="danger">添加商品</el-button>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="hy-search-box">
      <el-form
        :inline="true"
        :model="searchData"
        size="small"
        ref="searchData"
        class="demo-form-inline"
      >
        <el-form-item label="时间段">
          <el-date-picker
            v-model="TimeSlot"
            type="datetimerange"
            @change="dateChange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="商品分类:">
          <el-cascader
            v-model="category"
            :options="categoryData"
            :props="categoryProps"
            @change="categoryChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品属性:">
          <el-cascader
            v-model="attribute"
            :options="attributeData"
            :props="attributeProps"
            @change="attributeChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input placeholder="商品名称" v-model="searchData.FlowerName"></el-input>
        </el-form-item>
        <el-form-item label="关键词:">
          <el-input placeholder="关键词(多个用 | 开)" v-model="searchData.Keywords"></el-input>
        </el-form-item>
        <el-form-item label="营销方式:">
          <el-select v-model="Marketing" multiple placeholder="营销方式" @change="Marketingchange">
            <el-option label="热销" value="1"></el-option>
            <el-option label="推荐" value="2"></el-option>
            <el-option label="特价" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销量:">
          <el-select v-model="Sales" placeholder="销量" @change="changeSales">
            <el-option label="默认" value></el-option>
            <el-option label="升序" value="1"></el-option>
            <el-option label="降序" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onquery">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="hy-body-centent" v-loading="loading">
      <template>
        <el-table :data="FlowerData" style="width: 100%">
          <el-table-column prop="FlowerId" label="ID" width="100"></el-table-column>
          <el-table-column prop="Sort" label="状态" width="80">
            <template slot-scope="scope">{{scope.row.FlowerStatus?'下架':'上架'}}</template>
          </el-table-column>
          <el-table-column label="缩略图" width="80">
            <template slot-scope="scope">
              <img :src="scope.row.ImgUrl | thumbnail" class="el-Flower-picture" alt>
            </template>
          </el-table-column>
          <el-table-column prop="CategoryName" label="分类" width="100"></el-table-column>
          <el-table-column prop="FlowerName" label="名称"></el-table-column>
          <el-table-column prop="BasePrice" label="价格"  width="60"></el-table-column>
          <el-table-column prop="Keywords" label="标签"></el-table-column>
          <el-table-column label="营销方式"  width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" v-if="scope.row.IsHot">热销</el-button>
              <el-button size="mini" type="success" v-if="scope.row.IsRecommend">推荐</el-button>
              <el-button size="mini" type="danger" v-if="scope.row.IsSpecial">特价</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="Sales" label="销量"  width="60"></el-table-column>
          <el-table-column prop="Sort" label="排序"  width="60"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link  type="primary"  v-if="scope.row.FlowerStatus == 0" @click="upperLowerMoney(scope.row.FlowerId,1)">下架</el-link>
              <el-link  type="primary"  v-if="scope.row.FlowerStatus == 1" @click="upperLowerMoney(scope.row.FlowerId,0)">上架</el-link>
              <el-link  type="primary" @click="addComment(scope.row)">评论</el-link>
              <el-link  type="primary"  @click="editor(scope.row.FlowerId)">编辑</el-link>
              <el-link  type="primary"  @click="intdelete(scope.row.FlowerId)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </template>
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
  <!--      <el-table-column label="时间">
                            <template slot-scope="scope">
                                <div>添加时间:{{scope.row.InsertDate | date}}</div>
                                <div>修改时间:{{scope.row.ModifyTime | date}}</div>
                            </template>
  </el-table-column>-->
</template>
<script>
import {
  QueryFlowerList,
  AttributeList,
  QueryCategoryList,
  DelFlower,
  UpdateStatus
} from "../../common/axios.config.js";
import { emptyFalse } from "../../common/Util.js";
export default {
  name: "FlowerList",
  data() {
    return {
      loading: false,
      FlowerData: [],
      category: [], //分类选择数据
      TimeSlot: [], //时间段
      categoryData: [], //分类对象
      categoryProps: {
        //分类选择KEY修改
        label: "CategoryName",
        value: "CategoryId",
        children: "Children"
      },
      attribute: [], //属性选择数据
      attributeData: [], //属性对象
      attributeProps: {
        //分类选择KEY修改
        label: "AttributeName",
        value: "AttributeId",
        children: "Children"
      },
      Marketing: [],
      Sales: "",
      pageTotal: "",
      searchData: {
        //搜索对象
        AttributeId: "", //鲜花属性Id(自增)
        CategoryId: "", //FlowerId
        FlowerName: "", //FlowerName
        IsHot: "", //IsHot
        IsRecommend: "", //是否推荐
        IsSpecial: "", //是否特价
        Keywords: "", //关键词(多个用"|"开)
        SalesLessThan: "", //销量(小于)
        SalesMoreThan: "", //销量(大于)
        EndDate: "", //结束时间
        StartDate: "", //开始日期
        PageSize: 15, //每页大小
        PageIndex: 1 //页码
      }
    };
  },
  components: {},
  methods: {
    Marketingchange(value) {
      let that = this;
      that.searchData.IsHot = "";
      that.searchData.IsRecommend = "";
      that.searchData.IsSpecial = "";
      value.forEach(item => {
        switch (parseInt(item)) {
          case 1:
            that.searchData.IsHot = true;
            break;
          case 2:
            that.searchData.IsRecommend = true;
            break;
          case 3:
            that.searchData.IsSpecial = true;
            break;
        }
      });
    },
    changeSales(value) {
      let that = this;
      that.searchData.SalesLessThan = "";
      that.searchData.SalesMoreThan = "";
      switch (parseInt(value)) {
        case 1:
          that.searchData.SalesMoreThan = true;
          break;
        case 2:
          that.searchData.SalesLessThan = true;
          break;
      }
    },
    categoryChange(item) {
      this.searchData.CategoryId = item[1];
    },
    attributeChange(item) {
      this.searchData.AttributeId = item[1];
    },
    dateChange(date) {
      this.searchData.StartDate = date ? date[0] : "";
      this.searchData.EndDate = date ? date[1] : "";
    },
    axiosOther() {
      let that = this;
      //获取分类
      that.$axios.get(QueryCategoryList).then(res => {
        that.categoryData = emptyFalse(res);
      });
      //获取属性
      that.$axios.get(AttributeList).then(res => {
        that.attributeData = emptyFalse(res);
      });
    },
    //获取列表
    initialize() {
      let that = this,
        params = this.searchData;
      //获取列表
      that.loading = true;
      that.$axios.get(QueryFlowerList, { params: params }).then(res => {
        that.FlowerData = res.Datas;
        that.loading = false;
        that.pageTotal = res.AllCount;
      });
    },
    onquery() {
      this.searchData.PageIndex = 1;
      this.initialize();
    },
    handleCurrentChange(index) {
      this.searchData.PageIndex = index;
      this.initialize();
    },
    intdelete(FlowerId) {
      let that = this;
      that
        .$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let params = {
            flowerId: FlowerId
          };
          that.$axios.post(DelFlower, params).then(res => {
            if (res) {
              that.initialize();
            }
          });
        })
        .catch(() => {});
    },
    editor(FlowerId) {
      this.$router.push(`/Web/Product/SetFlower/edit?FlowerId=${FlowerId}`);
    },
    SetFlower() {
      this.$router.push("/Web/Product/SetFlower/add");
    },
    addComment(item){
      this.$router.push(`/Web/component/componentAdd?id=${item.FlowerId}&name=${item.FlowerName}&type=0`);
    },
    //上下架商品
    upperLowerMoney(FlowerId, status) {
      var msg = status ? "你确定要上架架该商品" : "你确定要下架该商品",
        that = this;
      that
        .$confirm(msg, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let params = {
            flowerId: FlowerId,
            status: status
          };
          that.$axios.post(UpdateStatus, params).then(res => {
            if (res) {
              that.initialize();
            }
          });
        })
        .catch(() => {});
    },
    /*重置数据*/
    resetForm() {
      let that = this;
      // /选择框绑定数据
      this.TimeSlot = [];
      this.category = [];
      this.attribute = [];
      that.Marketing = [];
      that.Sales = "";
      // 搜索数据
      that.searchData.AttributeId = "";
      that.searchData.CategoryId = "";
      that.searchData.FlowerName = "";
      that.searchData.IsHot = "";
      that.searchData.IsRecommend = "";
      that.searchData.IsSpecial = "";
      that.searchData.Keywords = "";
      that.searchData.SalesLessThan = "";
      that.searchData.SalesMoreThan = "";
      that.searchData.EndDate = "";
      that.searchData.StartDate = "";
      that.searchData.SalesMoreThan = "";
    }
  },
  mounted() {
    let that = this;
    that.$nextTick(() => {
      that.initialize();
      that.axiosOther();
    });
  },
  filters: {
    thumbnail: function(value) {
      if (!value) return "";
      value = value.split(",");
      return value[0] + "?imageView2/1/w/50/h/50";
    }
  }
};
</script>
<style lang="less">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.el-tree-node__content {
  height: 40px;
}
</style>