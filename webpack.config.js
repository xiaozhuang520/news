const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 其他引入
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 导入清除插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'mian.js'
    },
    devtool: "source-map", // + 生成映射源代码文件
    devServer: {
        port: 8080 // 默认端口是8080
   },
    module: {
        
        rules: [
            {
                test: /\.css$/,			// 匹配css扩展名文件
                // use:[					// 配置loader加载器
                //     'style-loader',		// 把css代码写入到网页中
                //     'css-loader'		// 读取css的代码
                // ]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [					// 配置loader加载器
                        'css-loader'		// 读取css的代码
                        ]
                })
            },
            {
                test: /\.less$/,			// 匹配css扩展名文件
                // use: [					// 配置loader加载器
                //     'style-loader',		// 把css代码写入到网页中
                //     'css-loader',   // 读取css的代码
                //     'less-loader'
                // ]
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                  })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,	// 匹配图片文件
                use: [
                    {
                        loader: "file-loader",              // 处理图片文件返回链接
                        options: {
                            publicPath: "./images/",   		//  引入图片时会在路径前面加上该选项
                            outputPath: "images"            //  输出到dist下的images目录
                        }
                    } 
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style/style.css"),
        // 调用清除打包目录插件
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "public/index.html"	// template指定默认html模板
        })
    ]
}