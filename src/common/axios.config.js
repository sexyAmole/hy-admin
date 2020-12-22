/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: zsm
 * @LastEditTime: 2020-04-02 10:12:37
 */

///api
const api = process.env.NODE_ENV === 'production'?"":"/api";
/*公共接口 start*/
export var QueToken = `${api}/Common/UploadFile`;//获取七牛的token
export var Login = `${api}/Manage/Login`;//登录
/*公共接口end*/

/*分类接口start*/
export var QueryCategoryList = `${api}/product/QueryCategoryList`;//分类列表
export var EditCategory = `${api}/product/EditCategory`;//添加修改分类
export var DelCategory = `${api}/product/DelCategory`;//删除分类
/*分类接口end*/

/*属性接口start*/
export var AttributeList = `${api}/product/QueryAttributeList`;//获取属性列表 传入ID获取单个 不传入获取全部
export var EditAttribute = `${api}/product/EditAttribute`;//修改添加属性 
export var DelAttribute = `${api}/product/DelAttribute`;//删除属性 
/*属性接口end*/

/*商品接口start*/
export var QueryFlowerList = `${api}/product/QueryFlowerList`;//获取
export var DelFlower = `${api}/product/DelFlower`;//删除
export var EditFlower = `${api}/product/EditFlower`;//添加修改
export var QueryFlowerDetail = `${api}/product/QueryFlowerDetail`;//详情
export var UpdateStatus = `${api}/product/UpdateStatus`;//详情
export var QueryDataType = `${api}/product/QueryDataType`;//详情


/*商品接口end*/


/*价格设置接口start*/
export var QueryPriceList = `${api}/product/QueryPriceList`;//获取
export var EditPrice = `${api}/product/EditPrice`;//添加修改
export var DelPrice = `${api}/product/DelPrice`;//删除
export var CategoryPrice = `${api}/product/QueryPriceByCategoryId`;//获取分类价格比例

/*商价格设置end*/

/* 订单 */
export var QueryOrderList = `${api}/product/OrderList`;//获取订单
export var TradeOrderList = `${api}/product/TradeOrderList`;//获取交易订单
export var QueryOrderDetail = `${api}/product/OrderDetail`;//获取详情
export var AddOrderLog = `${api}/product/AddOrderLog`;//添加订单日志
export var PushFlowerOrder = `${api}/product/PushFlowerOrder`;//推送到花娃
export var RefreshFlowerOrder = `${api}/product/RefreshFlowerOrder`;//刷新花娃状态
export var AddHuawaPrice = `${api}/product/AddHuawaPrice`;//刷新花娃状态
export var QueryHuawaStoreList = `${api}/product/QueryHuawaStoreList`;//查询报价花店
export var SelectHuawaPrice = `${api}/product/SelectHuawaPrice`;//选中报价花店
export var AssignHuawaStore = `${api}/product/AssignHuawaStore`;//指定花店
export var CancelHuawaOrder = `${api}/product/CancelHuawaOrder`;//取消订单
export var UpdateThirdPartyOrderInfo = `${api}/product/UpdateThirdPartyOrderInfo`;//更新订单号
export var QueryThirdPartyOrderStatus = `${api}/product/QueryThirdPartyOrderStatus`;//查询状态
export var QueryPayBusiness = `${api}/product/QueryPayBusiness`;//查询交易订单处理状态
export var QueryDealStatus = `${api}/product/QueryDealStatus`;//查询交易订单处理状态
export var QueryFlowerOrderStatus = `${api}/product/QueryFlowerOrderStatus`;//查询交易订单状态


//SKU订单
export var QueryOrderSource = `${api}/Goods/QueryOrderSource`;//查询订单来源
export var QueryGoodsOrderStatus = `${api}/Goods/QueryGoodsOrderStatus`;//查询订单状态
export var OrderList = `${api}/Goods/OrderList`;//查询订单列表
export var OrderDetail = `${api}/Goods/OrderDetail`;//查询订单详情
export var orderConfirm = `${api}/Goods/Order`;//确认收货
export var ConfirmShip = `${api}/Goods/ConfirmShip`;//确认发货完成
export var GoodsPackagePathRefresh = `${api}/Goods/GoodsPackagePathRefresh`;//包裹轨迹手动刷新
export var GoodsPackage2Huawa = `${api}/Goods/GoodsPackage2Huawa`;//手动推送到花娃




//SKU订单物流
export var QueryExpressType = `${api}/Goods/QueryExpressType`;//查询快递类型
export var QueryDelivery = `${api}/Goods/QueryDelivery`;//查询快递公司信息
export var QueryExpressService = `${api}/Goods/QueryExpressService`;//查询快递服务类型
export var OrderExpress = `${api}/Goods/OrderExpress`;//订单快递信息
export var OrderExpressShip = `${api}/Goods/OrderExpressShip`;//商品订单快递发货
export var OrderExpressCancel = `${api}/Goods/OrderExpressCancel`;//商品订单快递取消
export var OrderExpressPathRefresh = `${api}/Goods/OrderExpressPathRefresh`;//商品订单快递轨迹刷新
export var CreateGoodsPackage = `${api}/Goods/CreateGoodsPackage`;//创建包裹
export var DelGoodsPackage = `${api}/Goods/DelGoodsPackage`;//删除包裹





