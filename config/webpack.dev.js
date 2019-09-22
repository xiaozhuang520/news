const merge = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
    mode: "development",
    
    // 生成map映射文件
    devtool: "source-map",
	
    // 开发服务器配置y
    devServer: {
        port: 8000, // 默认端口是8080
        stats: 'errors-only'   // + 只打印报错信息
   }
})