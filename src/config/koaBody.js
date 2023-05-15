const path = require('path')

const koaBodyConfig = {
  multipart: true,  // 开启文件上传功能
  formidable: {
    // 在配置选项里，不推荐使用相对路径
    // 因为在option里的相对路径不是相对的当前文件，而是相对的process.cwd()
    uploadDir: path.join(__dirname, '../upload'),  // 上传的路径
    keepExtensions: true,  // 保持后缀名称
  },
  parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
}

module.exports = {
  koaBodyConfig
}