/* 主题 */

export var QueryFlowerZoneList = `${api}/product/QueryFlowerZoneList`;//查询鲜花专区列表
export var DelFlowerZone = `${api}/product/DelFlowerZone`;//删除鲜花专区
export var QueryFlowerZoneDetail = `${api}/product/QueryFlowerZoneDetail`;//查询鲜花专区详情
export var EditFlowerZone = `${api}/product/EditFlowerZone`;//编辑鲜花专区
export var QueryZoneTheme = `${api}/product/QueryZoneTheme`;//查询专区样式

/* 优惠卷主题 */

export var QueryCouponZoneList = `${api}/coupon/QueryCouponZoneList`;//列表
export var EditCouponZone = `${api}/coupon/EditCouponZone`;//编辑
export var DelCouponZone = `${api}/coupon/DelCouponZone`;//删除
export var QueryCouponZone = `${api}/coupon/QueryCouponZone`;//详情



/* 优惠券 */

export var QueryCouponInfoList = `${api}/coupon/QueryCouponInfoList`;//获取列表
export var EditCouponInfo = `${api}/coupon/EditCouponInfo`;//编辑优惠券信息
export var QueryCouponInfo = `${api}/coupon/QueryCouponInfo`;//获取优惠券详情
export var DelCouponInfo = `${api}/coupon/DelCouponInfo`;//删除优惠券信息
export var Grant = `${api}/coupon/Grant`;//指定发放优惠卷


/* 会员中心 */
export var UserQueryList = `${api}/User/QueryList`;//获取列表
export var QueryDetail = `${api}/User/QueryDetail`;//商品详情
export var QueryBrowseList = `${api}/User/QueryBrowseList`;//浏览记录
export var QueryCouponList = `${api}/Coupon/GrantList`;//优惠券列表
export var QueryFundsType = `${api}/User/QueryFundsType`;//资金类型
export var QueryFundsStatus = `${api}/User/QueryFundsStatus`;//交易状态
export var QueryFundsLogManageList = `${api}/User/QueryFundsLogManageList`;//资金列表
export var QuerySaleOrderStatus = `${api}/User/QuerySaleOrderStatus`;//销售订单状态
export var QueryOrderSaleManageList = `${api}/User/QueryOrderSaleManageList`;//销售订单列表
export var SetSaleUserFirst = `${api}/User/SetSaleUserFirst`;//升级为一级分销商






/* 轮播图设置 */
export var QueryHomeBannerList = `${api}/product/QueryHomeBannerList`;//获取列表
export var DelHomeBanner = `${api}/product/DelHomeBanner`;//删除轮播
export var EditHomeBanner = `${api}/product/EditHomeBanner`;//编辑轮播
export var QueryClient = `${api}/Common/QueryClient`;//查询客户端枚举
export var QueryBannerType = `${api}/product/QueryBannerType`;//查询客户端枚举

/* SKU分类设置 */
export var EditGoodsType = `${api}/Goods/EditGoodsType`;//编辑分类
export var DelGoodsType = `${api}/Goods/DelGoodsType`;//删除分类
export var QueryAllGoodsType = `${api}/Goods/QueryAllGoodsType`;//查询分类

/* SKU属性设置 */
export var EditGoodsAttr = `${api}/Goods/EditGoodsAttr`;//编辑分类
export var DelGoodsAttr = `${api}/Goods/DelGoodsAttr`;//删除分类
export var QueryGoodsAttr = `${api}/Goods/QueryGoodsAttr`;//查询分类

/* 添加商品 */
export var QueryGoodsAttrByTypeId = `${api}/Goods/QueryGoodsAttrByTypeId`;//查询属性列表
export var QuerySaleType = `${api}/Goods/QuerySaleType`;//查询销售方式
export var EditGoodsInfo = `${api}/Goods/EditGoodsInfo`;//编辑商品
export var QueryGoodsInfoList = `${api}/Goods/QueryGoodsInfoList`;//商品列表
export var UpdateGoodsStatus = `${api}/Goods/UpdateGoodsStatus`;//上下架
export var QueryGoodsStatus = `${api}/Goods/QueryGoodsStatus`;//上下架
export var QueryGoodsSkuList = `${api}/Goods/QueryGoodsSkuList`;//查询商品sku列表
export var EditGoodsSku = `${api}/Goods/EditGoodsSku`;//编辑商品sku
export var QueryGoodsInfo = `${api}/Goods/QueryGoodsInfo`;//获取商品详情

/* 评论管理  */
export var QueryCommentStatus = `${api}/UserComment/QueryCommentStatus`;//查询评论状态
export var CommentList = `${api}/UserComment/List`;//列表
export var CommentAdd = `${api}/UserComment/Add`;//添加
export var UpdateCommentStatus = `${api}/UserComment/UpdateCommentStatus`;//更新状态
export var UpdateCommentIsTop = `${api}/UserComment/UpdateCommentIsTop`;//置顶
export var UpdateCommentIsHost = `${api}/UserComment/UpdateCommentIsHost`;//热评
export var ReplyList = `${api}/UserComment/ReplyList`;//回复列表
export var CreateReply = `${api}/UserComment/CreateReply`;//回复 CommentId Content ReplyImgUrl []






