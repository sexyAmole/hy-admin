<template>
    <div>
        <div class="hy-body-title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/Web/Product/CategoryList' }">商品分类</el-breadcrumb-item>
                <el-breadcrumb-item>{{setclsName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="hy-body-centent">
            <div class="hy-body-handle">
                <div class="el-card__header">
                    <div class="clearfix"><span>分类信息</span>
                    </div>
                </div>
                <el-row  class="rui-fromDiy-row">
                    <el-col :span="24">
                        <el-form :model="CategoryData" ref="CategoryData" :rules="rules" label-width="100px" class="demo-ruleForm hui-from">
                            <el-form-item label="上级分类">
                                <el-select v-model="CategoryData.ParentId" placeholder="一级分类" :disabled="selectIs">
                                    <el-option label="一级分类" :value="0"></el-option>
                                    <el-option v-for="(item,index) in CategoryList" :label="item.CategoryName" :key="index" :value="item.CategoryId"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="分类名称" prop="CategoryName">
                                <el-input type="text" v-model="CategoryData.CategoryName" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="分类排序">
                                <el-input type="text" v-model="CategoryData.Sort" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="节日设置">
                                <el-input type="text" placeholder="多个|分隔" v-model="CategoryData.Festival" autocomplete="off"></el-input>
                            </el-form-item>
                            <block v-if="CategoryData.ParentId != 0">
                                <el-form-item label="关联属性" prop="RelAttribute">
                                    <el-checkbox-group v-model="CategoryData.RelAttribute">
                                        <el-checkbox v-for="(item,index) in attributeData" :label="item.AttributeId.toString()" :key="index">{{item.AttributeName}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </block>
                                <el-form-item label="分类图片">
                                    <el-upload ref="upload" action="http://up-z2.qiniup.com" list-type="picture-card" :data="qiniuData" accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PBG" :before-upload="beforeAvatarUpload" :file-list="fileList" :auto-upload="true" :on-error="uperror" :on-remove="upRemove" :on-success="upsuccess" :on-exceed="exceedPic" limit="1">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                   <div class="btn-form" >
                            <el-form class="demo-ruleForm" label-width="120px">
<el-form-item>
                                <el-button type="primary" @click="submitForm">提交保存</el-button>
                                <el-button>
                                    <router-link to="/Web/Product/CategoryList">取消</router-link>
                                </el-button>
                            </el-form-item>
                            </el-form>
                        </div>
            </div>
        </div>
    </div>
</template>
<script>
import { QueToken, QueryCategoryList, EditCategory, AttributeList } from '../../common/axios.config.js'
export default {
    data() {
        return {
            CategoryList: [], //分类数据
            setclsName: '', //分类
            attributeData: [], //属性数据
            CategoryData: { //分类数据
                CategoryId: '', //分类ID
                CategoryName: '',
                ParentId: 0,
                Festival:'',//节日设置
                RelAttribute: [],
                ImgUrl: '', //二级分类图片
                Sort: 1
            },
            selectIs: false, //设置分类是否可选择
            fileList: [], //图片数据
            qiniuData: { //上传七牛数据
                token: '',
                key: ''
            },
            rules: { //验证数据
                CategoryName: [
                    { required: true, message: '请输入分类名称', trigger: 'change' }
                ]
                // RelAttribute: [
                //     { type: 'array', required: true, message: '请输入选择属性', trigger: 'change' }
                // ]
            }
        }
    },
    methods: {
        upsuccess(file) {
            let url = `http://image.huayixh.com/${file.key}`;
            this.CategoryData.ImgUrl = url;
        },
        uperror() {
            this.$message.error('上传失败');
        },
        exceedPic() {
            this.$message.error('最多只能上传一张;请先删除一张');
        },
        upRemove() {
            this.CategoryData.ImgUrl = "";
        },
        // 上传此前获取Token
        beforeAvatarUpload: async function(file) {
            var that = this;
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                that.$message.error('上传头像图片大小不能超过 2MB!');
                return false;
            } else {
                await that.$axios.get(QueToken, { params: {"type":"category" } }).then((res) => {
                    that.qiniuData.token = res.uptoken;
                    that.qiniuData.key = res.saveKey;
                })
            }
        },
        submitForm() {
            var that = this;
            that.$refs["CategoryData"].validate((valid) => {
                if (valid) {
                    let params = JSON.parse(JSON.stringify(that.CategoryData)) ;
                    if (!params.ImgUrl) {
                        that.$message.warning("请上传一张图片");
                        return false;
                    }
                    params.RelAttribute = params.RelAttribute.join(",");
                    that.$axios.post(EditCategory, params).then((res) => {
                        if (res) {
                            that.$message.success("添加成功");
                            that.$router.push('/Web/Product/CategoryList');
                        }
                    })
                }
            });
        }
    },
    mounted: function() {
        let that = this;
        that.$nextTick(function() {
            let typeId = that.$route.params.id,
                categoryCurr = JSON.parse(sessionStorage.getItem("categoryCurr") || false);
            that.$axios.get(QueryCategoryList).then((res) => {
                that.CategoryList = res;
                if (categoryCurr) {
                    categoryCurr.RelAttribute = categoryCurr.RelAttribute.split(",")
                    that.CategoryData = categoryCurr;
                    that.selectIs = !categoryCurr.ParentId ? true : false;
                     if(categoryCurr.ImgUrl){
                     that.fileList.push({ url: categoryCurr.ImgUrl })
                    }
                }
            })
            that.$axios.get(AttributeList).then((res) => {
                that.attributeData = res;
            })
            if (typeId == "add" || typeId == "edit") {
                that.setclsName = typeId == "add" ? "添加分类" : "编辑分类"
            } else {
                that.$router.push('/404');
            }
        })
    }
};
</script>
<style lang="less" scoped>
</style>