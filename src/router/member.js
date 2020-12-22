/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: zsm
 * @LastEditTime: 2020-03-30 22:25:34
 */
/*会员*/
export const member = [
    /*会员管理*/
    {
        name: "/Web/Member/MemberList",
        path: "/Web/Member/MemberList",
        meta: {
            keepAlive: true
        },
        component: resolve => require(['@/views/Member/MemberList'], resolve)
    },
    /*会员详情*/
    {
        name: "/Web/Member/MemberList/Set",
        path: "/Web/Member/MemberDetails",
        meta: {
            keepAlive: false
        },
        component: resolve => require(['@/views/Member/MemberDetails'], resolve)
    },
    /*浏览记录*/
    {
        name: "/Web/Member/MemberBrowse/Set",
        path: "/Web/Member/MemberBrowse",
        meta: {
            keepAlive: false
        },
        component: resolve => require(['@/views/Member/MemberBrowse'], resolve)
    },
    /*会员优惠卷*/
    {
        name: "/Web/Member/MemberCoupon/Set",
        path: "/Web/Member/MemberCoupon",
        meta: {
            keepAlive: false
        },
        component: resolve => require(['@/views/Member/MemberCoupon'], resolve)
    },
    /*会员资金列表*/
    {
        name: "/Web/Member/MoneyList/Set",
        path: "/Web/Member/MoneyList",
        meta: {
            keepAlive: false
        },
        component: resolve => require(['@/views/Member/MoneyList'], resolve)
    },
    /*会员销售列表*/
    {
        name: "/Web/Member/SalesList/Set",
        path: "/Web/Member/SalesList",
        meta: {
            keepAlive: false
        },
        component: resolve => require(['@/views/Member/SalesList'], resolve)
    }
]