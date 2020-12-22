<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: zsm
 * @LastEditTime: 2020-03-31 12:45:11
 -->
/Web
<template>
  <div class="hy-admin-bady">
    <!-- 头部 -->
    <div class="hy-admin-head" :class="{'hy-centen-show':isCollapse}">
      <div class="head-indent" @click="isCollapse = !isCollapse">
        <i class="iconfont icon-zuosuojin head-iconfont" v-show="!isCollapse"></i>
        <i class="iconfont icon-yousuojin head-iconfont" v-show="isCollapse"></i>
      </div>
      <!-- 头部菜单 -->
      <ul class="head-menu">
        <li class="head-menu-item">
          <i class="el-icon-menu head-iconfont"></i>
        </li>
        <li class="head-menu-item">
          <i class="el-icon-bell head-iconfont"></i>
        </li>
        <li class="head-menu-item">
          <el-dropdown>
            <span class="el-dropdown-link head-menu-item">
              <img src="../assets/images/user.png" class="head-menu-imgae">
              <span class="head-admin-name">超级管理员</span>
              <i class="el-icon-caret-top"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
      <!-- 头部菜单end -->
    </div>
    <!-- 头部end -->
    <!-- 左边菜单栏 -->
    <div class="hy-admin-left" :class="{'hy-menu-hide':isCollapse}">
      <!-- logo -->
      <div class="hy-admin-logo" :class="{'hy-menu-hide':isCollapse}">
        <img src="../assets/images/logo.png" alt="花毅后台" class="admin-image">
        <span class="Brand-name">后台管理系统V2.0</span>
      </div>
      <!-- logoend -->
      <!-- 菜单栏 -->
      <div class="hy-admin-scroll">
        <div class="hy-admin-menu">
          <el-menu
            class="el-menu-vertical-demo"
            :default-active="MenuActive"
            :default-openeds="openeds"
            :unique-opened="uniqueOpened"
            :collapse="isCollapse"
            :router="true"
          >
            <el-submenu v-for="(item,index) in menuList" :key="index" :index="index + ''">
              <template slot="title">
                <i class="hy-ment-icon" :class="item.icon"></i>
                <span>{{item.menuName}}</span>
              </template>
              <el-menu-item
                v-for="(items,indexs) in item.children"
                :key="indexs"
                :index="items.link"
              >{{items.menuName}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <!-- 菜单栏end -->
    </div>
    <!-- 左边菜单栏end -->
    <!-- 右边内容 -->
    <div class="hy-main-centent" :class="{'hy-centen-show':isCollapse}">
          <!-- <transition name="fade" mode="out-in">
          </transition> -->
         <!-- <keep-alive include="FlowerList">
          <router-view ></router-view>
        </keep-alive> -->
        <transition name="fade">
          <keep-alive>
          <router-view v-if="this.$router.currentRoute.meta.keepAlive"></router-view>
          </keep-alive>
        </transition>
        <transition name="fade">
        <router-view  v-if="!this.$router.currentRoute.meta.keepAlive"></router-view>
        </transition>
    </div>
    <!-- 右边内容 -->
  </div>
</template>
<script>
/* eslint-disable */
//
export default {
  data() {
    return {
      isCollapse: false, //collapse是否水平折叠收起菜单
      uniqueOpened: true, //是否只保持一个子菜单的展开
      openeds: [], //当前打开的 sub-menu 的 index 的数组
      MenuActive: "", //当前激活菜单的 index
      menuList: [
        {
          icon: "iconfont icon-shangpinguanli",
          menuName: "商品",
          children: [
            {icon: "",menuName: "分类设置",link: "/Web/Product/CategoryList"},
            { icon: "", menuName: "属性设置", link: "/Web/Product/Attribute" },
            { icon: "", menuName: "商品管理", link: "/Web/Product/FlowerList" }
          ]
        },
        {
          icon: "el-icon-s-cooperation",
          menuName: "产品",
          children: [
            {icon: "",menuName: "分类设置",link: "/Web/SKUProduct/CategoryList"},
            { icon: "", menuName: "属性设置", link: "/Web/SKUProduct/Attribute" },
            { icon: "", menuName: "SPU管理", link: "/Web/SKUProduct/SPUList" },
            { icon: "", menuName: "SKU管理", link: "/Web/SKUProduct/SKUList" }
          ]
        },
        {
          icon: "iconfont icon-huiyuanguanli",
          menuName: "会员",
          children: [
            { icon: "", menuName: "会员管理", link: "/Web/Member/MemberList" },
            { icon: "", menuName: "资金管理", link: "/Web/Member/MoneyList" },
            { icon: "", menuName: "销售列表", link: "/Web/Member/SalesList" }
          ]
        },
        {
          icon: "iconfont icon-xiaoshou",
          menuName: "营销",
          children: [
            { icon: "", menuName: "优惠卷", link: "/Web/Marketing/CouponList" },
            { icon: "", menuName: "价格设置", link: "/Web/Marketing/ModifyPrice"},
            { icon: "", menuName: "评论列表", link: "/Web/component/componentList"}
          ]
        },
        {
          icon: "iconfont icon-ico_jiaoyiguanli",
          menuName: "订单",
          children: [
            { icon: "", menuName: "订单管理", link: "/Web/Order/OrderList" },
            { icon: "", menuName: "SKU订单管理", link: "/Web/Order/SkuOrderList" },
            { icon: "", menuName: "交易订单", link: "/Web/Order/tradingOrderList" }
          ]
        },
        {
          icon: "iconfont icon-yingxiaoguanli",
          menuName: "统计",
          children: [
            { icon: "", menuName: "会员统计", link: "/login" },
            { icon: "", menuName: "商品统计", link: "/login" },
            { icon: "", menuName: "订单统计", link: "/login" },
            { icon: "", menuName: "营销统计", link: "/login" }
          ]
        },
        {
          icon: "iconfont icon-shezhi",
          menuName: "设置",
          children: [{ icon: "", menuName: "轮播图设置", link: "/Web/wxConfig/CarouselList" },
          { icon: "", menuName: "鲜花专区", link: "/Web/wxConfig/ThemeList" },
          { icon: "", menuName: "优惠券专区", link: "/Web/wxCoupon/CouponThemeList" }]
        }
      ]
    };
  },
  methods: {
    menuOpen(item) {
      isopen = item.menuName;
    },
    setMenu() {
      //设置导航
      if (this.$route.name) {
        let path = this.$route.name.replace("/Set", ""),
          menuList = this.menuList,
          that = this;
        // 循环显示菜单栏选中
        for (let i = 0; i < menuList.length; i++) {
          let children = menuList[i].children;
          for (let x = 0; x < children.length; x++) {
            if (children[x].link == path) {
              that.openeds[0] = i;
              that.MenuActive = children[x].link;
              break;
            }
          }
        }
      }
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.setMenu();
    });
  }
};
</script>
<style lang="less" scoped>
/*修改element的左边菜单样式*/

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}

