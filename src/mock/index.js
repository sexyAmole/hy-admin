import Mock from 'mockjs';
import mock from "./mock";

// 登录
Mock.mock("/Manage/Login",'post',mock.Login);

// 获取商品分类
Mock.mock("/product/QueryCategoryList",'get',mock.QueryCategoryList);

export default Mock