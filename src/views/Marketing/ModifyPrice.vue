<template>
    <div>
        <div class="hy-body-title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>价格设置
                    <el-button size="small" @click="AddSettings" icon="el-icon-circle-plus"  type="danger">添加纪录</el-button>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="hy-search-box">
 <el-form :inline="true" :model="searchData" ref="searchData" size="small" class="demo-form-inline">
                    <el-form-item label="时间段">
                        <el-date-picker v-model="TimeSlot" type="datetimerange" @change="dateChange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="商品分类:">
                        <el-cascader v-model="category" :options="categoryData" :props="categoryProps" @change="categoryChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="商品名称:" prop="FlowerName">
                        <el-input placeholder="商品名称" v-model="searchData.FlowerName"></el-input>
                    </el-form-item>
                    <el-form-item label="节日价:" prop="IsHoliday">
                        <el-switch v-model="searchData.IsHoliday">
                        </el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="queryPrice">查询</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>
        </div>
        <div class="hy-body-centent" v-loading="loading">
            
                <el-table :data="listeners" style="width: 100%">
                    <el-table-column prop="CategoryName" label="分类"></el-table-column>
                    <el-table-column prop="FlowerName" label="商品"></el-table-column>
                    <el-table-column label="开始时间">
                        <template slot-scope="scope">
                            {{scope.row.StartDate | date}}
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间">
                        <template slot-scope="scope">
                            {{scope.row.EndDate | date}}
                        </template>
                    </el-table-column>
                    <el-table-column label="市场价比例">
                        <template slot-scope="scope">
                            {{scope.row.MarketPercent}}%
                        </template>
                    </el-table-column>
                    <el-table-column label="销售价比例" >
                        <template slot-scope="scope">
                            {{scope.row.SellPercent}}%
                        </template>
                    </el-table-column>
                    <el-table-column label="转单价比例" >
                        <template slot-scope="scope">
                            {{scope.row.ShiftPercent}}%
                        </template>
                    </el-table-column>
                    <el-table-column label="是否节日" >
                        <template slot-scope="scope">
                            <el-switch disabled v-model="scope.row.IsHoliday">
                        </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Sort" label="排序" >
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editor(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="intdelete(scope.row.PriceId)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                
        </div>
        <div class="page-box">
            <el-pagination @current-change="handleCurrentChange" background page-size="10" layout="total,prev,pager,next,jumper" :total="pageTotal" :current-page="searchData.PageIndex">
                </el-pagination>
        </div>
    </div>
</template>
<script>
import { QueryPriceList, DelPrice, QueryCategoryList } from '../../common/axios.config.js';
import { emptyFalse,FormatDate } from '../../common/Util.js';
export default {
    data() {
        return {
            searchData: {
                CategoryName: '',
                FlowerName: '',
                EndDate: '', //结束时间
                StartDate: '', //开始日期
                PageSize: 10, //每页大小
                PageIndex: 1, //页码
                IsHoliday: false
            },
            category: [],
            TimeSlot: [],
            categoryData: [],
            categoryProps: { //分类选择KEY修改
                label: 'CategoryName',
                value: 'CategoryName',
                children: "Children",
            },
            pageTotal: "",
            listeners: [] //列表数据
        }
    },
    methods: {
        //重置
        resetForm() {
            this.TimeSlot = [];
            this.category = [];
            this.searchData.CategoryName = "";
            this.searchData = {
                CategoryName: '',
                FlowerName: '',
                EndDate: '', //结束时间
                StartDate: '', //开始日期
                PageSize: 15, //每页大小
                PageIndex: 1, //页码
                IsHoliday: false
            }
        },
        //添加
        AddSettings() {
            this.$router.push('/Web/Marketing/SetModifyPrice/add');
            sessionStorage.removeItem("PriceDatas")
        },
        //时间选择给搜索赋值
        dateChange(value) {
            this.searchData.StartDate = value[0];
            this.searchData.EndDate = value[1];
        },
        //分类选择赋值给搜索
        categoryChange(item) {
            this.searchData.CategoryName = item[1]
        },
        //分页
        handleCurrentChange(index) {
            this.searchData.PageIndex = index;
            this.initialize();
        },
        //其他请求 分类
        axiosOther() {
            let that = this;
            //获取分类
            that.$axios.get(QueryCategoryList).then((res) => {
                that.categoryData = emptyFalse(res);
            })
        },
        queryPrice(){
            this.searchData.PageIndex = 1;
            this.initialize();
        },
        //列表请求
        initialize() {
            let that = this,
                params = JSON.parse(JSON.stringify(this.searchData));
            that.loading = true;
            params.IsHoliday = params.IsHoliday ? true : "";
            that.$axios.get(QueryPriceList,{params}).then((res) => {
                that.loading = false;
                that.pageTotal = res.AllCount;
                that.listeners = res.Datas;
            })
        },
        //删除列表
        intdelete(priceId) {
            let that = this;
            that.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    priceId: priceId
                }
                that.$axios.post(DelPrice, params).then((res) => {
                    if (res) {
                        that.initialize();
                    }
                })
            }).catch(() => {});
        },
        // 编辑
        editor(el) {
            this.$router.push(`/Web/Marketing/SetModifyPrice/edit`);
            sessionStorage.setItem("PriceDatas",JSON.stringify(el))
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initialize();
            this.axiosOther();
        })
    },
    filters: {
        date: function(value) {
            if (!value) return;
            let { Y, M, D, h, m, s } = FormatDate(value)
            return `${Y}/${M}/${D} ${h}:${m}:${s}`;
        }
    }
};
</script>
<style lang="less" scoped>
</style>