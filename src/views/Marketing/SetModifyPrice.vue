<template>
    <div>
        <div class="hy-body-title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/Web/Marketing/ModifyPrice' }">价格设置</el-breadcrumb-item>
                <el-breadcrumb-item>{{title_back}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="hy-body-centent">
            <div class="hy-body-handle">
                <div class="el-card__header">
                    <div class="clearfix"><span>分类/商品--设置</span>
                    </div>
                </div>
                <el-form :model="dataForm" ref="dataForm" :rules="rules" label-width="100px" class="demo-ruleForm hui-from">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="时间设置">
                                <el-date-picker v-model="TimeSlot" @change="onchange" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="商品分类" v-if="!dataForm.FlowerId">
                                <el-select placeholder="选择商品分类" v-model="dataForm.CategoryId">
                                    <el-option label="无分类" :value="0"></el-option>
                                    <el-option v-for="(item,index) in categoryData" :label="item.CategoryName" :value="item.CategoryId"  :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商品" v-if="!dataForm.CategoryId">
                                <el-button type="primary" size="small" @click="ProdutShow = true">添加商品</el-button>
                                <div class="produt-selet" v-if="Flowers.length">
                                    <div class="produt-selet-item" v-for="(item,index) in Flowers" :key="index">
                                        <img :src="item.ImgUrl.split(',')[0]">
                                        <!-- <div class="iconDelete">
                                            <i class="el-icon-delete"></i>
                                        </div> -->
                                    </div>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="el-card__header">
                        <div class="clearfix"><span>价格比例设置</span>
                        </div>
                    </div>
                    <el-row>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="市场价比" >
                                        <el-input autocomplete="off" v-model="dataForm.MarketPercent" type="number"><span slot="append">%</span></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="销售价比" >
                                        <el-input autocomplete="off" v-model="dataForm.SellPercent" type="number"><span slot="append">%</span></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="转单价比">
                                        <el-input autocomplete="off"  v-model="dataForm.ShiftPercent" type="number"><span slot="append">%</span></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="排序">
                                        <el-input autocomplete="off"  v-model="dataForm.Sort" type="number"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <div class="el-card__header">
                        <div class="clearfix"><span>节日设置</span>
                        </div>
                    </div>
                    <el-row>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="是否节日价">
                                        <el-switch v-model="dataForm.IsHoliday"></el-switch>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="节日提示语" v-if="dataForm.IsHoliday">
                                <el-input autocomplete="off" v-model="dataForm.HolidayTips"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="btn-form" >
                            <el-form class="demo-ruleForm" label-width="120px">
<el-form-item>
                                <el-button type="primary" @click="submitForm">提交保存</el-button>
                                <el-button>
                                    <router-link to="/Web/Marketing/CouponList">取消</router-link>
                                </el-button>
                            </el-form-item>
                            </el-form>
                        </div>
            </div>
        </div>
        <!-- 商品选择框 -->
        <el-dialog title="选择商品" :visible.sync="ProdutShow">
            <product :radioFlowerId="dataForm.FlowerId"  @change="onSelect"></product>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ProdutShow = false">取 消</el-button>
                <el-button type="primary" @click="ProdutShow = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { QueryCategoryList, EditPrice,QueryFlowerDetail } from '../../common/axios.config.js';
import product from '../../component/product/index';
import {formatDateString} from '../../common/Util.js';
export default {
    components: {
        product
    },
    data() {
        return {
            title_back: '',
            TimeSlot: [], //时间段 数组0是开始1是结束
            categoryData: [], //分类
            Flowers: [],
            dataForm: {
                IsHoliday: false, //是否为节日价
                SellPercent: '', //销售价百分比
                MarketPercent: '', //市场价百分比
                ShiftPercent: '', //转单价百分比
                EndDate: '', //结束时间
                StartDate: '', //开始时间
                Sort:99, //排序
                CategoryId: '', //类别id
                PriceId:'',
                HolidayTips:'节日价',//提示语
                FlowerId: '' //鲜花id
            },
            ProdutShow: false
        }
    },
    methods: {
        onchange(value) {
            this.dataForm.StartDate = value[0];
            this.dataForm.EndDate = value[1];
        },
        onSelect(values) {
            this.Flowers = [values];
            this.dataForm.FlowerId = values.FlowerId;
        },
        submitForm() {
            let that = this;
               let params = that.dataForm;
                that.$axios.post(EditPrice, params).then((res) => {
                    if (!res) {
                        that.$message.error(res.Message);
                    } else {
                        that.$message.success("添加成功");
                        that.$router.push('/Web/Marketing/ModifyPrice');
                    }
                })
            // console.log(that.dataForm.CategoryId)
            // if(this.dataForm.IsHoliday && !this.dataForm.HolidayTips){
            //     that.$message.warning("设置了节日价请设置提示语")
            // }
            // else if (!this.dataForm.IsHoliday && !that.dataForm.CategoryId && !that.dataForm.FlowerId) {
            //     that.$message.warning("请设置你要调比例的商品、分类")
            // } else {
            //     let params = that.dataForm;
            //     that.$axios.post(EditPrice, params).then((res) => {
            //         if (res.Code == 400) {
            //             that.$message.error(res.Message);
            //         } else {
            //             that.$message.success("添加成功");
            //             that.$router.push('/Web/Marketing/ModifyPrice');
            //         }
            //     })
            // }
        },
        initialize() {
            let that = this;
            that.$axios.get(QueryCategoryList).then((res) => {
                let newRes = [];
                //追加所有的二级属性
                function tree(data) {
                    data.forEach(function(item) {
                        if (item.Children.length) {
                            tree(item.Children)
                        }
                        if (item.ParentId) {
                            newRes.push(item)
                        }
                    });
                }
                tree(res);
                that.categoryData = newRes;
            })
            let Prices = JSON.parse(sessionStorage.getItem("PriceDatas") || false);
            if(Prices){
                that.dataForm.IsHoliday = Prices.IsHoliday;
                that.dataForm.HolidayTips = Prices.HolidayTips;
                that.dataForm.CategoryId = Prices.CategoryId || "";
                that.dataForm.Sort = Prices.Sort;
                that.dataForm.SellPercent = Prices.SellPercent;
                that.dataForm.MarketPercent = Prices.MarketPercent;
                that.dataForm.ShiftPercent = Prices.ShiftPercent;
                that.dataForm.PriceId = Prices.PriceId;
                //判断是否有商品有商品ID获取商品
                if(Prices.FlowerId){
                    that.dataForm.FlowerId = Prices.FlowerId;
                    that.$axios.get(QueryFlowerDetail,{params:{id:Prices.FlowerId}}).then((res)=>{
                        that.Flowers.push(res.FlowerInfo)
                    })
                }
                //时间段转码;{Y,M,D,h,m,s}追加 赋值
                let SDate = formatDateString(Prices.StartDate);
                let Eate = formatDateString(Prices.EndDate);
                that.dataForm.EndDate = Eate;
                that.dataForm.StartDate = SDate;
                that.TimeSlot = [SDate,Eate]
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            let that = this;
            let typeId = that.$route.params.id;
            that.initialize();
            //路由判断
            if (typeId == "add" || typeId == "edit") {
                that.title_back = typeId == "edit" ? "修改价格比例" : "添加价格比例"
            } else {
                that.$router.push('/404');
            }
        })
    },
    filters: {
        thumbnail: function(value) {
            if (!value) return "";
            value = value.split(",")
            return value[0];
        }
    }
};
</script>
<style lang="less" scoped>
.produt-selet {
    display: flex;

    .produt-selet-item {
        cursor: pointer;
        width: 100px;
        height: 100px;
        position: relative;
        border-radius: 4px;
        overflow: hidden;

        &:hover .iconDelete {
            visibility: visible;
        }

        img {
            width: 100%;
            height: 100%;
        }

        .iconDelete {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            visibility: hidden;
        }
    }
}
</style>