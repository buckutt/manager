const express = require('express');
const proxy   = require('http-proxy-middleware');
const fs      = require('fs');

const app     = express();

const options = {
    target: {
        host    : (process.env.NODE_ENV === 'dev') ? 'localhost' : 'nginx_service',
        port    : (process.env.NODE_ENV === 'dev') ? 3000 : 443,
        protocol: 'https:',
        key     : fs.readFileSync('./ssl/manager-key.pem', 'utf8'),
        cert    : fs.readFileSync('./ssl/manager-crt.pem', 'utf8')
    },
    changeOrigin: true,
    secure      : false,
    pathRewrite : {
        '/api/login': '/services/login',
        '^/api'     : '/services/manager'
    },
    logLevel: 'warn'
};

app.use('/manifest.json', (req, res) => {
    res
        .status(200)
        .json(require('./manifest'));
});

app.use('/', express.static('dist'));

app.use('/api/*', proxy(options));

app.listen(8083, () => {
    console.log('Server listening on port 8083');
});
