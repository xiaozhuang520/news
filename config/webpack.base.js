const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 其他引入
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 导入清除插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 引入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry:{
        main:'./src/main.js'
    },

    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'js/[name].bundle.js'
    },
    // + 提取公共模块配置
    optimization: {
        splitChunks: {
            chunks: 'all'	// 提取所有文件的共同模块
        }
    },
     //  + 添加模块解释
     resolve: {
        alias: {
            // 1.以后@符号就是src目录
            '@': path.resolve(__dirname, "../src"),
            // 2.省略导入模块时的后缀名。
           
        },
       extensions: ['.js', '.json', '.vue']
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
                    fallback: "vue-style-loader",
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
                    fallback: 'vue-style-loader',
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
            },
            // 其他加载器...
        
            {
                test: /\.vue$/,
                use: ['vue-loader']
			}
        ]
    },
    plugins: [
        new ExtractTextPlugin("style/style.css"),
        // 调用清除打包目录插件
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "public/index.html"	// template指定默认html模板
        }),
            // vue加载器插件
         new VueLoaderPlugin()
    ]
}