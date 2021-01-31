module.exports = {

  /*
  高速化
    sourcemapのタイプ - done

  */

  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  cache: true,
  mode: "development",
  devtool: 'cheap-module-source-map',
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader?cacheDirectory',
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                '@babel/preset-env',
              ]
            }
          }
        ]
      }
    ]
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
  },
};
