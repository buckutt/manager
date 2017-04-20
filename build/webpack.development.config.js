const fs      = require('fs');
const webpack = require('webpack');
const merge   = require('webpack-merge');
const utils   = require('./utils');
const base    = require('./webpack.base.config');
const path    = require('path');

const keyPath = path.join(__dirname, '../ssl/manager-key.pem');
const crtPath = path.join(__dirname, '../ssl/manager-crt.pem')

if (!fs.existsSync(keyPath) || !fs.existsSync(crtPath)) {
    throw new Error('SSL certificate not found');
}

const proxy = {
    '/api/*': {
        target: {
            host    : process.env.API_HOST || 'localhost',
            port    : process.env.API_PORT || 3000,
            protocol: 'https:',
            key     : fs.readFileSync(keyPath, 'utf8'),
            cert    : fs.readFileSync(crtPath, 'utf8')
        },
        changeOrigin: true,
        secure      : false,
        pathRewrite : {
            '/api/login': '/services/login',
            '^/api'     : '/services/manager'
        },
        logLevel: 'warn'
    }
};

module.exports = merge(base, {
    module: {
        rules: utils.styleLoaders()
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"development"' },
            'config': require('../config')
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer: {
        proxy
    }
});
