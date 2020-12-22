<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-26 14:15:33
 * @LastEditors: zsm
 * @LastEditTime: 2020-04-09 19:57:28
 -->
<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
          商品SKU
      </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
      <div class="hy-search-box">
      <el-form
        :inline="true"
        :model="searchData"
        size="small"
        @submit.native.prevent
        class="demo-form-inline"
      > 
        <el-form-item label="商品ID">
          <el-input autocomplete="off" @change="handleCurrentChange(1)" v-model="searchData.GoodsId"></el-input>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input autocomplete="off" @change="handleCurrentChange(1)" v-model="searchData.Keywords"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleCurrentChange(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="hy-body-centent" v-loading="loading">
         <el-table :data="listData" stripe style="width: 100%">
        <el-table-column label="ID" prop="SkuId" width="80"></el-table-column>
        <el-table-column label="商品信息" width="160">
          <template slot-scope="scope">
          <p class="ellipsis">{{scope.row.Keywords}}</p>
          </template>
        </el-table-column>
        <el-table-column label="SKU"  width="160">
          <template slot-scope="scope">
          <p class="ellipsis" v-for="(item,index) in scope.row.SkuJson" :key="index">{{item.Name}} : {{item.Value}}</p>
          </template>
        </el-table-column>
        <el-table-column label="图片"  width="100" align="center">
          <template slot-scope="scope">
            <img v-if="scope.row.SmImg" :src="scope.row.SmImg+'?imageView2/2/w/100/h/100/q/100|imageslim'" class="el-Flower-picture">
            <span>
            <hyUpload v-if="!scope.row.input"
              :uploadData="{index:scope.$index,uploadURL:'commodity/SKU'}"
              @change="successUpload"
            ></hyUpload>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="基本信息" width="240">
          <template slot-scope="scope">
            <p class="input-p">
             库存：<el-input type="Number" :disabled="scope.row.input"  style="width:140px !important" v-model="scope.row.Stock" autocomplete="off"></el-input>
            </p>
            <p class="input-p">
             销量：<el-input type="Number" :disabled="scope.row.input" style="width:140px !important" v-model="scope.row.Sales" autocomplete="off"></el-input>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="价格设置" width="240">
          <template slot-scope="scope">
            <p class="input-p">
             成本价：<el-input type="Number" :disabled="scope.row.input" style="width:140px !important" v-model="scope.row.CostPrice" autocomplete="off"></el-input>
            </p>
            <p class="input-p">
             销售价：<el-input type="Number" :disabled="scope.row.input" style="width:140px !important" v-model="scope.row.SalePrice" autocomplete="off"></el-input>
            </p>
            <p class="input-p">
             市场价：<el-input type="Number" :disabled="scope.row.input"  style="width:140px !important" v-model="scope.row.MarketPrice" autocomplete="off"></el-input>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="分销价格设置" width="240">
          <template slot-scope="scope">
            <p class="input-p">
              <!--   @input="agentInput(scope.row)" -->
             &nbsp;&nbsp;&nbsp;分销价：<el-input type="Number" :disabled="scope.row.input" style="width:140px !important" v-model="scope.row.DisPrice" autocomplete="off"></el-input>
            </p>
            <p class="input-p">
             分销提成：<el-input type="Number" :disabled="scope.row.input" style="width:140px !important" v-model="scope.row.FirstRebate" autocomplete="off"></el-input>
            </p>
            <p class="input-p">
             上级提成：<el-input type="Number" :disabled="scope.row.input"  style="width:140px !important" v-model="scope.row.ParentRebate" autocomplete="off"></el-input>
            </p>
          </template>
        </el-table-column>
        <!-- <el-table-column label="销量" align="center">
          <template slot-scope="scope">
            <el-input type="Number" :disabled="scope.row.input" style="width:100px !important" v-model="scope.row.Sales" autocomplete="off"></el-input>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="市场价" align="center">
          <template slot-scope="scope">
            <el-input type="Number" :disabled="scope.row.input" style="width:100px !important" v-model="scope.row.MarketPrice" autocomplete="off"></el-input>
          </template>
        </el-table-column>
         <el-table-column label="成本价" align="center">
          <template slot-scope="scope">
            <el-input type="Number" :disabled="scope.row.input" style="width:100px !important" v-model="scope.row.CostPrice" autocomplete="off"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="销售价" align="center">
          <template slot-scope="scope">
             <el-input type="Number" :disabled="scope.row.input" style="width:100px !important" v-model="scope.row.SalePrice" autocomplete="off"></el-input>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="分销价" align="center">
          <template slot-scope="scope">
             <el-input type="Number" :disabled="scope.row.input" style="width:100px !important" v-model="scope.row.DisPrice" autocomplete="off"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="一级提成" align="center">
          <template slot-scope="scope">
             <el-input type="Number" :disabled="scope.row.input" style="width:100px !important" v-model="scope.row.FirstRebate" autocomplete="off"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="二级提成" align="center">
          <template slot-scope="scope">
             <el-input type="Number" :disabled="scope.row.input" style="width:100px !important" v-model="scope.row.ParentRebate" autocomplete="off"></el-input>
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link  type="primary" @click="jump(scope.row)" >评论</el-link>
            <el-link  type="primary" @click="itemEdit(scope.row)">{{scope.row.editName}}</el-link>
            <el-link  type="primary" @click="cancel(scope.row)">取消</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
        <div class="page-box">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        page-size="10"
        layout="total,prev,pager,next,jumper"
        :total="pageTotal"
        :current-page="searchData.PageIndex"
      ></el-pagination>
    </div>
  </div>
</template>
<style lang="less" scoped>
.ellipsis{
  width:150px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
}
.input-p{
  margin-top: 5px;
}
</style>
<script>

import {QueryGoodsSkuList,EditGoodsSku} from "../../common/axios.config.js";
import hyUpload from "../../component/upload/index";
import {getQueryString} from "../../common/Util.js";
export default {
  components: { hyUpload },
  data() {
    return {
      listData: [], //分类数据
      pageTotal:0,
      searchData: {
        PageIndex: 1,
        GoodsId:"",
        Keywords:'',
      },
      loading: true //加载动画
    };
  },
  methods: {
    queryInfo() {
      let that = this;
      let params = that.searchData;
      that.$axios.post(QueryGoodsSkuList,params).then(res => {
        that.loading = false;
        let Datas = res.Datas;
        for (let i = 0;i<res.Datas.length;i++){
            Datas[i].SkuJson = JSON.parse(Datas[i].SkuJson);
            Datas[i].input = true;
            Datas[i].editName = "编辑";
        }
        that.listData = Datas;
        that.pageTotal = res.AllCount;
      });
    },
    // 编辑属性
    itemEdit(el){
        el.input = !el.input;
        if(!el.input){
            el.editName = "确认";
        }else{
            el.editName = "编辑";
          this.editGoodsSku(el)
        }
    },
    //取消编辑
    cancel(el){
      el.input = !el.input;
      el.editName = "编辑";
    },
    // agentInput(el){
    //   if(el){
    //       DisPrice.SalePrice
    //   }
    //   // console.log(el);
    // },
    editGoodsSku(oldParams){
      let that = this;
      let params = {
        MarketPrice:oldParams.MarketPrice,
        SalePrice:oldParams.SalePrice,
        CostPrice:oldParams.CostPrice,
        DisPrice:oldParams.DisPrice,
        FirstRebate:oldParams.FirstRebate,
        ParentRebate:oldParams.ParentRebate,
        Sales:oldParams.Sales,
        SkuId:oldParams.SkuId,
        SmImg:oldParams.SmImg,
        Stock:oldParams.Stock
      }
      that.$axios.post(EditGoodsSku,params).then(res => {
           if (res.Code == 200) {
                that.$message.success("编辑成功");
          }
      });  
    },
       // 上传成功
    successUpload(uploadData) {
      this.listData[uploadData.index].SmImg = uploadData.imgURL;
    },
    handleCurrentChange(index){
      this.searchData.PageIndex = index;
      this.queryInfo()
    },
    jump(item){
      this.$router.push(`/Web/component/componentAdd?id=${item.GoodsId}&name=${item.Keywords}&skuID=${item.SkuId}&type=1`);
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.searchData.GoodsId = getQueryString("id");
      this.queryInfo();
    });
  }
};
</script>