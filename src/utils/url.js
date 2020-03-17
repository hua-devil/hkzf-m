// 配置好.env文件后 整个项目 默认 有 process.env.REACT_APP_URL
console.log('配置得地址',process.env.REACT_APP_URL);
let BASE_URL = process.env.REACT_APP_URL
export {BASE_URL}
// 有些图片也需要这路径