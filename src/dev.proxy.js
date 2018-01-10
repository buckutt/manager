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
        secure: false
    });

const app = express();

app.use((req, res, next) => {
    if (req.url.indexOf('/api/') === 0) {
        let url = req.url.replace('/api/', '');

        switch(url) {
            case 'login':
                url = 'services/login';
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

    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

const compiler = webpack(require('../build/webpack.development.config.js'));

app.use(devMiddleware(compiler, {
    stats: { colors: true }
}));

app.listen(8083);
