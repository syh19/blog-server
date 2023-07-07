# 在云服务器上执行的脚本以实现项目重启

echo 'pm2 restart app.js'

cd $1 # 接收传入的参数 即地址

pm2 restart src/app.js

echo 'pm2 restart app.js success'