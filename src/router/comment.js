/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-12-13 10:12:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-12-13 10:17:12
 */

export const component = [
    /*评论管理*/
    {   
        name:"/Web/component/componentList",
        path: "/Web/component/componentList",
        component:resolve => require(['@/views/component/componentList'],resolve)
    },
     /*添加评论*/
     {   
        name:"/Web/component/componentAdd",
        path: "/Web/component/componentAdd",
        component:resolve => require(['@/views/component/componentAdd'],resolve)
    },
    /*回复列表*/
     {   
        name:"/Web/component/replyList",
        path: "/Web/component/replyList",
        component:resolve => require(['@/views/component/replyList'],resolve)
    },
    /*添加回复*/
     {   
        name:"/Web/component/addReply",
        path: "/Web/component/addReply",
        component:resolve => require(['@/views/component/addReply'],resolve)
    }
]