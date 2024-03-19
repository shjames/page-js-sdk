const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //引入html-webpack-plugin
const CleanWebpackPlugin = require("clean-webpack-plugin"); //引入
module.exports = {
  entry: {
    "ma.sdk": "./main.js", //入口文件，若不配置webpack4将自动查找src目录下的index.js文件
    index: "./src/js/index.js", //入口文件，若不配置webpack4将自动查找src目录下的index.js文件
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, //缓存
            presets: ["es2015"],
          },
        },
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /.woff|.woff2|.svg|.eot|.ttf/,
        use: "url-loader?prefix=font/&limit=10000",
      },
    ],
  },

  plugins: [
    // 对应的插件
    new HtmlWebpackPlugin({
      //配置
      filename: "index.html", //输出文件名
      template: "./index.html", //以当前目录下的index.html文件为模板生成dist/index.html文件
    }),
    new CleanWebpackPlugin(["dist"]), //传入数组,指定要删除的目录
  ],
  devServer: {
    //配置此静态文件服务器，可以用来预览打包后项目
    inline: true, //打包后加入一个websocket客户端
    // hot:true,//热加载
    contentBase: path.resolve(__dirname, "dist"), //开发服务运行时的文件根目录
    host: "0.0.0.0", //主机地址
    port: 9090, //端口号
    proxy: {
      "/sdk": {
        target: "http://10.0.1.172:9999/apidomain",
        secure: false,
        changeOrigin: true,
        // pathRewrite: {
        //   "^/sdk": "/sdk", // 将请求路径中的 /sdk 替换为 /apidomain
        // },
      },
    },
    compress: true, //开发服务器是否启动gzip等压缩
  },
};
