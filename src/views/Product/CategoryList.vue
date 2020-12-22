<template>
    <div>
        <div class="hy-body-title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>商品分类
                    <el-button size="small" @click="SetCategory" icon="el-icon-circle-plus"  type="danger">添加分类</el-button>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="hy-body-centent">
            <el-row v-loading="loading" :gutter="20">
                <el-tree :data="CategoryList" node-key="CategoryId" :props="defaultProps" :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
        <span> <img :src="data.ImgUrl+'?imageView2/1/w/30/h/30'" class="tree-images" v-if="data.ImgUrl"> {{ node.label }} <input type="text" class="tree-input" v-model="data.Sort" @blur="SortBlur(data)" /><el-tooltip class="item" effect="dark" content="权重越高排名越高否则按最新排序" placement="right">
                            <i class="el-icon-question" style="margin-left:8px;"></i>
                        </el-tooltip></span>
                    <span>
          <el-button type="text" size="mini" @click="categoryEdit(data)">修改</el-button>
          <el-button type="text" size="mini" @click="categoryDel(data)">删除</el-button>
        </span>
                    </span>
                </el-tree>
            </el-row>
        </div>
    </div>
</template>
<style lang="less" scoped>

</style>
<script>
import { QueryCategoryList, DelCategory, EditCategory } from '../../common/axios.config.js'
export default {
    data() {
        return {
            CategoryList: [], //分类数据
            defaultProps: {
                children: 'Children',
                label: 'CategoryName'
            },
            // dialogFormVisible: false, //dialog 显示
            loading: true //加载动画
        }
    },
    components: {

    },
    methods: {
        categoryDel(el) {
            let that = this;
            that.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    categoryId: el.CategoryId
                }
                that.$axios.post(DelCategory, params).then((res) => {
                    if (res) {
                       that.$message({
                            message: "删除成功",
                            type: 'success'
                        });
                        that.categoryInfo()
                    }
                }).catch(() => {});
            })
        },
        SetCategory() {
            this.$router.push('/Web/Product/SetCategory/add');
            sessionStorage.removeItem("categoryCurr")
        },
        categoryInfo() {
            let that = this;
            that.$axios.get(QueryCategoryList, { params: {} }).then((res) => {
                that.CategoryList = res;
                that.loading = false;
            })
        },
        categoryEdit(el) {
            sessionStorage.setItem("categoryCurr", JSON.stringify(el));
            this.$router.push('/Web/Product/SetCategory/add');
        },
        SortBlur(el) {
            let that = this;
            that.$axios.post(EditCategory, el).then((res) => {
                if (res.Code == 400) {
                    that.$message.error(res.Message);
                } else {
                    that.categoryInfo()
                }
            })

        }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.categoryInfo()
        })
    }
};
</script>