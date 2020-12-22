<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-10-22 10:23:03
 * @LastEditors: zsm
 * @LastEditTime: 2020-04-09 10:17:02
 -->
<!--  -->
<template>
  <div>
    <!--标题 -->
    <div class="hy-body-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Web/Order/SkuOrderList' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--内容 -->
    <div class="hy-body-centent" v-loading="loading">
      <el-form label-width="100px" class="demo-ruleForm hui-from">
        <div class="hy-content-warp">
          <div class="hy-card-warp">
            <div class="hy-card-title">订单号：{{baseInfo.OrderId}}</div>
            <div class="hy-card-content">
              <div class="hy-card-content-cell">
                <div class="cell-row">
                <div class="hy-cell-label">订单状态：</div>
                <div class="hy-cell-block danger-color">{{baseInfo.GoodsOrderStatusStr}}</div>
                </div>
                <div class="cell-row">
                <div class="hy-cell-label">下单时间：</div>
                <div class="hy-cell-block">{{baseInfo.InsertDate}}</div>
                </div>
              </div>
              <div class="hy-card-content-cell">
                <div class="cell-row">
                  <div class="hy-cell-label">下单电话：</div>
                  <div class="hy-cell-block bole-color" >
                  <router-link :to="'/Web/Member/MemberDetails?userId='+baseInfo.UserId">{{baseInfo.BuyerPhone}}</router-link>
                  </div>
                </div>
                <div class="cell-row">
                  <div class="hy-cell-label">配送时间：</div>
                <div class="hy-cell-block">{{baseInfo.SendDate}} {{baseInfo.DeliveryTimeStr}}</div>
                </div>
                </div>
              <div class="hy-card-content-cell" v-if="baseInfo.Remark">
                <div class="hy-cell-label">订单备注：</div>
                <div class="hy-cell-block warning-color">{{baseInfo.Remark}}</div>
              </div>
              <div class="hy-card-content-cell" v-if="baseInfo.Card">
                <div class="hy-cell-label">订单贺卡：</div>
                <div class="hy-cell-block warning-color">{{baseInfo.Card}}</div>
              </div>
              
            </div>
          </div>
          <div class="hy-card-warp">
            <div class="hy-card-title">
              <span>商品信息</span>
            </div>
            <div class="hy-card-content">
              <el-table :data="detailList" border style="width: 100%">
                <el-table-column label="选择" width="60" align="center">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.checked" @change="singleChange(scope.row)"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="商品">
                  <template slot-scope="scope">
                    <div class="detail-warp-inr">
                      <img
                        :src="scope.row.ImgUrl+'?imageView2/1/w/100/h/100'"
                        style="width:80px;height:80px;"
                      />
                      <div>
                        <p>明细ID：{{scope.row.DetailId}}</p>
                        <p v-if="scope.row.GoodsId">商品ID：{{scope.row.GoodsId}}</p>
                        <p v-if="scope.row.SkuId">SUKID：{{scope.row.SkuId}}</p>
                        <p>{{scope.row.GoodsName}}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="数量" width="80" prop="PayCount"></el-table-column>
                <el-table-column label="单价" width="80" prop="SinglePrice"></el-table-column>
                <el-table-column label="总价" width="80" prop="SubtotalPrice"></el-table-column>
                <!-- <el-table-column label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="small"
                      v-if="baseInfo.GoodsOrderStatus == 3"
                      style="margin-left:10px"
                      @click="sendParcel(scope.row)"
                    >发包裹</el-button>
                  </template>
                </el-table-column> -->
              </el-table>
              <div style="margin: 10px 10px 0 10px;">
                <el-checkbox
                  v-model="allExpressChecked"
                  @change="allChecked()"
                  style="margin-right:10px"
                >全选</el-checkbox>
                <el-button @click="allSendParcel()">发包裹</el-button>
              </div>
            </div>
          </div>
          <div class="hy-card-warp">
            <div class="hy-card-title">
              <span>包裹信息</span>
              <el-button
                type="primary"
                size="small"
                v-if="baseInfo.GoodsOrderStatus == 3"
                style="margin-left:10px"
                @click="confirmDelivery"
              >确认发货</el-button>
            </div>
            <div class="hy-card-content">
              <el-table :data="PackageLists" border style="width: 100%">
                <el-table-column label="包裹类型" width="100" prop="ExpressTypeStr"></el-table-column>
                <el-table-column label="商品">
                  <template slot-scope="scope">
                    <!-- class="detail-warp" -->
                    <div
                      class="detail-warp-inr"
                      v-for="(item,index) in scope.row.Details"
                      :key="index"
                    >
                      <img
                        :src="item.ImgUrl+'?imageView2/1/w/100/h/100'"
                        style="width:80px;height:80px;"
                      />
                      <div>
                        <p>运单ID：{{item.WaybillId}}</p>
                        <p>明细ID：{{item.DetailId}}</p>
                        <p v-if="item.SkuId">SUKID：{{item.SkuId}}</p>
                        <p>{{item.GoodsName}}</p>
                      </div>
                      <!-- <span>{{item.GoodsId}}</span>
                      <span>{{item.SkuId}}</span>-->
                      <!-- <p class="title">{{item.GoodsName}}</p> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="数量" width="80" prop="GoodsCount"></el-table-column>
                <el-table-column label="快递公司" width="100" prop="DeliveryName"></el-table-column>
                <!-- <el-table-column label="运单ID" width="80" prop="WaybillId"></el-table-column> -->
                <el-table-column label="包裹状态" width="100" prop="PackageStatus"></el-table-column>
                <!-- <el-table-column label="总价" width="130" align="center" prop="SubtotalPrice"></el-table-column> -->
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button-group>
                      <el-button
                        type="primary"
                        size="mini"
                        :loading="refreshState"
                        icon="el-icon-refresh-right"
                        @click="refreshParcel(scope.row.PackageId)"
                      >刷新</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        :loading="pushState"
                        icon="el-icon-upload2"
                        @click="pushHuawa(scope.row.PackageId)"
                        v-if="scope.row.ExpressType == 2 && scope.row.PackageStatus == '待发货'"
                      >推送</el-button>
                      <!-- <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-delete"
                        @click="delParcel(scope.row.PackageId)"
                      >删除</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-delete"
                        @click="trajectory(scope.row)"
                      >轨迹</el-button> -->
                    </el-button-group>
                    <el-button-group style="margin-top:10px">
                      <el-button
                        type="primary"
                        size="mini"
                       
                        icon="el-icon-delete"
                        @click="delParcel(scope.row.PackageId)"
                      >删除</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-delete"
                        @click="trajectory(scope.row)"
                      >轨迹</el-button>
                    </el-button-group>
                    
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="hy-card-warp">
            <div class="hy-card-title">
              <span>收货人信息</span>
            </div>
            <div class="hy-card-content">
              <div class="hy-card-content-cell">
                <div class="hy-cell-label">收货人姓名：</div>
                <div class="hy-cell-block">{{baseInfo.LinkName}}</div>
              </div>
              <div class="hy-card-content-cell">
                <div class="hy-cell-label">收货人地址：</div>
                <div
                  class="hy-cell-block"
                >{{baseInfo.Province}} {{baseInfo.City}} {{baseInfo.Country}} {{baseInfo.LinkAddress}}</div>
              </div>
              <div class="hy-card-content-cell">
                <div class="hy-cell-label">收货人电话：</div>
                <div class="hy-cell-block">{{baseInfo.LinkPhone}}</div>
              </div>
            </div>
          </div>
          <div class="hy-card-warp">
            <div class="hy-card-title">
              <span>客户端物流踪迹</span>
            </div>
            <div class="hy-card-content" style="padding:10px 15px" v-if="clientLogList.length">
              <el-timeline :reverse="reverse">
                <el-timeline-item
                  v-for="(activity, index) in clientLogList"
                  :key="index"
                  :timestamp="activity.InsertDate"
                >{{activity.Content}}</el-timeline-item>
              </el-timeline>
            </div>
            <div class="hy-empty" v-else>没有服务端物流踪迹</div>
          </div>
          <div class="hy-card-warp">
            <div class="hy-card-title">
              <span>服务端物流踪迹</span>
            </div>
            <div class="hy-card-content" style="padding:10px 15px" v-if="serviceLogList.length">
              <el-timeline :reverse="reverse">
                <el-timeline-item
                  v-for="(activity, index) in serviceLogList"
                  :key="index"
                  :timestamp="activity.InsertDate"
                >{{activity.Content}}</el-timeline-item>
              </el-timeline>
            </div>
            <div class="hy-empty" v-else>没有服务端物流踪迹</div>
          </div>
          <!-- <div class="hy-card-warp">
            <div class="hy-card-title">
              <span>商品包裹信息</span>
              <el-button
                type="primary"
                size="small"
                v-if="baseInfo.GoodsOrderStatus == 3"
                style="margin-left:10px"
                @click="confirmDelivery"
              >确认发货</el-button>
            </div>
            <div class="hy-card-content">
              <el-table :data="detailList" border style="width: 100%">
                <el-table-column label="选择" width="60" align="center">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.checked" @change="singleChange(scope.row)"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="商品信息" width="130">
                  <template slot-scope="scope">
                    <div class="detail-warp">
                      <img
                        :src="scope.row.ImgUrl+'?imageView2/1/w/100/h/100'"
                        style="width:80px;height:80px;"
                      />
                      <p class="title">{{scope.row.GoodsName}}</p>
                      <p class="price">数量：* {{scope.row.PayCount}}</p>
                      <p class="price">{{scope.row.SubtotalPrice}}</p>
                      <p
                        class="btn bole-color"
                        v-if="baseInfo.GoodsOrderStatus == 3"
                        @click="sendParcel(scope.row)"
                      >发包裹</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="包裹" prop="GoodsName">
                  <template slot-scope="scope">
                    <el-collapse
                      accordion
                      value="1"
                      v-if="PackageList[scope.row.DetailId] && PackageList[scope.row.DetailId].length"
                    >
                      <el-collapse-item
                        v-for="(item,index) in PackageList[scope.row.DetailId]"
                        :key="index"
                        :name="index+1+''"
                      >
                        <template slot="title">
                          <el-button-group style="margin-left:15px">
                            <el-button
                              type="primary"
                              size="mini"
                              icon="el-icon-refresh-right"
                              @click="refreshParcel(item.PackageId)"
                            >刷新</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              icon="el-icon-upload2"
                              @click="pushHuawa(item.PackageId)"
                              v-if="item.ExpressType == 2 && item.PackageStatus == '待发货'"
                            >推送</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              icon="el-icon-delete"
                              @click="delParcel(item.PackageId)"
                            >删除</el-button>
                          </el-button-group>
                          <span style="margin-left:5px">{{item.ExpressTypeStr}}</span>
                          <span style="margin-left:5px">{{item.PackageId}}</span>
                          <span style="margin-left:5px">{{item.PackageStatus}}</span>
                          <span style="margin-left:5px">运单id：{{item.WaybillId}}</span>
                          <span style="margin-left:5px">公司id：{{item.DeliveryId}}</span>
                          <span style="margin-left:5px">名称:{{item.DeliveryName}}</span>
                        </template>
                        <div class="scroll-x">
                          <div v-for="(el,idx) in item.Path" :key="idx" class="log-warp">
                            <span class="log-label">{{el.Time | datetiemr}}</span>
                            <span class="log-content">{{el.Content}}</span>
                          </div>
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                    <div class="hy-empty" v-else>没有包裹</div>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin: 10px 10px 0 10px;">
                <el-checkbox
                  v-model="allExpressChecked"
                  @change="allChecked()"
                  style="margin-right:10px"
                >全选</el-checkbox>
                <el-button @click="allSendParcel()">发包裹</el-button>
              </div>
            </div>
          </div>-->
        </div>
      </el-form>
    </div>
    <!-- 发送包裹 -->
    <el-dialog title="创建包裹" :visible.sync="isExpress" width="800px">
      <div class="product-expr-warp">
        <div class="product-expr-item" v-for="(item,index) in isExpressName" :key="index">
          <img :src="item.ImgUrl" width="40" />
          <span>{{item.GoodsName}}</span>
        </div>
      </div>

      <el-form :model="express" label-width="100px" class="demo-ruleForm">
        <!-- 选择物流 快递公司-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="快递类型">
              <el-select v-model="express.ExpressType" placeholder="服务类型">
                <el-option
                  v-for="(item,index) in expressType"
                  :key="index"
                  :label="item.valueStr"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="express.ExpressType">
            <el-form-item label="三方订单号">
              <el-input v-model="express.WaybillId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务类型" v-if="!express.ExpressType">
              <el-select v-model="express.ServiceType" placeholder="服务类型">
                <el-option
                  v-for="(item,index) in expressService"
                  :key="index"
                  :label="item.valueStr"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="快递公司" v-if="!express.ExpressType">
              <el-select v-model="express.DeliveryId" placeholder="快递公司">
                <el-option
                  v-for="(item,index) in expressDelivery"
                  :key="index"
                  :label="item.valueStr"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="快递公司ID" v-if="express.ExpressType">
              <el-input v-model="express.DeliveryId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="快递公司名称" v-if="express.ExpressType">
              <el-input v-model="express.DeliveryName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="省" v-if="express.ExpressType">
              <el-input v-model="express.SendProvince"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="市" v-if="express.ExpressType">
              <el-input v-model="express.SendCity"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区" v-if="express.ExpressType">
              <el-input v-model="express.SendCountry"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 包裹信息 -->
        <el-row v-if="!express.ExpressType">
          <el-col :span="12">
            <el-form-item label="包裹长度">
              <el-input v-model="express.SpaceX" type="Number">
                <span slot="append">cm</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="包裹宽度">
              <el-input v-model="express.SpaceY" type="Number">
                <span slot="append">cm</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="包裹高度">
              <el-input v-model="express.SpaceZ" type="Number">
                <span slot="append">cm</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="包裹重量">
              <el-input v-model="express.Weight" type="Number">
                <span slot="append">cm</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="包裹数量">
              <el-input v-model="express.Count" type="Number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 微信配置 -->
        <el-row v-if="!express.ExpressType">
          <el-col :span="12">
            <el-form-item label="是否保价">
              <el-switch v-model="express.UseInsured"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="express.UseInsured">
            <el-form-item label="保价金额">
              <el-input v-model="express.InsuredValue" type="Number">
                <span slot="append">分</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="揽件时间">
              <el-date-picker v-model="express.ExpectTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input v-model="express.Remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isExpress = false">取 消</el-button>
        <el-button type="primary" @click="expressEdit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="包裹轨迹" :visible.sync="isTrajectory" width="800px">
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in trajectoryList"
          :key="index"
          :timestamp="activity.Time"
        >{{activity.Content}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  OrderDetail,
  ConfirmShip,
  GoodsPackagePathRefresh,
  DelGoodsPackage,
  QueryExpressService,
  QueryDelivery,
  QueryExpressType,
  CreateGoodsPackage,
  GoodsPackage2Huawa
} from "../../common/axios.config.js";
import { getQueryString, FormatDate } from "../../common/Util.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      loading: true,
      isTrajectory: false, //弹出轨迹
      trajectoryList: [], //轨迹对象
      baseInfo: {}, //基本信息
      detailList: [], //商品详细
      clientLogList: [], //客户端log
      isExpressName: [], //发送包裹商品名称
      serviceLogList: [], //服务端log
      PackageList: {}, //包裹物流
      PackageLists: [], //包裹信息
      expressService: [], // 快递服务
      expressType: [], // 快递类型
      expressDelivery: [], // 快递公司
      isExpress: false, //发送包裹弹窗
      allExpressChecked: false, //全选发送包裹
      refreshState:false,
      pushState:false,
      express: {
        Count: 1, // 包裹数量
        DeliveryId: "", // 快递公司id
        DeliveryName: "", // 快递公司名称
        ExpectTime: "", // 预期揽件时间
        DetailId: "", //明细id
        ExpressType: 1, // 快递类型
        InsuredValue: "", // 保价金额 单位是分，比如: 10000 表示 100 元
        OrderId: "", //
        Remark: "", // 备注
        ServiceName: "", // 服务类型名称
        ServiceType: "", // 服务类型
        SpaceX: "", //包裹长度，单位厘米(cm)
        SpaceY: "", //包裹宽度，单位厘米(cm)
        SpaceZ: "", // 包裹高度，单位厘米(cm)
        UseInsured: 0, // 是否保价 0:否，1：是
        WaybillId: "", // 运单id
        SendCity: "", // 发货所在城市
        SendCountry: "", // 发货所在城市
        SendProvince: "", // 发货所在城市
        Weight: "" //  包裹总重量，单位是千克(kg)
      } // 物流信息
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //请求明细
    queryDetailInfo() {
      const that = this;
      that.loading = true;
      that.$axios
        .post(OrderDetail, { orderId: that.express.OrderId })
        .then(ret => {
          that.loading = false;
          that.baseInfo = ret.Data.BaseInfo;
          that.detailList = that.setChecked(ret.Data.DetailList, false);
          that.clientLogList = ret.Data.ClientLogList;
          that.serviceLogList = ret.Data.ServiceLogList;
          that.PackageLists = ret.Data.PackageList;
          that.PackageList = that.usParcelAndDetail(
            ret.Data.DetailList,
            ret.Data.PackageList
          );
        });
    },
    //显示轨迹
    trajectory(el) {
      this.trajectoryList = el.Path;
      this.isTrajectory = true;
    },
    userInfo(UserId) {
      this.$router.push(`/Web/Member/MemberDetails?userId=${UserId}`);
    },
    //确认发货完成
    confirmDelivery() {
      const self = this;
      self
        .$confirm("确认发货完成, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          self.$axios
            .post(ConfirmShip, {
              orderId: self.baseInfo.OrderId
            })
            .then(ret => {
              if (ret) {
                self.queryDetailInfo();
                self.$message.success(ret.Message);
              }
            });
        })
        .catch(() => {});
    },
    //组合包裹和商品数据
    usParcelAndDetail(detail, parcel) {
      const newParcel = {};
      for (let i = 0; i < detail.length; i++) {
        for (let x = 0; x < parcel.length; x++) {
          const details = parcel[x].Details;
          for (let j = 0; j < details.length; j++) {
            if (details[j].DetailId == detail[i].DetailId) {
              if (newParcel[details[j].DetailId]) {
                newParcel[details[j].DetailId].push(parcel[x]);
              } else {
                newParcel[details[j].DetailId] = [parcel[x]];
              }
            }
          }
        }
      }
      return newParcel;
    },
    //刷新包裹
    refreshParcel(packageId) {
      const self = this;
      self.refreshState = true;
      self.$axios
        .post(GoodsPackagePathRefresh, {
          packageId: packageId
        })
        .then(ret => {
          self.refreshState = false;
          if (ret) {
            self.queryDetailInfo();
            self.$message.success(ret.Message);
          }
        });
    },
    //删除包裹
    delParcel(packageId) {
      const self = this;
      self
        .$confirm("确认删除包裹, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          self.$axios
            .post(DelGoodsPackage, {
              packageId: packageId
            })
            .then(ret => {
              if (ret) {
                self.$message.success(ret.Message);
                self.queryDetailInfo();
              }
            });
        })
        .catch(() => {});
    },
    //推送到花娃
    pushHuawa(packageId) {
      const self = this;
     
      self
        .$prompt("指定花店会员名可不填写", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
        .then(({ value }) => {
              
                self.pushState = true;
          self.$axios
            .post(GoodsPackage2Huawa, {
              packageId: packageId,
              memberName: value
            })
            .then(ret => {
               self.pushState = false;
              if (ret) {
                self.queryDetailInfo();
                self.$message.success(ret.Message);
              }
            });
        })
        .catch(() => {});
    },
    //查询包裹快递信息 服务类型 快递公司
    queryExpressInfo() {
      let self = this;
      self.$axios.post(QueryExpressService, {}).then(ret => {
        if (ret) {
          self.expressService = ret;
        }
      });
      self.$axios.post(QueryExpressType, {}).then(ret => {
        if (ret) {
          self.expressType = ret;
        }
      });
      self.$axios.post(QueryDelivery, {}).then(ret => {
        if (ret) {
          self.expressDelivery = ret;
        }
      });
    },
    //单个发送包裹
    sendParcel(el) {
      this.express.DetailId = el.DetailId;
      this.isExpressName = [el];
      this.isExpress = true;
    },
    //单个选择监听全选
    singleChange(item) {
      const detailList = this.detailList;
      let checked = 0;
      detailList.forEach(items => {
        if (items.checked == item.checked) {
          checked += 1;
        }
      });
      if (checked == detailList.length) {
        this.allExpressChecked = item.checked;
      }
    },
    //设置数据选择
    setChecked(data, checked) {
      const copyData = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < copyData.length; i++) {
        copyData[i]["checked"] = checked;
      }
      return copyData;
    },
    //全选
    allChecked() {
      this.detailList = this.setChecked(
        this.detailList,
        this.allExpressChecked
      );
    },
    //全部选择发送包裹
    allSendParcel() {
      const data = this.detailList;
      const self = this;
      let DetailId = [];
      self.isExpressName = [];
      data.forEach(item => {
        if (item.checked) {
          self.isExpressName.push(item);
          DetailId.push(item.DetailId);
        }
      });
      if (self.isExpressName.length) {
        self.isExpress = true;
        self.express.DetailId = DetailId.join(",");
      } else {
        self.$message({
          message: "选择商品",
          type: "warning"
        });
      }
    },
    //确认发送包裹
    expressEdit() {
      let that = this;
      let express = JSON.parse(JSON.stringify(that.express));
      that.expressService.forEach(element => {
        if (element.value == express.ServiceType) {
          express.ServiceName = element.valueStr;
        }
      });
      that.expressDelivery.forEach(element => {
        if (element.value == express.DeliveryId) {
          express.DeliveryName = element.valueStr;
        }
      });
      that.$axios.post(CreateGoodsPackage, express).then(ret => {
        if (ret) {
          that.$message.success(ret.Message);
        }
      });
    }
  },
  filters: {
    datetiemr(value) {
      if (!value) return "";
      var { Y, M, D, h, m, s } = FormatDate(value);
      return `${Y}/${M}/${D} ${h}:${m}:${s}`;
    }
    // datetiemr(value) {
    //   if (!value) return "";
    //   var { Y, M, D, h, m, s } = FormatDate(value);
    //   return `${Y}/${M}/${D} ${h}:${m}:${s}`;
    // },
    // orderType(value) {
    //   return value == 0 ? "未分配" : "花娃";
    // },
    // orderStatus(value) {
    //   if (value == undefined) return "";
    //   var t;
    //   switch (value.toString()) {
    //     case "-2":
    //       t = "推送失败";
    //       break;
    //     case "-1":
    //       t = "未知";
    //       break;
    //     case "0":
    //       t = "下单方主动取消";
    //       break;
    //     case "1":
    //       t = "待支付";
    //       break;
    //     case "2":
    //       t = "待发布";
    //       break;
    //     case "3":
    //       t = "退款中";
    //       break;
    //     case "4":
    //       t = "已取消";
    //       break;
    //     case "5":
    //       t = "已过期";
    //       break;
    //     case "6":
    //       t = "待接收";
    //       break;
    //     case "7":
    //       t = "待接单";
    //       break;
    //     case "8":
    //       t = "竞价单待出价";
    //       break;
    //     case "9":
    //       t = "配送中";
    //       break;
    //     case "10":
    //       t = "待确认完成";
    //       break;
    //     case "11":
    //       t = "已完成";
    //       break;
    //   }
    //   return t;
    // },
    // myOrderStatus(value) {
    //   if (value == undefined) return "";
    //   var t;
    //   switch (value.toString()) {
    //     case "0":
    //       t = "未支付";
    //       break;
    //     case "1":
    //       t = "已支付";
    //       break;
    //     case "2":
    //       t = "已取消";
    //       break;
    //   }
    //   return t;
    // }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.express.OrderId = getQueryString("orderId");
    this.queryExpressInfo();
    this.queryDetailInfo();
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
.cell-row{
  width: 50%;
  display: flex;
  align-items: center;
}
.product-expr-warp {
  padding: 20px;
  display: flex;
  justify-content: center;
  .product-expr-item {
    display: inline-block;
    padding: 5px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    img {
      vertical-align: top;
      width: 40px;
      height: 40px;
      background-color: #f4f4f4;
    }
    span {
      display: inline-block;
      vertical-align: top;
      margin: 0 5px;
      width: 80px;
      line-height: 40px;
      height: 40px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.scroll-x {
  padding: 5px;
  height: 70px;
  overflow-y: auto;
}
.log-warp {
  padding: 0 10px;
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 12px;
  .log-label {
    color: #929292;
    margin-right: 10px;
  }
  .log-content {
    color: #151515;
  }
}
.hy-content-warp {
  padding: 20px;
}
.hy-card-warp {
  border: 1px solid #ebeef5;
  box-sizing: border-box;
  border-radius: 4px;
  & + .hy-card-warp {
    margin-top: 10px;
  }
}
.hy-card-title {
  height: 46px;
  background: #ebeef5;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
}
.hy-card-content {
  padding: 10px 0;
}
.hy-card-content-cell {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 14px;
  .hy-cell-label {
    width: 88px;
  }
  .hy-cell-block {
    margin-left: 10px;
  }
}
.detail-warp {
  width: 88px;
  margin: 0 auto;
  .title {
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    margin-top: 5px;
    overflow: hidden;
    text-align: center;
  }
  .price {
    font-size: 12px;
    line-height: 17px;
    height: 17px;
    margin-top: 5px;
    overflow: hidden;
    text-align: center;
  }
  .btn {
    font-size: 12px;
    line-height: 17px;
    height: 17px;
    margin-top: 5px;
    overflow: hidden;
    text-align: center;
    font-weight: bold;
  }
}
.detail-warp-inr {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img{
    margin-right: 10px;
  }
}
.bole-color {

  font-weight: bold;
  color: #409eff;
  cursor: pointer;
}
.danger-color {
  font-weight: bold;
  color: #f56c6c;
}
.warning-color {
  font-weight: bold;
  color: #e6a23c;
}
.status-Success {
  background-color: #67c23a;
  width: 16px;
  height: 16px;
  margin: 0 10px;
  border-radius: 50%;
}
.status-Warning {
  background-color: #e6a23c;
  width: 16px;
  height: 16px;
  margin: 0 10px;
  border-radius: 50%;
}
.status-Danger {
  background-color: #f56c6c;
  width: 16px;
  height: 16px;
  margin: 0 10px;
  border-radius: 50%;
}
//@import url(); 引入公共css类
</style>