.el-menu {
  border: none;
}

.el-menu-item.is-active {
  background-color: #ecf5ff;
}

.el-menu-item:focus {
  background-color: none !important;
}

/* 动画 */



.fade-enter,.lfade-enter{
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  width: 100%;
}
.fade-enter-active {
  transition: all 0.3s;
}

.fade-leave-active {
  transition: all  0.3s;
}
.fade-enter{
  transform: translate(100%);
  opacity: 0;
}

.fade-leave-active{
  transform: translateX(-100%);
  opacity: 0;
}
// .fade-enter,
// .fade-leave-to
// /* .slide-fade-leave-active for below version 2.1.8 */
//  {
//   transform: translateX(20px);
//   opacity: 0;
// }

/*首页主体*/

.hy-admin-bady {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #EFEFF7;
}

.head-iconfont {
  font-size: 22px;
  color: #bfbfbf;
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}

/*头部*/

.hy-admin-head {
  position: absolute;
  top: 0;
  left: 222px;
  right: 0;
  height: 70px;
  background-color: #fff;
  z-index: 10;
  display: flex;
  overflow: hidden;
  overflow-x: auto;
  justify-content: space-between;
  transition: left 0.25s;
  .head-indent {
    height: 70px;
    line-height: 70px;
    width: 70px;
    text-align: center;
  }
  .head-menu {
    display: flex;
    height: 70px;
    .head-menu-item {
      height: 70px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .head-menu-imgae {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
      .head-admin-name {
        margin: 0 20px;
      }
    }
  }
}

/*头部end*/

/*左边*/

.Brand-name {
  font-size: 14px;
  margin-left: 10px;
  color: #575346;
}

.hy-admin-left {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 220px;
  overflow: hidden;
  z-index: 10;
  transition: width 0.25s;
  .hy-admin-logo {
    width: 220px;
    height: 70px;
    line-height: 70px;
    background-color: #fff;
    text-align: center;
    .admin-image {
      width: 34px;
      height: 34px;
      vertical-align: middle;
      margin-top: -5px;
    }
  }
  .hy-admin-scroll {
    position: absolute;
    top: 72px;
    left: 0;
    bottom: 0;
    width: 237px;
    overflow-x: hidden;
    background-color: #fff;
    .hy-admin-menu {
      width: 220px;
    }
  }
}

/*左边end*/

.hy-ment-icon {
  width: 24px;
  font-size: 20px;
  margin-right: 8px;
  vertical-align: middle;
}

.hy-menu-hide {
  width: 64px !important;
}

.hy-centen-show {
  left: 66px !important;
}

/*右边*/

.hy-main-centent {
  position: absolute;
  top: 70px;
  left: 222px;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding: 0 20px;
  transition: left 0.25s;
}
.is-opened,.el-menu-item{
   background-color: #f7f7f7;
   .is-active{
  background-color: #EFEFF7;
  color: #575346;
}
}
.el-menu-item{
 &:hover{
    background-color: #EFEFF7;
  }
}

/*右边end*/



</style>