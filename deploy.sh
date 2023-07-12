# 在云服务器上执行的脚本以实现项目重启

echo "-------------进入到了目标项目的脚本文件------------"

# cd $1 # 接收传入的参数 即地址
echo "git pull"
git pull

echo "restart src/app.js"
pm2 restart src/app.js

echo '-------------目标项目的脚本文件执行完毕------------'