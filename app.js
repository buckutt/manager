const express   = require('express');
const proxy     = require('http-proxy-middleware');
const fs        = require('fs');

const app      = express();

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

app.use('/manifest.json', (req, res) => {
    res
        .status(200)
        .json(require('./manifest'));
});

app.use('/', express.static('public'));

app.use('/api/*', proxy(options));

app.listen(8083, () => {
    console.log('Server listening on port 8083');
});
