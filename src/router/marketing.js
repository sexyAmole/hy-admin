/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-09-03 23:04:51
 */
//营销
export const marketing = [
    /*价格比例列表*/
    {   
        name:"/Web/Marketing/ModifyPrice",
        path: "/Web/Marketing/ModifyPrice",
        meta: {
            keepAlive:false
        },
        component:resolve => require(['@/views/Marketing/ModifyPrice'],resolve)
    },

    /*价格比例设置*/
    {   
        name:"/Web/Marketing/ModifyPrice/Set",
        path: "/Web/Marketing/SetModifyPrice/:id",
        meta: {
            keepAlive:false
        },
        component:resolve => require(['@/views/Marketing/SetModifyPrice'],resolve)
    },
      /*优惠券列表*/
      {
        name:"/Web/Marketing/CouponList",
          path: "/Web/Marketing/CouponList",
          meta: {
            keepAlive:true
        },
        component:resolve => require(['@/views/Marketing/CouponList'],resolve)
    },
     /*优惠券修改*/
     {   
        name:"/Web/Marketing/CouponList/Set",
         path: "/Web/Marketing/SetCoupon/:id",
         meta: {
            keepAlive:false
        },
        component:resolve => require(['@/views/Marketing/SetCoupon'],resolve)
    }
]
