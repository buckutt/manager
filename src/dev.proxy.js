const fs            = require('fs');
const path          = require('path');
const https         = require('https');
const express       = require('express');
const httpProxy     = require('http-proxy');
const webpack       = require('webpack');
const devMiddleware = require('webpack-dev-middleware');

const proxy = httpProxy
    .createProxyServer({
        agent: new https.Agent({
            pfx: fs.readFileSync(path.join(__dirname, '../../server/ssl/certificates/manager/manager.p12')),
            passphrase: 'manager'
        }),
        secure: false,
        ws: true
    });

const app = express();

app.use((req, res, next) => {
    if (req.url.indexOf('/api/') === 0) {
        let url = req.url.replace('/api/', '');

        switch(url) {
            case 'login':
                url = 'services/login';
                break;
            case 'provider/callback':
                url = 'provider/callback';
                break;
            default:
                url = `services/manager/${url}`;
                break;
        }

        console.log(`redirecting ${req.url} to https://0.0.0.0:3000/${url}`);

        proxy.web(req, res, {
            ignorePath: true,
            target: `https://0.0.0.0:3000/${url}`
        });

        return;
    }

    if (req.url.indexOf('/socket.io/') === 0) {
        proxy.web(req, res, {
            target: `https://0.0.0.0:3000/${req.url}`
        });

        return;
    }

    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

const compiler = webpack(require('../build/webpack.development.config.js'));

app.use(devMiddleware(compiler, {
    stats: { colors: true }
}));

let server = app.listen(8083);

server.on('upgrade', (req, socket, head) => {
    console.log('upgrading socket request to https://0.0.0.0:3000/');

    proxy.ws(req, socket, head, {
        target: 'https://0.0.0.0:3000/'
    });
});
