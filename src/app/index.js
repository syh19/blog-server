// node的核心模块
const path = require('path')

// 安装的包模块
const Koa = require('koa')
const { koaBody } = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')
const cors = require('koa2-cors')

// 自己写的模块
const errHandler = require('./errHandler')
const router = require('../router')
const { corsConfig, koaBodyConfig } = require('../config/index')
const { logger, accessLogger } = require('../config/koaLog4');

const app = new Koa()

// console.log('项目运行的路径是：', process.cwd())

app.use(cors(corsConfig))

app.use(koaBody(koaBodyConfig))

// 配置静态资源路径
app.use(KoaStatic(path.join(__dirname, '../upload')))

/** 要在路由中间件之前导入 */
app.use(parameter(app))
app.use(router.routes()).use(router.allowedMethods())
app.use(accessLogger());


// 最后进行统一的错误处理
app.on('error', errHandler)

module.exports = app