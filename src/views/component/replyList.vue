<template>
    <div>
        <div class="hy-body-title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/Web/component/componentList'}">返回上级</el-breadcrumb-item>
                <el-breadcrumb-item>回复列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="hy-search-box">
            <div class="hy-body-centent" v-loading="loading">
                <el-table :data="list" style="width: 100%">
                    <el-table-column prop="ReplyId" label="ID" width="100px"></el-table-column>
                    <el-table-column label="用户名">
                        <template slot-scope="scope">
                            <div class="user-warp">
                                <img :src="scope.row.ReplyHeadImg+'?imageView2/1/w/40'" alt />
                                <div class="user-name">
                                    <p>{{scope.row.ReplyNickName}}</p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="评论内容">
                        <template slot-scope="scope">
                            <p>{{scope.row.Content}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="评论图片">
                        <template slot-scope="scope">
                            <a
              v-for="(item,index) in scope.row.ReplyImgUrl"
              :key="index"
              :href="item"
              style="margin-right:10px"
            >
              <img :src="item+'?imageView2/1/w/50'" width="50px;" />
            </a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="InsertDate" label="时间" width="157px"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import {
    ReplyList
} from "../../common/axios.config.js";
import { getQueryString } from "../../common/Util.js";
export default {
    data() {
        return {
            loading: true,
            list: [] //列表数据
        };
    },
    methods: {
        //获取查询评论状态
        queryReplyList(CommentId) {
            let that = this;
            that.loading = true;
            that.$axios.post(ReplyList, {
                commentId: CommentId
            }).then(res => {
                that.loading = false;
                for(let i = 0;i<res.Data.length;i++){
                	res.Data[i].ReplyImgUrl = res.Data[i].ReplyImgUrl.split(',')
                }
                that.list = res.Data;
            });
        },
    },
    mounted() {
        this.$nextTick(() => {
            let id = parseInt(getQueryString("id"));
            this.queryReplyList(id);
        });
    },
    filters: {}
};
</script>
<style lang="less" scoped>
.user-warp {
    display: flex;
    align-items: center;

    img {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        margin-right: 10px;
    }

    .user-name {
        text-align: left;

        .hideName {
            font-size: 12px;
            line-height: 12px;
            padding: 4px 8px;
            border-radius: 2px;
            background: #909399;
            color: #fff;
        }
    }
}

.label-block {
    font-size: 12px;
    line-height: 12px;
    padding: 4px 8px;
    border-radius: 2px;
    // background: #909399;
    color: #fff;
    margin-right: 10px;
}

.comt-reply {
    background: #e6a23c;
}

.comt-hot {
    background: #f56c6c;
}
</style>