import * as qiniu from "qiniu-js";

import { QueToken } from "./axios.config.js";
import axios from "@/axios/axios.post.form";
const uploadURL = "toShopImg";

// const IMG_HTTP = "https://image.huayixh.com/";

/**
 * @description: 获取图片Base64
 * @param {*} img 页面图片数据
 * @return {*}
 */
export function getBase64Image(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  var dataURL = canvas.toDataURL("image/" + ext);
  return {
    dataURL: dataURL,
    type: "image/" + ext
  };
}

/**
 * @description:  转file
 * @param {*} dataurl base64
 * @param {*} filename 文件明
 * @return {*}
 */
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.dataURL.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * @description: 获取网络图片file
 * @param {*} fileUrl w网络图片路径
 * @return {*}
 */
export function uploadQiniu(fileUrl, callback) {
  // var domeImg = document.createElement("img");
  var image = new Image();
  // // 允许跨域操作
  image.setAttribute("crossOrigin", "anonymous");
  image.src = fileUrl;
  image.onload = function() {
    var base64 = getBase64Image(image);
    var newFile = dataURLtoFile(base64, "img");
    axios.get(QueToken, { params: { type: uploadURL } }).then((res) => {
      var observable = qiniu.upload(newFile, res.saveKey, res.uptoken);
      observable.subscribe({
        next() {},
        error() {},
        complete(res) {
          callback && callback.call(this, res);
        }
      });
    });
  };
  //   // var blob = convertBase64UrlToBlob(base64);
  // };
}

// 返回七牛云token
// export async function getQiniuToken() {
//   const qiniuData = axios.get(QueToken, { params: { type: uploadURL } });
//   // await axios.get(QueToken, { params: { type: uploadURL } });
//   // .then(res => {
//   //   that.qiniuData.token = res.uptoken;
//   //   that.qiniuData.key = res.saveKey;
//   // });
// }

// var observable = qiniu.upload(file, key, token, putExtra, config);
