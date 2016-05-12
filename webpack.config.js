var path = require('path');
var webpack = require('webpack');

const config = {
  entry: {
    app: ['./src/index'],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: ['common', 'vendor'] }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    preLoaders: [{
      test: /\.js$/,
      loaders: ['eslint'],
      exclude: ['node_modules']
    }],
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass?includePaths[]='+path.join(__dirname, 'node_modules')]
    }]
  }
};

if(process.env.NODE_ENV === 'production') {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }));
} else {
	config.devtool = 'source-map';
  for(let entry in config.entry) entry!='vendor'&&(config.entry[entry] = ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server', ...config.entry[entry]]);
}

module.exports = config;
