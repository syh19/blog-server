# shell cmd

echo 'pm2 restart app.js'
# echo $1
cd $1 # 接收传入的参数 即地址

pm2 restart app.js

echo 'pm2 restart app.js success'