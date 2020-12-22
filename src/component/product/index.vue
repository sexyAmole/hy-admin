<template>
  <div>
    <el-form :inline="true" size="small" @submit.native.prevent class="demo-form-inline">
      <el-form-item label="商品名称:">
        <el-input placeholder="商品名称" v-model="searchData.name" @change="queryProdut"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="queryProdut">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      stripe
      :data="FlowerList"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="缩略图">
        <template slot-scope="scope">
          <img :src="scope.row.SmImg+'?imageView2/2/w/100/h/100/q/100|imageslim'" class="el-Flower-picture" alt />
        </template>
      </el-table-column>
      <el-table-column prop="Keywords" label="名称" width="200"></el-table-column>
      <!-- <el-table-column prop="CategoryName" label="类型"></el-table-column> -->
       <el-table-column prop="SalePrice" label="价格" width="80"></el-table-column>
       <el-table-column prop="DisPrice" label="分销价" width="80"></el-table-column>
       <el-table-column prop="FirstRebate" label="提成" width="80"></el-table-column>
      <!-- <el-table-column label="选择" type="selection" width="55">
      </el-table-column>-->
      <el-table-column label="选择">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.checked"
            v-if="SelectType"
            @change="checkbox(scope.row)"
          >选择</el-checkbox>
          <el-radio
            v-else
            v-model="radioFlowerId"
            :label="scope.row.FlowerId"
            @change="radio(scope.row)"
          >选择</el-radio>
          <!-- <el-button type="text" size="small" @change="onClick(scope.row)">选择</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      page-size="15"
      layout="prev,pager,next,jumper"
      :total="pageTotal"
      :current-page="searchData.PageIndex"
    ></el-pagination>
  </div>
</template>
<script>
import {QueryGoodsSkuList } from "../../common/axios.config.js";
export default {
  name: "product",
  data() {
    return {
      DataType:[],
      FlowerList: [],
      pageTotal: "",
      loading: false,
      searchData: {
        PageSize: 6, //每页大小
        PageIndex: 1, //页码
        name: "",
        type: 0
      }
    };
  },
  props: {
    Flowers: {
      type: Array,
      default: function() {
        return [];
      }
    },
    radioFlowerId: {
      type: String,
      default: function() {
        return "";
      }
    },
    //选中类型 多选或者单选
    SelectType: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // onClick(el) {
    //     this.$emit('click', [el]);
    // },
    //多选 设置选中在返回当前el
    checkbox(el) {
      let retData = JSON.parse(JSON.stringify(el))
      this.$emit("change", retData);
    },
    // queryDataType(){
    //   let that = this;
    //    that.$axios.post(QueryDataType, {}).then(res => {
    //         that.DataType = res;
    //     });
    // },
    //单选
    radio(el) {
      //   this.Flowers[0].FlowerId = el.FlowerId;
      this.$emit("change", el);
      // this.$emit('click', this.Flowers);
    },
    // selection
    handleSelectionChange() {
      // let newData = [];
      // selection.forEach(function(item) {
      //   this.Flowers.push(item);
      // });
      // this.Flowers = newData;
    },
    handleCurrentChange(index) {
      this.searchData.PageIndex = index;
       this.queryGood();
      // if (this.searchData.type === 1) {
      //   this.queryGood();
      // } else {
      //   this.initialize();
      // }
    },
    queryProdut() {
      let that = this;
      that.searchData.PageIndex = 1;
      that.queryGood();
      // if (that.searchData.type === 1) {
      //   that.queryGood();
      // } else {
      //   that.initialize();
      // }
    },
    //查询礼品
    queryGood() {
      let that = this;
         const searchData = that.searchData;
      that.loading = true;
      that.$axios
        .post(QueryGoodsSkuList, {
          PageSize: searchData.PageSize,
          PageIndex: searchData.PageIndex, //页码
          Keywords: searchData.name
        })
        .then(res => {
          that.loading = false;
          that.pageTotal = res.AllCount;
          const retData = res.Datas;
          // let newForData = [];
          // for (let i = 0; i < retData.length; i++) {
          //   newForData.push({
          //     DataId: retData[i].SkuId,
          //     ImgUrl: retData[i].SmImg,
          //     Title: retData[i].Keywords,
          //     NowPrice: retData[i].SalePrice,
          //     CategoryName: "礼品",
          //     DataType:1
          //   });
          // }
          that.getChecked(retData);
        });
    }, //查询鲜花
    // initialize() {
    //   let that = this;
    //   const searchData = that.searchData;
    //   that.loading = true;
    //   that.$axios
    //     .get(QueryFlowerList, {
    //       params: {
    //         PageSize: searchData.PageSize,
    //         PageIndex: searchData.PageIndex, //页码
    //         FlowerName: searchData.name
    //       }
    //     })
    //     .then(res => {
    //       that.loading = false;
    //       that.pageTotal = res.AllCount;
    //       const retData = res.Datas;
    //       let newForData = [];
    //       for (let i = 0; i < retData.length; i++) {
    //         newForData.push({
    //           DataId: retData[i].FlowerId,
    //           ImgUrl: retData[i].ImgUrl,
    //           Title: retData[i].FlowerName,
    //           CategoryName: "鲜花",
    //           NowPrice: retData[i].BasePrice,
    //           DataType:0
    //         });
    //       }
    //       that.getChecked(newForData);
    //     });
    // },
    getChecked(FlowerList) {
      let that = this;
      // var FlowerList = FlowerList;
      //添加选择字段 判断是否多选和数据是否为空
      if(that.Flowers.length){
        FlowerList.forEach(function(item) {
          item.checked = false;
          that.Flowers.forEach(function(items) {
            if (items.DataId == item.SkuId) {
              item.checked = true;
            }
          });
        });
      }
     

      // if (that.SelectType && that.Flowers.length) {
      //   FlowerList.forEach(function(item) {
      //     item.checked = false;
      //     that.Flowers.forEach(function(items) {
      //       if (items.SkuId == item.SkuId) {
      //         item.checked = true;
      //       }
      //     });
      //   });
      // } else {
      //   FlowerList.forEach(function(item) {
      //     item.checked = false;
      //   });
      // }
      //判断是否只有一个商品然后选择
      if(FlowerList.length == 1 && !FlowerList[0].checked){
        FlowerList[0].checked = true;
        that.autoChecked(FlowerList[0])
      }
      that.FlowerList = FlowerList;
    },
    autoChecked(el){
       this.$emit("change", el);
    }
  },

  mounted() {
    let that = this;
    this.$nextTick(() => {
      that.queryGood();
      // that.queryDataType();
    });
  },
  filters: {
    thumbnail: function(value) {
      if (!value) return "";
      value = value.split(",");
      return value[0];
    }
  },
  watch: {
    Flowers: {
      handler: function() {
        // this.searchData.name = ""
        //   this.searchData.PageIndex = 1;
        // this.queryGood();
        // console.log("ss");
        //   console.log(oldVal,val);val, oldVal
        //   if(oldVal.length != val.length){
        // this.getChecked(this.FlowerList);
        //   }
        // this.getChecked(this.FlowerList);
      },
      deep: true
    },
    show:{
        handler: function(olwVal) {
          if(olwVal){
            this.searchData.name = ""
            this.searchData.PageIndex = 1;
            this.queryGood();
          }
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
</style>