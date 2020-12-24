import axios from "@/axios/axios.post.form";

/**
 * @description: 获取图片商品详情
 * @param {*} url 网络链接
 * @return {*}
 */
export function getGoodxt(url, callback) {
  const imgReg = /<img.*?(?:>|\/>)/gi;
  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
  axios.get(url, {}).then((res) => {
    var arr = res.match(imgReg);
    callback && callback.call(this, { desUrls: arr.map((item) => item.match(srcReg)[1]) });
  });
}

/**
 * @description: 判断文件后缀是否是图片
 * @param {*} url 文件路径
 * @return {*}
 */
export function verifyImageSuffix(url) {
  const suffix = ["png", "jpg", "jpeg", "gif"];
  // , "webp", "psd", "svg", "tiff"] "bmp",
  const ext = url.substr(url.lastIndexOf(".") + 1);
  return suffix.indexOf(ext.toLowerCase()) !== -1;
}
