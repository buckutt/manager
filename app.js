const webpack   = require('webpack');
const express   = require('express');
const proxy     = require('http-proxy-middleware');
const fs        = require('fs');

const app      = express();
const compiler = webpack(require('./webpack.config.js'));

const options = {
    target: {
        host    : process.env.API || 'localhost',
        port    : 3000,
        protocol: 'https:',
        ca      : fs.readFileSync('./ssl/ca-crt.pem', 'utf8'),
        cert    : fs.readFileSync('./ssl/client-crt.pem', 'utf8'),
        key     : fs.readFileSync('./ssl/client-key.pem', 'utf8')
    },
    changeOrigin: true,
    secure      : false,
    pathRewrite : {
        '/api/login': '/services/login',
        '^/api'     : '/services/manager'
    },
    logLevel: 'warn'
};

const webpackLog = (err, stats) => {
    if (err) {
        return console.log(err);
    }

    console.log(stats.toString({
        chunks: false,
        colors: true
    }));
};

if (process.env.WATCH) {
    compiler.watch({
        aggregateTimeout: 300,
        poll            : true
    }, webpackLog);
} else {
    compiler.run(webpackLog);
}

app.use('/', express.static('public'));

app.use('/api/*', proxy(options));

app.listen(8083, () => {
    console.log('Server listening on port 8083');
});
