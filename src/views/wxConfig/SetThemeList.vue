<!--  -->
<template>
  <div>
    <!--标题 -->
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Web/wxConfig/ThemeList' }">主题管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑主题</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--内容 -->
    <div class="hy-body-centent">
      <div class="hy-body-handle">
        <div class="el-card__header">
          <div class="clearfix">
            <span style="margin-right:10px">编辑主题</span>
          </div>
        </div>
        <el-row :gutter="20" style="margin:0;" v-loading="loading">
          <el-tabs v-model="activeName" editable @edit="handleTabsEdit" @tab-click="tabClick">
            <el-tab-pane label="基本设置" name="first">
              <el-form ref="form" :model="formData" label-width="100px">
                <el-form-item label="专区样式" class="rui-fromDiy-row">
                  <el-select
                    v-model="formData.Theme"
                    placeholder="专区样式"
                    style="width:100%;margin-bottom:10px"
                  >
                    <el-option
                      v-for="(item,index) in ThemeData"
                      :key="index"
                      :label="item.themeStr"
                      :value="item.theme"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="标题" class="rui-fromDiy-row">
                  <el-input v-model="formData.Title"></el-input>
                </el-form-item>
                <el-form-item label="排序" class="rui-fromDiy-row">
                  <el-input v-model="formData.Sort"></el-input>
                </el-form-item>
                <el-form-item label="是否显示" class="rui-fromDiy-row">
                  <el-switch v-model="formData.IsList"></el-switch>
                </el-form-item>
                <el-form-item label="描述" class="rui-fromDiy-row">
                  <el-input v-model="formData.Summary"></el-input>
                </el-form-item>
                <el-form-item label="背景" class="rui-fromDiy-row">
                  <el-input v-model="formData.Background"></el-input>
                </el-form-item>
                <el-form-item label="图片" class="rui-fromDiy-row">
                  <div class="floor-item" v-if="formData.ImgUrl">
                    <div class="product-sort-box">
                      <el-upload
                        ref="upload"
                        action="http://up-z2.qiniup.com"
                        :data="qiniuData"
                        accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PBG"
                        :before-upload="beforeAvatarUpload"
                        :auto-upload="true"
                        :file-list="fileList"
                        :on-error="uperror"
                        :on-remove="upRemove"
                        :on-success="upsuccess"
                        :on-exceed="exceedPic"
                        limit="1"
                        class="icon"
                      >
                        <div class="el-icon-upload"></div>
                      </el-upload>
                      <div class="icon el-icon-delete-solid" v-on:click.stop="formData.ImgUrl = ''"></div>
                    </div>
                    <img :src="formData.ImgUrl" class="max-img" />
                  </div>
                  <el-upload
                    v-else
                    ref="upload"
                    action="http://up-z2.qiniup.com"
                    :data="qiniuData"
                    accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PBG"
                    :before-upload="beforeAvatarUpload"
                    :auto-upload="true"
                    :file-list="fileList"
                    :on-error="uperror"
                    :on-remove="upRemove"
                    :on-success="upsuccess"
                    :on-exceed="exceedPic"
                    limit="1"
                  >
                    <el-button size="small" type="primary">上传图片</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item label="图片链接" class="rui-fromDiy-row">
                  <el-input v-model="formData.LinkUrl"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane
              v-for="(item, index) in Floors"
              :key="index"
              :label="'楼层'+(index+1)"
              :name="'floor'+index"
            >
              <!-- <span slot="label"><i class="el-icon-date"></i>楼层{{index+1}}</span> -->
              <el-form ref="floor" :model="formData" label-width="100px">
                <el-form-item label="专区操作" class="rui-fromDiy-row">
                    <!-- {{scope.row.SalePrice || scope.row.NowPrice}} -->
                    <el-button-group>
                      <el-button type="primary" icon="el-icon-upload2" @click="upward(index)" v-if="index!=0">上移</el-button>
                      <el-button type="primary" icon="el-icon-download" @click="down(index)" v-if="(index+1)!=Floors.length">下移</el-button>
                      <el-button type="primary" icon="el-icon-delete" @click="Floors.splice(index, 1)">删除</el-button>
                    </el-button-group>
                </el-form-item>
                <el-form-item label="图片" class="rui-fromDiy-row">
                  <div class="floor-item" v-if="item.ImgUrl">
                    <div class="product-sort-box">
                      <el-upload
                        ref="upload"
                        action="http://up-z2.qiniup.com"
                        :data="qiniuData"
                        accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PBG"
                        :before-upload="beforeAvatarUpload"
                        :auto-upload="true"
                        :file-list="fileList"
                        :on-error="uperror"
                        :on-remove="upRemove"
                        :on-success="upsuccess"
                        :on-exceed="exceedPic"
                        limit="1"
                        class="icon"
                      >
                        <div class="el-icon-upload"></div>
                      </el-upload>
                      <div class="icon el-icon-delete-solid" v-on:click.stop="item.ImgUrl = ''"></div>
                    </div>
                    <img :src="item.ImgUrl" class="max-img" />
                  </div>
                  <el-upload
                    v-else
                    ref="upload"
                    action="http://up-z2.qiniup.com"
                    :data="qiniuData"
                    accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PBG"
                    :before-upload="beforeAvatarUpload"
                    :auto-upload="true"
                    :file-list="fileList"
                    :on-error="uperror"
                    :on-remove="upRemove"
                    :on-success="upsuccess"
                    :on-exceed="exceedPic"
                    limit="1"
                  >
                    <el-button size="small" type="primary">上传图片</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item label="图片链接" class="rui-fromDiy-row">
                  <el-input v-model="item.LinkUrl"></el-input>
                </el-form-item>
                <el-form-item label="标题" class="rui-fromDiy-row">
                  <el-input v-model="item.Title"></el-input>
                </el-form-item>
                <el-form-item label="描述" class="rui-fromDiy-row">
                  <el-input v-model="item.Subtitle"></el-input>
                </el-form-item>
                <el-form-item label="商品">
                  <el-table :data="item.DataList" style="width: 100%" empty-text border>
                    <!-- <el-table-column prop="NowPrice" label="价格" width="80"></el-table-column> -->
                    <!-- <template slot-scope="scope">{{scope.row.Status?'下架':'上架'}}</template> -->
                    <el-table-column label="缩略图" width="80">
                      <template slot-scope="scope">
                        <img
                          :src="scope.row.SmImg || scope.row.ImgUrl +'?imageView2/2/w/100/h/100/q/100|imageslim'"
                          class="el-Flower-picture"
                          alt
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="Keywords" label="名称"></el-table-column>
                    <el-table-column label="价格" width="100">
                      <template slot-scope="scope">
                        {{scope.row.SalePrice || scope.row.NowPrice}}
                        <!-- <img :src="scope.row.SmImg || scope.row.ImgUrl" class="el-Flower-picture" alt> -->
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="text"
                          size="small"
                          v-if="scope.$index != 0"
                          @click="setSort(false,scope.$index,scope.$index-1)"
                        >上移</el-button>
                        <el-button
                          type="text"
                          size="small"
                          v-if="scope.$index != item.DataList.length -1"
                          @click="setSort(false,scope.$index,scope.$index+1)"
                        >下移</el-button>
                        <el-button
                          type="text"
                          size="small"
                          @click="setSort(false,scope.$index,scope.$index)"
                        >删除商品</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="table-add">
                    <el-button size="small" type="primary" @click="popProdut(index)">添加商品</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-row>
        <div class="btn-form">
          <el-form class="demo-ruleForm" label-width="100px">
            <el-form-item>
              <el-button type="primary" @click="saveTheme">提交保存</el-button>
              <el-button>
                <router-link to="/Web/wxConfig/ThemeList">取消</router-link>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 商品选择框 -->
    <el-dialog title="选择商品" :visible.sync="ProdutShow">
      <product :Flowers="Flowers" :show="ProdutShow" :SelectType="SelectType" @change="onSelect"></product>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ProdutShow = false">取 消</el-button>
        <el-button type="primary" @click="ProdutShow = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import product from "../../component/product/index";
