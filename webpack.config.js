const path    = require('path');
const webpack = require('webpack');

module.exports = {
    entry : './src/app.js',
    output: {
        path      : path.join(__dirname, '/public'),
        publicPath: '/',
        filename  : 'build.js'
    },
    module: {
        rules: [
            {
                test   : /\.vue$/,
                loader : 'vue-loader',
                options: {
                    // vue-loader options go here
                }
            },
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                exclude: /node_modules/,
                query  : {
                    presets: ['es2015', 'stage-2'],
                    plugins: ['transform-runtime', 'add-module-exports']
                }
            },
            {
                test  : /\.json$/,
                loader: 'json-loader'
            },
            {
                test   : /\.(png|jpg|gif|svg)$/,
                loader : 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test  : /\.css$/,
                loader: 'style-loader!css-loader?-url'
            }
        ]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.common.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo            : true,
        contentBase       : './public',
        hot               : true
    },
    devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = false;
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}
