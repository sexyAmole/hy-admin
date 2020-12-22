<template>
    <div>
        <div class="hy-body-title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>属性设置
                   <el-button size="small" @click="AddAttribute" icon="el-icon-circle-plus"  type="danger">添加属性</el-button>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="hy-body-centent">
            <el-row v-loading="loading" :gutter="20">
                <el-tree :data="listeners" node-key="CategoryId" :props="defaultProps" :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
         <div>
          <img :src="data.ImgUrl+'?imageView2/1/w/60/h/30'" class="tree-images" v-if="data.ImgUrl">
          <span>{{ node.label }}</span>
                    <input type="text" class="tree-input" v-model="data.Sort" @blur="SortBlur(data)" />
                    <el-tooltip class="item" effect="dark" content="权重越高排名越高否则按最新排序" placement="right">
                        <i class="el-icon-question" style="margin-left:8px;"></i>
                    </el-tooltip>
        </div>
        <div>
            <el-button type="text" size="mini" @click="editor(data)">修改</el-button>
            <el-button type="text" size="mini" @click="intdelete(data)">删除</el-button>
        </div>
        </span>
        </el-tree>
        </el-row>
    </div>
    </div>
</template>
<style scoped lang="less">
</style>
<script>
import { AttributeList, DelAttribute, EditAttribute } from '../../common/axios.config.js';
export default {
    components: {

    },
    data() {
        return {
            listeners: [], //列表数据
            defaultProps: { //列表数据名称KEY值修改
                children: 'Children',
                label: 'AttributeName'
            },
            loading: false
        }
    },
    methods: {
        intdelete(el) {
            let that = this;
            that.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = {
                    attributeId: el.AttributeId
                }
                that.$axios.post(DelAttribute, params).then((res) => {
                    if (res) {
                        that.$message({
                            message: "删除成功",
                            type: 'success'
                        });
                        that.initialize()
                    }
                }).catch(() => {});
            })
        },
        AddAttribute() {
            this.$router.push('/Web/Product/SetAttribute/add');
            sessionStorage.removeItem("attributeEdit")
        },
        editor(el) {
            sessionStorage.setItem("attributeEdit", JSON.stringify(el));
            this.$router.push('/Web/Product/SetAttribute/edit');
        },
        SortBlur(el) {
            let that = this;
            that.$axios.post(EditAttribute, el).then((res) => {
                if (!res) {
                    that.$message.error(res.Message);
                } else {
                    that.$message.success("修改成功")
                    that.initialize()
                }
            })

        },
        initialize() {
            let that = this;
            that.loading = true;
            that.$axios.get(AttributeList, { params: {} }).then((res) => {
                that.listeners = res;
                that.loading = false;
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initialize();
        })
    }
};
</script>