import {
  QueToken,
  EditFlowerZone,
  QueryFlowerZoneDetail,
  QueryZoneTheme
} from "../../common/axios.config.js";
import { getQueryString } from "../../common/Util.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { product },
  data() {
    //这里存放数据
    return {
      activeName: "first",
      ThemeData: [],
      SelectType: true,
      formData: {
        Background: "",
        ImgUrl: "", //主题图片
        LinkUrl: "", //主题图片链接
        Summary: "", //主题描述
        Theme: "", //主题模板
        IsList: false, //是否显示首页
        Sort: 1, //排序
        ZoneId: 0,
        Title: "" //主题名称
      },
      //楼层
      Floors: [
        {
          DataList: [],
          ImgUrl: "",
          Subtitle: "标题",
          Title: "副标题"
        }
      ],
      ProdutShow: false, //商品选择框
      loading: false, //加载
      Flowers: [], //选中商品数据
      FloorsIndex: "first",
      fileList: [],
      qiniuData: {
        //上传七牛数据
        token: "",
        key: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //添加删除楼层
    handleTabsEdit(targetName, action) {
      var that = this;
      //添加楼层
      if (action === "add") {
        that.Floors.push({
          DataList: [],
          ImgUrl: "",
          Subtitle: "描述",
          Title: "标题"
        });
        that.activeName = "floor" + (that.Floors.length - 1);
      }
      //删除楼层
      if (action === "remove" && targetName != "first") {
        that.Floors.splice(targetName, 1);
        let index = that.Floors.length;
        if (!index) {
          that.activeName = "first";
        } else {
          that.activeName = "floor" + (that.Floors.length - 1);
        }
      }
    },
    //选择楼层
    tabClick(tab) {
      var that = this;
      that.FloorsIndex = tab.name.replace("floor", "");
    },
    //添加楼层
    // addFloor() {
    //   var that = this;
    //   that.Floors.push({
    //     DataList: [],
    //     ImgUrl: "",
    //     Subtitle: "标题",
    //     Title: "描述"
    //   });
    // },
    //设置主题
    setTheme(type, index) {
      //index 在等于2 的时候传入 楼层坐标
      var that = this;
      that.setDataType = type;
      if (type == 2) {
        that.FloorsIndex = index;
      }
    },
    //上移
    upward(index){
      const template = this.Floors;
      const upTemp = this.Floors[index-1];
      this.$set(template,index - 1,template[index])
      this.$set(template,index,upTemp)
      this.activeName = `floor${index-1}`;
    },
    //下移
    down(index){
      const template = this.Floors;
      const downTemp = this.Floors[index+1];
      this.$set(template,index + 1,template[index])
      this.$set(template,index,downTemp)
      this.activeName = `floor${index+1}`;
    },
    //添加商品
    popProdut(index) {
      var that = this;
      that.FloorsIndex = index;
      that.Flowers = that.Floors[index].DataList;
      that.ProdutShow = true;
    },
    //商品选择回调
    onSelect(value) {
      var that = this,
        data = JSON.parse(JSON.stringify(value)),
        DataList = that.Floors[that.FloorsIndex].DataList;
      if (data.checked) {
        DataList.push({
              DataType:1,
              DataId: data.SkuId,
              ImgUrl: data.SmImg,
              Keywords:"",
              NowPrice: data.SalePrice,
              MarketPrice: data.MarketPrice,
              Title: data.Keywords,
        });
      } else {
        for (let i = 0; i < DataList.length; i++) {
          if (DataList[i].DataId == data.SkuId) {
            DataList.splice(i, 1);
            break;
          }
        }
      }
    },
    upsuccess(file) {
      let that = this,
        url = `https://image.huayixh.com/${file.key}`,
        tabIndex = that.FloorsIndex;
      //判断点击图片上传什么位置
      if (tabIndex == "first") {
        that.formData.ImgUrl = url;
      } else {
        that.Floors[tabIndex].ImgUrl = url;
      }
      //清空上传文件
      that.fileList = [];
    },
    uperror() {
      this.$message.error("上传失败");
    },
    exceedPic() {
      this.$message.error("最多只能上传一张;请先删除一张");
    },
    // 上传此前获取Token
    beforeAvatarUpload: async function(file) {
      var that = this;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        that.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      } else {
        await that.$axios
          .get(QueToken, { params: { type: "theme" } })
          .then(res => {
            that.qiniuData.token = res.uptoken;
            that.qiniuData.key = res.saveKey;
          });
      }
    },
    //设置 index当前indexs下边另外一个下标
    setSort(type, index, indexs) {
      var that = this;
      //判断值 等于删除 小于下移 大于上移
      var Flowers = type ? that.Floors : that.Floors[that.FloorsIndex].DataList;
      if (index == indexs) {
        if (!type || that.Floors.length != 1) {
          Flowers.splice(index, 1);
          if (type) {
            that.FloorsIndex = parseInt(index) - 1;
          }
        }
      } else if (index > indexs) {
        Flowers[index] = Flowers.splice(indexs, 1, Flowers[index])[0];
      } else if (index < indexs) {
        Flowers[indexs] = Flowers.splice(index, 1, Flowers[indexs])[0];
      }
    },
    //保存主题
    saveTheme() {
      var that = this,
        Floors = JSON.parse(JSON.stringify(that.Floors));
      //主装商品数据
      Floors.forEach(function(item) {
        var newDataList = [];
        item.DataList.forEach(function(items) {
          newDataList.push({
            DataType: 1,
            DataId: items.SkuId || items.DataId
          });
        });
        item.DataList = newDataList;
      });
      var params = that.formData;
      params["Floors"] = Floors;
      that.$axios
        .post(EditFlowerZone, { jsonData: JSON.stringify(params) })
        .then(res => {
          if (res.Code == "200") {
            that.$message.success("编辑成功");
            that.$router.push("/Web/wxConfig/ThemeList");
          }
        });
    },
    QueryZoneTheme() {
      var that = this;
      that.$axios.post(QueryZoneTheme, {}).then(ret => {
        that.ThemeData = ret;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let that = this;
    that.$nextTick(function() {
      let zoneId = getQueryString("id");
      if (zoneId) {
        that.loading = true;
        that.$axios
          .post(QueryFlowerZoneDetail, { zoneId: zoneId })
          .then(res => {
            if (res) {
              that.loading = false;
              that.formData = {
                ImgUrl: res.ImgUrl,
                Background: res.Background,
                Summary: res.Summary,
                LinkUrl: res.LinkUrl,
                IsList: res.IsList,
                Sort: res.Sort,
                Theme: res.Theme,
                Title: res.Title,
                ZoneId: res.ZoneId
              };
              that.Floors = res.FloorDetails;
            }
          });
      }
      that.QueryZoneTheme();
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
// .theme-box {
//   width: 400px;
//   display: inline-block;
//   margin-right: 30px;
//   vertical-align: top;
// }
// .theme-box-set {
//   width: 500px;
//   display: inline-block;
//   vertical-align: top;
//   background-color: #f6f6f6;
//   padding: 20px;
//   border-radius: 4px;
//   margin-top: 150px;
// }
// .theme-input {
//   width: 370px;
//   height: 35px;
//   display: block;
//   font-weight: bold;
//   padding: 0 15px;
//   border-radius: 4px;
//   border: 1px solid #dcdfe6;
//   outline: none;
//   margin-bottom: 10px;
// }
// .theme-mobil {
//   width: 100%;
//   border-radius: 4px;
//   border: 1px solid #dcdfe6;
//   outline: none;
//   height: 500px;
//   overflow: hidden;
//   overflow-y: auto;
//   padding: 10px;
// }
// .theme-img {
//   width: 100%;
//   background-color: #f2f2f2;
//   margin-bottom: 10px;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.7;
//   }
//   img {
//     width: 100%;
//     vertical-align: top;
//     height: auto;
//   }
// }
// .floor-add {
//   margin-top: 10px;
//   height: 50px;
//   line-height: 50px;
//   text-align: center;
//   background-color: #f4f4f4;
//   font-size: 34px;
//   color: #ccc;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.7;
//   }
// }
.floor-item {
  cursor: pointer;
  position: relative;
  &:hover .product-sort-box {
    visibility: visible;
  }
  .product-sort-box {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    visibility: hidden;
    height: 40px;
    width: 150px;
    background-color: #f2f2f2;
    border-radius: 10px 0 0 0;
    .icon {
      flex: 1;
      text-align: center;
      line-height: 40px;
      font-size: 24px;
      font-weight: bold;
    }
  }
}
// .floor-title {
//   font-size: 18px;
//   font-weight: bold;
//   color: #fff;
//   text-align: center;
//   padding-top: 10px;
// }
// .floor-des {
//   font-size: 14px;
//   color: #fff;
//   text-align: center;
//   padding: 5px 0;
// }
// .floor-product {
//   padding: 0 10px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   .floor-product-img {
//     width: 170px;
//     height: 170px;
//     border-radius: 4px;
//     margin-bottom: 10px;
//     // &:nth-child(2n) {
//     //   margin-left:10px;
//     // }
//   }
// }
// .floor-product-set {
//   display: flex;
//   flex-wrap: wrap;
//   .floor-product-item {
//     width: 100px;
//     height: 100px;
//     position: relative;
//     border-radius: 4px;
//     overflow: hidden;
//     margin: 0 10px 10px 0;
//     cursor: pointer;
//     &:hover .product-sort-box {
//       visibility: visible;
//     }
//     .floor-img {
//       width: 100%;
//       height: 100px;
//       vertical-align: top;
//     }
//     .product-sort-box {
//       position: absolute;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       background-color: rgba(0, 0, 0, 0.7);
//       display: flex;
//       visibility: hidden;
//       .icon {
//         flex: 1;
//         text-align: center;
//         line-height: 100px;
//         font-size: 24px;
//         font-weight: bold;
//         color: #fff;
//       }
//     }
//   }
// }
</style>