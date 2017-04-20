const express = require('express');
const proxy   = require('http-proxy-middleware');
const fs      = require('fs');
const path    = require('path');

const keyPath = path.join(__dirname, './ssl/manager-key.pem');
const crtPath = path.join(__dirname, './ssl/manager-crt.pem')

if (!fs.existsSync(keyPath) || !fs.existsSync(crtPath)) {
    throw new Error('SSL certificate not found');
}

const app     = express();

const options = {
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
