<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: zsm
 * @LastEditTime: 2020-04-03 17:25:09
 -->
<template>
    <div id="app">
       <router-view></router-view>
    </div>
</template>
<script>

export default {
    name: 'app',
    components: {},
    methods: {}
};
</script>
<style>
@import './assets/iconfont/iconfont.css';
@import './assets/mian.css';

#app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #F5F6FA;
}

.hy-body-title {
    font-size: 15px;
    color: #333;
    padding: 20px 0;
}
.hy-body-centent{
    border-radius:8px;
    /* padding: 14px 0; */
    overflow: hidden;
    background-color: #fff;
}

.hy-body-handle{
    padding: 0 20px 14px 20px;
}
.el-row {
    padding:0 20px;
  }
.max-img{
    max-width: 100%;
    height: auto;
    vertical-align: top;
}
.cellclass .cell{
  overflow: unset;

}
.from-img-200{
    max-height: 200px;
    margin-bottom: 10px;
    vertical-align: top;
}
.btn-form{
    padding: 35px 0 10px 0;
    border-top: 1px dashed #ccc;
}


.hy-search-box{
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  padding: 18px 10px 0 10px;
  margin-bottom: 20px;
}
.el-table__row:nth-child(odd){
 background-color: #F3F6FB;
}

.hy-empty{
    padding: 10px 0;
    text-align: center;
}
.el-table__row{
color:#909399
}
.el-link +.el-link{
    margin-left: 5px;
}
.has-gutter tr{
    color: #2B2B2B;
    font-size: 15px;
    line-height: 15px;
    letter-spacing: 2px;
    font-weight: bold;
}
 .el-table th{
    /* padding: 16px 0; */
 }
.page-box{
    padding: 20px 0;
}
.el-pagination{
    text-align: center;
}
.table-add{
    padding: 10px 0;
    text-align: center;
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: #EBEEF5;
  
}
</style>