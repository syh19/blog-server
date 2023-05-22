const OSS = require('ali-oss')
const path = require("path")

const { unSupportedFileType, fileUploadError } = require('../constant/err.type')
const { aliOSS } = require('../utils/encrypt')

const client = new OSS({
  region: aliOSS.region,
  secure: true,  // secure: 配合region使用，如果指定了secure为true，则使用HTTPS访问  
  accessKeyId: aliOSS.accessKeyId,
  accessKeySecret: aliOSS.accessKeySecret,
  bucket: aliOSS.bucket
})

const headers = {
  // 指定Object的存储类型。
  'x-oss-storage-class': 'Standard',
  // 指定Object的访问权限。
  'x-oss-object-acl': 'private',
  // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.jpg。
  // 'Content-Disposition': 'attachment; filename="example.jpg"'
  // 设置Object的标签，可同时设置多个标签。
  'x-oss-tagging': 'Tag1=1&Tag2=2',
  // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
  'x-oss-forbid-overwrite': 'true',
}

const uploadFile = async (ctx, next) => {
  try {
    let file = ctx.request.files.file
    console.log("我是附件", file)
    let { acceptTypeList, folder } = ctx.request.body
    if (acceptTypeList && !acceptTypeList.includes(file.mimetype)) {
      return ctx.app.emit('error', unSupportedFileType, ctx)
    }
    if (folder) {
      folder = folder + '/'
    } else {
      folder = ''
    }
    const separatorIndex = file.originalFilename.lastIndexOf('.')
    const fileName = file.originalFilename.substring(0, separatorIndex)
    const suffix = file.originalFilename.substring(separatorIndex + 1, file.originalFilename.length)
    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    const result = await client.put(folder + fileName + '-' + Date.now() + suffix,
      file.filepath,
      { headers }
    )
    ctx.file = result
    ctx.body = {
      code: 0,
      data: {
        name: result.name,
        url: result.url
      },
      msg: '上传成功'
    }
  } catch (err) {
    fileUploadError.data = err.name
    return ctx.app.emit('error', fileUploadError, ctx)
  }
  await next()
}



module.exports = {
  uploadFile
}