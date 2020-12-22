<template>
  <div>
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>评论列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="hy-search-box">
      <el-form
        :inline="true"
        :model="searchData"
        ref="searchData"
        size="small"
        class="demo-form-inline"
      >
        <el-form-item label="评论状态:">
          <el-select v-model="searchData.CommentStatus" placeholder="请选择评论状态">
            <el-option
              v-for="(item,index) in categoryData"
              :key="index"
              :label="item.valueStr"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
           <el-form-item label="数据类型:">
            <el-select v-model="searchData.DataType" placeholder="类型">
             <el-option label="空" value=""></el-option>
             <el-option label="鲜花" :value="0"></el-option>
             <el-option label="SKU" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品ID:">
          <el-input placeholder="商品ID" v-model="searchData.DataId"></el-input>
        </el-form-item>
        <el-form-item label="用户名称:">
          <el-input placeholder="用户名称" v-model="searchData.NickName"></el-input>
        </el-form-item>
        <el-form-item label="订单号:">
          <el-input placeholder="订单号" v-model="searchData.OrderId"></el-input>
        </el-form-item>
        <el-form-item label="是否置顶:">
           <el-select v-model="searchData.IsTop" placeholder="置顶">
             <el-option label="无" value=""></el-option>
             <el-option label="否" :value="false"></el-option>
             <el-option label="是" :value="true"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否热评:">
            <el-select v-model="searchData.IsHost" placeholder="热评">
             <el-option label="无" value=""></el-option>
             <el-option label="否" :value="false"></el-option>
             <el-option label="是" :value="true"></el-option>
          </el-select>
        </el-form-item>
     
        <el-form-item>
          <el-button type="primary" size="small" @click="queryPrice">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="hy-body-centent" v-loading="loading">
      <el-table :data="listeners" style="width: 100%">
        <el-table-column prop="CommentId" label="ID" width="100px"></el-table-column>
        <el-table-column label="用户名">
          <template slot-scope="scope">
            <div class="user-warp">
              <img :src="scope.row.HeadImg+'?imageView2/1/w/40'" alt />
              <div class="user-name">
                <p>{{scope.row.NickName}}</p>
                <span class="hideName" v-if="scope.row.IsHideName">匿名</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="DataTitle" label="商品名称"></el-table-column>
        <el-table-column label="评论内容">
          <template slot-scope="scope">
            <p>{{scope.row.Content}}</p>
            <p>
              <span class="label-block comt-hot" v-if="scope.row.IsHost">热评</span>
              <span class="label-block comt-reply" v-if="scope.row.IsTop">置顶</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="评论图片">
          <template slot-scope="scope">
            <a
              v-for="(item,index) in scope.row.ImgUrl"
              :key="index"
              :href="item"
              style="margin-right:10px"
            >
              <img :src="item+'?imageView2/1/w/50'" width="50px;" />
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="CommentStatusStr" label="状态" width="100px"></el-table-column>
        <el-table-column prop="InsertDate" label="时间" width="157px"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editState(scope.row)">更新状态</el-button>
            <el-button type="text" size="small" @click="setTop(scope.row)">置顶</el-button>
            <el-button type="text" size="small" @click="setHot(scope.row)">热评</el-button>
            <el-button type="text" size="small" @click="seeReply(scope.row)">回复列表</el-button>
            <el-button type="text" size="small" @click="addReply(scope.row)">回复</el-button>
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
    <!-- 更新状态 -->
    <el-dialog title="更新状态" :visible.sync="isUpdateCommentState" width="30%">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="状态">
          <el-select v-model="editStatusValue" placeholder="请选择评论状态">
            <el-option
              v-for="(item,index) in categoryData"
              :key="index"
              :label="item.valueStr"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isUpdateCommentState = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdateState">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 回复列表 -->
    <el-dialog title="回复列表" :visible.sync="isReplyList" width="50%">
        <el-table :data="replyList" style="width: 100%"  v-loading="loadingReply">
                    <el-table-column prop="ReplyId" label="ID" width="100px"></el-table-column>
                    <el-table-column label="用户">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="isReplyList = false">取 消</el-button>
        <el-button type="primary" @click="isReplyList = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  QueryCommentStatus,
  CommentList,
  UpdateCommentStatus,
  UpdateCommentIsTop,
  ReplyList,
  UpdateCommentIsHost
} from "../../common/axios.config.js";
export default {
  data() {
    return {
      commentId: "", //评论ID
      editStatusValue: "", //更新状态选中值
      isReplyList:false,
      loadingReply:false,
      isUpdateCommentState: false, //更新状态弹窗
      searchData: {
        CommentStatus: "",
        DataId: "",
        DataType: "",
        IsHost: "",
        IsTop: "",
        NickName: "",
        OrderId: "",
        PageSize: 10, //每页大小
        PageIndex: 1 //页码
      },
      categoryData: [],
      pageTotal: "", //总数
      replyList:[],//回复列表
      listeners: [] //列表数据
    };
  },
  methods: {
    //重置
    resetForm() {
      this.searchData = {
        CommentStatus: "",
        DataId: "",
        DataType: "",
        IsHost: false,
        IsTop: false,
        NickName: "",
        OrderId: ""
      };
    },
    //分页
    handleCurrentChange(index) {
      this.searchData.PageIndex = index;
      this.initialize();
    },
    //获取查询评论状态
    axiosOther() {
      let that = this;
      that.$axios.post(QueryCommentStatus, {}).then(res => {
        that.categoryData = res;
      });
    },
    queryPrice() {
      this.searchData.PageIndex = 1;
      this.initialize();
    },
    //列表请求
    initialize() {
      let that = this,
        params = JSON.parse(JSON.stringify(this.searchData));
      that.loading = true;
      params.IsHost = params.IsHost?true:"";
      params.IsTop = params.IsTop?true:"";
      that.$axios.get(CommentList, { params }).then(res => {
        that.loading = false;
        that.pageTotal = res.AllCount;
        that.listeners = res.Data;
      });
    },
    //更新状态
    editState(item) {
      this.commentId = item.CommentId;
      this.editStatusValue = "";
      this.isUpdateCommentState = true;
    },
    //修改状态
    confirmUpdateState() {
      let that = this;
      if (!that.editStatusValue) {
        return that.$message.warning("选择状态");
      } else {
        that.$axios
          .post(UpdateCommentStatus, {
            commentId: that.commentId,
            commentStatus: that.editStatusValue
          })
          .then(res => {
            if (res) {
              that.$message.success("修改成功");
              that.initialize();
              this.isUpdateCommentState = false;
            }
          });
      }
    },
    //设置置顶
    setTop(item){
        let that = this;
        let title = item.IsTop ?"取消置顶":"置顶";
        let IsTop =  item.IsTop?0:1;
         that.$confirm("确认"+title, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          that.$axios.post(UpdateCommentIsTop, {
            commentId: item.CommentId,
            isTop: IsTop
          }).then(res => {
            if (res) {
              that.$message.success(title+"成功");
              item.IsTop = !item.IsTop;
            }
          });
        }).catch(() => {});
    },
    //设置热评
    setHot(item){
        let that = this;
        let title = item.IsHost ?"取消热评":"热评";
        let IsHost =  item.IsHost?0:1;
         that.$confirm("确认"+title, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
   that.$axios.post(UpdateCommentIsHost, {
            commentId: item.CommentId,
            isHot: IsHost
          }).then(res => {
            if (res) {
              that.$message.success(title+"成功");
              item.IsHost = !item.IsHost;
            }
          });
        }).catch(() => {});
    },
    // 回复列表
    seeReply(item){
       let that = this;
          that.isReplyList = true;
            that.loadingReply = true;
            that.$axios.post(ReplyList, {
                commentId: item.CommentId
            }).then(res => {
                that.loadingReply = false;
                for(let i = 0;i<res.Data.length;i++){
                  res.Data[i].ReplyImgUrl = res.Data[i].ReplyImgUrl.split(',')
                }
                that.replyList = res.Data;
             
            });
    },
    // 添加回复
    addReply(item){
        this.$router.push(`/Web/component/addReply?id=${item.CommentId}`);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initialize();
      this.axiosOther();
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
    width: 50px;
    height: 50px;
    border-radius: 50px;
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