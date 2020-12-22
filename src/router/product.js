/*
 * @Description: 
 * @version: 
 * @Author: zsm
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: zsm
 * @LastEditTime: 2020-04-11 20:04:38
 */
//商品
export const product = [
    /*商品分类*/
    {   
        name:"/Web/Product/CategoryList",
        path: "/Web/Product/CategoryList",
        meta: {
            keepAlive:false
        },
        component:resolve => require(['@/views/Product/CategoryList'],resolve)
    },
    /*设置商品分类*/
    {   
        name:"/Web/Product/CategoryList/Set",
        path: "/Web/Product/SetCategory/:id",
        meta: {
            keepAlive:false
        },
        component:resolve => require(['@/views/Product/SetCategory'],resolve)
    },
    
    /*商品属性*/
    {   
        name:"/Web/Product/Attribute",
        path: "/Web/Product/Attribute",
        meta: {
            keepAlive:false
        },
        component:resolve => require(['@/views/Product/Attribute'],resolve)
    },


    /*商品属性设置*/
    {   
        name:"/Web/Product/Attribute/Set",
        path: "/Web/Product/SetAttribute/:id",
        meta: {
            keepAlive:false
        },
        component:resolve => require(['@/views/Product/SetAttribute'],resolve)
    },

    /*商品列表*/
    {   
        name:"/Web/Product/FlowerList",
        path: "/Web/Product/FlowerList",
        meta: {
            keepAlive:true
        },
        component: resolve => require(['@/views/Product/FlowerList'], resolve)
    },

    /*商品添加修改*/
    {   
        name:"/Web/Product/FlowerList/Set",
        path: "/Web/Product/SetFlower/:id",
        meta: {
            keepAlive:false
        },
        component: resolve => require(['@/views/Product/SetFlower'], resolve)
    }
]