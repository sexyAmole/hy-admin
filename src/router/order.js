/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-10-22 10:03:24
 */
/*订单管理*/
export const order = [
    /*订单管理*/
    {   
        name:"/Web/Order/OrderList",
        path: "/Web/Order/OrderList",
        meta: {
            keepAlive:true
        },
        component:resolve => require(['@/views/Order/OrderList'],resolve)
    },
     /*SKU订单列表*/
     {   
        name:"/Web/Order/SkuOrderList",
        path: "/Web/Order/SkuOrderList",
        meta: {
            keepAlive:true
        },
        component:resolve => require(['@/views/Order/SkuOrderList'],resolve)
    },
     /*订单管理详情*/
     {   
        name:"/Web/Order/Orderdetail/Set",
        path: "/Web/Order/Orderdetail/:id",
        meta: {
            keepAlive:false
        },
        component:resolve => require(['@/views/Order/Orderdetail'],resolve)
    },
      /*SKU订单管理详情*/
      {   
        name:"/Web/Order/SkuOrderDetail/Set",
        path: "/Web/Order/SkuOrderDetail/:id",
        meta: {
            keepAlive:false
        },
        component:resolve => require(['@/views/Order/SkuOrderDetail'],resolve)
    },
      /*交易订单管理*/
      {   
        name:"/Web/Order/tradingOrderList",
        path: "/Web/Order/tradingOrderList",
        meta: {
            keepAlive:false
        },
        component:resolve => require(['@/views/Order/tradingOrderList'],resolve)
    }
]