const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成index.html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理垃圾文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//依赖包大小图
const  NowIp = require('./config/ip');//获取当前ip
const WorkerPlugin = require('worker-plugin');
// 是否为生产环境
const isProd = process.env.NODE_ENV === 'production';
//打时间戳
const _Version = new Date().getTime();


module.exports = {
    mode: isProd?'production':'development',
    entry:{
      app: ["babel-polyfill", "./src/main.js"]
    },
    output:{
        filename: 'js/[name].[hash:7].'+_Version +'.js',
        path: path.resolve(__dirname, './dist')
    },
    devtool: isProd?false:'eval-source-map', // 如果只用source-map开发环境出现错误定位源文件，生产环境会生成map文件
    module: {
        rules:[
            {test: /\.css$/i, use: ['style-loader','css-loader'] },
            {test: /\.less$/i, use: ['style-loader','css-loader','less-loader'] },
            {test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
            {
                test: /\.vue$/, 
                loader: 'vue-loader',
                options: {
                    hotReload: true, // 热重载
                    loaders:{
                        css: [isProd?MiniCssExtractPlugin.loader:'vue-style-loader',{
                            loader: 'css-loader',
                            options: {
                                minimize: isProd,
                                sourceMap: !isProd
                            }
                        },'postcss-loader']
                    }
                },
            },{
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: { // 配置html中图片编译
                        minimize: true
                    }
                }]
            },{
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/, // 排除不处理的目录
                include: path.resolve(__dirname, 'src'), // 精确指定要处理的目录
                options: { cacheDirectory: true }, // 开启缓存
                loader: 'babel-loader',
            },{
                test: /\.(png|jpe?g|gif|bmp|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: { // 配置图片编译路径
                        limit: 8192, // 小于8kb将图片转换成base64
                        name: '[name].[hash:8].[ext]',
                        outputPath: 'images/'
                    }
                },{
                    loader: 'image-webpack-loader', // 图片压缩
                    options: {
                        bypassOnDebug: true
                    }
                }]
            },{
                test: /\.(mp4|ogg)$/,use: ['file-loader']
            },{
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit:8192,
                    name:'fonts/[name].[hash:8].[ext]'
                }
            }

        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new WorkerPlugin(),
        new CleanWebpackPlugin(), // 每次打包之前清理打包目录
        new webpack.BannerPlugin(`xs build at ${Date.now()}`), // 打包后在.js/.css页头的时间
        new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html'), // 引入模版
            // favicon: path.join(__dirname, '../../src/assets/icon/favicon.ico'),
            filename: 'index.html',
            minify: { // 对index.html压缩
              collapseWhitespace: isProd,// 去掉index.html的空格
              removeAttributeQuotes: isProd // 去掉引号
            },
            hash: true // 去掉上次浏览器的缓存（使浏览器每次获取到的是最新的html）
        }),
        new MiniCssExtractPlugin({ // 分离css
            filename: isProd?'stylesheets/[name].[hash:8].css':'[name].css',
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(), // 热加载插件 HMR
    ],
    devServer:isProd?{}:{
        contentBase: path.join(__dirname, 'dist'),
        compress: true, // 开启Gzip压缩
        // stats: "none",//不打印信息
        clientLogLevel: "none",
        port: 8088,
        hot:true,
        open:true,
        historyApiFallback: true,//总是提供HTML文件
        host: NowIp(), //Change to '0.0.0.0' for external facing server
        // proxy: {
        //   '^\/users|sitters|bookings': {
        //     target: 'http://127.0.0.1:3001',
        //     rewrite: function(req) {
        //       req.url = req.url.replace(/^\/api/, '');
        //     }
        //   }
        // },
    },
    resolve: {
        extensions: ['.js', '.vue', '.less'], // import引入文件的时候不用加后缀
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups:{ // 这里开始设置缓存的 chunks
                vendor: { // key 为entry中定义的 入口名称
                    chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    test: /node_modules/, // 正则规则验证，如果符合就提取 chunk (指定是node_modules下的第三方包)
                    name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
                    minChunks: 1,
                    enforce: true
                },
                styles: {
                    chunks: 'all',
                    test: /\.(css)$/,
                    name: 'vendor',
                    minChunks: 1,
                    enforce: true
                }
            }
        }

    }
}