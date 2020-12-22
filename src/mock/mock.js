const retData = {
    "Code": "",
    "Message": "",
    "Action": "",
    "Extra": "",
    "Data": null
}

const mock = {
    Login(options) {
        //400错误 401登陆权限 200成功 411权限申请
        let body = JSON.parse(options.body);
        if (body.account != "admin" && body.passWord != "123456") {
            retData.Code = '400';
            retData.Message = '密码账号错误';
            return retData;
        } else {
            retData.Code = '200';
            retData.Message = '登陆成功';
            return retData;
        }
    },
    QueryCategoryList() {
        const NewData = [{
            id: 1,
            label: '一级 1',
            children: [{
                id: 4,
                label: '二级 1-1'
            }]
        }, {
            id: 2,
            label: '一级 2',
            children: [{
                id: 5,
                label: '二级 2-1'
            }, {
                id: 6,
                label: '二级 2-2'
            }]
        }]
        retData.Code = '200';
        retData.Message = '获取成功';
        retData.Data = NewData;
        return retData;
    }
}


export default mock