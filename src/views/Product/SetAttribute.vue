<template>
    <div>
        <div class="hy-body-title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/Web/Product/Attribute' }">商品属性</el-breadcrumb-item>
                <el-breadcrumb-item>{{title_back}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="hy-body-centent">
            <div class="hy-body-handle">
                <div class="el-card__header">
                    <div class="clearfix"><span>属性信息</span>
                    </div>
                </div>
                <el-row>
                    <el-col :span="12">
                        <el-form :model="AttributeInfo" ref="AttributeInfo" :rules="rules" label-width="100px" class="demo-ruleForm hui-from">
                            <el-form-item label="上级属性">
                                <el-select v-model="AttributeInfo.ParentId" placeholder="一级分类" :disabled="selectIs">
                                    <el-option label="一级属性" :value="0"></el-option>
                                    <el-option v-for="(item,index) in attributeObj" :label="item.AttributeName" :key="index" :value="item.AttributeId"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="属性名称" prop="AttributeName">
                                <el-input type="text" v-model="AttributeInfo.AttributeName" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="属性排序" prop="Sort">
                                <el-input type="text" v-model="AttributeInfo.Sort" autocomplete="off"></el-input>
                            </el-form-item>
                            <block v-show="AttributeInfo.ParentId != 0">
                                <el-form-item label="是否置顶">
                                    <el-switch v-model="AttributeInfo.IsTop"></el-switch>
                                </el-form-item>
                                <el-form-item label="属性图片">
                                    <el-upload ref="upload" action="http://up-z2.qiniup.com" list-type="picture-card" :data="qiniuData" accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PBG" :before-upload="beforeAvatarUpload" :file-list="fileList" :auto-upload="true" :on-error="uperror" :on-remove="upRemove" :on-success="upsuccess" :on-exceed="exceedPic" limit="1">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </el-form-item>
                            </block>
                        </el-form>
                    </el-col>
                </el-row>
                  <div class="btn-form" >
                            <el-form class="demo-ruleForm" label-width="120px">
<el-form-item>
                                <el-button type="primary" @click="submitForm">提交保存</el-button>
                                <el-button>
                                    <router-link to="/Web/Product/Attribute">取消</router-link>
                                </el-button>
                            </el-form-item>
                            </el-form>
                        </div>
            </div>
        </div>
    </div>
</template>
<script>
import { QueToken, EditAttribute, AttributeList } from '../../common/axios.config.js';
export default {
    data() {
        return {
            title_back: "",
            AttributeInfo: {
                ParentId: 0, //属性上级ID 0最上级
                AttributeName: '', //属性名称
                AttributeId: '', //属性ID
                IsTop: false, //是否置顶
                ImgUrl: '', //二级属性图片
                Sort: 1
            }, //属性对象
            rules: { //数据检验
                AttributeName: [
                    { required: true, message: '请输入属性名称', trigger: 'change' }
                ]
            },
            fileList: [], //图片数据
            qiniuData: { //上传七牛数据
                token: '',
                key: ''
            },
            selectIs: false, //设置分类是否可选择
            attributeObj: [] //属性数据
        }
    },
    methods: {
        upsuccess(file) {
            let url = `http://image.huayixh.com/${file.key}`;
            this.AttributeInfo.ImgUrl = url;
        },
        uperror() {
            this.$message.error('上传失败');
        },
        exceedPic() {
            this.$message.error('最多只能上传一张;请先删除一张');
        },
        upRemove() {
            this.AttributeInfo.ImgUrl = "";
        },
        // 上传此前获取Token
        beforeAvatarUpload: async function(file) {
            var that = this;
            // const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                that.$message.error('上传头像图片大小不能超过2MB!');
                return false;
            } else {
                await that.$axios.get(QueToken, { params: {"type":"attribute"} }).then((res) => {
                    that.qiniuData.token = res.uptoken;
                    that.qiniuData.key = res.saveKey;
                })
            }
        },
        submitForm() {
            let that = this;
            that.$refs["AttributeInfo"].validate((valid) => {
                if (valid) {
                    let params = that.AttributeInfo;
                    // if (!params.ImgUrl && params.ParentId != "0") {
                    //     this.$message.warning("请上传一张图片");
                    //     return false;
                    // }
                    that.$axios.post(EditAttribute, params).then((res) => {
                        if (res) {
                            that.$message.success("添加成功");
                            that.$router.push('/Web/Product/Attribute');
                        }
                    })
                }
            })
        }
    },
    mounted() {
        //params
        this.$nextTick(function() {
            let that = this;
            let typeId = that.$route.params.id,
                sessionData = JSON.parse(sessionStorage.getItem("attributeEdit") || false);
            that.$axios.get(AttributeList).then((res) => {
                that.attributeObj = res;
                if (sessionData) {
                    that.selectIs = !sessionData.ParentId ? true : false;
                    that.AttributeInfo = sessionData;
                    if(sessionData.ImgUrl){
                    that.fileList.push({ url: sessionData.ImgUrl })
                    }
                }
            })
            //路由判断
            if (typeId == "add" || typeId == "edit") {
                that.title_back = typeId == "add" ? "添加属性" : "编辑属性"
            } else {
                that.$router.push('/404');
            }
        })
    }
};
</script>
<style lang="less" scoped>

</style>