/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-09-24 17:23:15
 * @LastEditors: zsm
 * @LastEditTime: 2020-04-24 14:56:20
 */
export const sku = [
  /*分类列表*/
  {
    name: "/Web/SKUProduct/CategoryList",
    path: "/Web/SKUProduct/CategoryList",
    meta: {
      keepAlive: false
    },
    component: resolve => require(['@/views/SKUProduct/CategoryList'], resolve)
  },
  /*设置分类*/
  {
    name: "/Web/SKUProduct/EditCategoryList/Set",
    path: "/Web/SKUProduct/EditCategoryList/:id",
    meta: {
      keepAlive: false
    },
    component: resolve => require(['@/views/SKUProduct/SetCategoryList'], resolve)
  },
  /*属性列表*/
  {
    name: "/Web/SKUProduct/Attribute",
    path: "/Web/SKUProduct/Attribute",
    meta: {
      keepAlive: false
    },
    component: resolve => require(['@/views/SKUProduct/AttributeList'], resolve)
  },
  /*设置属性列表*/
  {
    name: "/Web/SKUProduct/EditAttribute/Set",
    path: "/Web/SKUProduct/EditAttribute/:id",
    meta: {
      keepAlive: false
    },
    component: resolve => require(['@/views/SKUProduct/SetAttribute'], resolve)
  },
  /*SPU列表*/
  {
    name: "/Web/SKUProduct/SPUList",
    path: "/Web/SKUProduct/SPUList",
    meta: {
      keepAlive: true,
    },
    component: resolve => require(['@/views/SKUProduct/SPUList'], resolve)
  },
  /*设置SPU*/
  {
    name: "/Web/SKUProduct/EditSPUList/Set",
    path: "/Web/SKUProduct/EditSPUList/:id",
    meta: {
      keepAlive: false
    },
    component: resolve => require(['@/views/SKUProduct/SetSPUList'], resolve)
  },
  /*SKU列表*/
  {
    name: "/Web/SKUProduct/SKUList",
    path: "/Web/SKUProduct/SKUList",
    meta: {
      keepAlive: false
    },
    component: resolve => require(['@/views/SKUProduct/SKUList'], resolve)
  }
]