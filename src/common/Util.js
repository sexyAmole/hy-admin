/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2019-08-12 16:25:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2019-12-13 15:24:05
 */
/*出来返回数据空数组*/
export const emptyFalse = (data) => {
    let newData = JSON.parse(JSON.stringify(data));
    tree(newData)
    return newData;
}

/*获取链接参数*/
export const getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

export const FormatDate = (value) => {
    var dateTime = new Date(parseInt(value.substring(6, value.length - 2)));
    let Y = dateTime.getFullYear();
    let M = dateTime.getMonth() + 1;
    let D = dateTime.getDate();
    let h = dateTime.getHours() < 10?`0${dateTime.getHours()}` : dateTime.getHours() ;
    let m = dateTime.getMinutes()< 10?`0${dateTime.getMinutes()}` : dateTime.getMinutes() ;
    let s = dateTime.getSeconds()< 10?`0${dateTime.getSeconds()}` : dateTime.getSeconds() ;
    return {Y,M,D,h,m,s}
}

export const formatDateString = (value) => {
    var dateTime = new Date(parseInt(value.substring(6, value.length - 2)));
    let Y = dateTime.getFullYear();
    let M = dateTime.getMonth() + 1;
    let D = dateTime.getDate();
    let h = dateTime.getHours() < 10?`0${dateTime.getHours()}` : dateTime.getHours() ;
    let m = dateTime.getMinutes()< 10?`0${dateTime.getMinutes()}` : dateTime.getMinutes() ;
    let s = dateTime.getSeconds() < 10 ? `0${dateTime.getSeconds()}` : dateTime.getSeconds();
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
}


/*递归循环*/
const tree = (data) => {
    data.forEach(function(item) {
        if (item.Children.length) {
            tree(item.Children)
        } else {
            item.Children = false;
        }
    });
}





/* 添加选择字段 */
export const pushChecked = (data,start) => {
    data.forEach(function(item) {
        item.checked = start;
    });
    return data
}