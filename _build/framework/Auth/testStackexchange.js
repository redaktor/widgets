(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./OAuth/two", "express", "express-session", "helmet"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var two_1 = require("./OAuth/two");
    var express = require("express");
    var session = require("express-session");
    var helmet = require("helmet");
    var app = express();
    app.use(helmet());
    app.use(session({
        secret: 'evtlEnterAnythingHER3_butSALTit:',
        resave: false,
        saveUninitialized: false,
        cookie: {
        // maxAge: 60000
        /* TODO FIXME in production : */
        /* secure: true */
        }
    }));
    var g = new two_1.default({
        id: 'stackexchange',
        debug: true,
        clientId: process.env.CLIENT_KEY,
        clientSecret: process.env.CLIENT_SECRET,
        authUrl: 'https://stackexchange.com/oauth',
        accessUrl: 'https://stackexchange.com/oauth/access_token',
        verifyUrl: 'https://api.stackexchange.com/2.2/me',
        callbackUrl: 'https://redaktor.circinus.uberspace.de/redaktornode/auth',
        scope: '',
        //Accept: application/vnd.github.v3+json
        //verifier: { userId: '#items/0/account_id' },
        verify: function (oauthRes) {
            console.log('oauthRes', oauthRes);
            return g.get({
                url: 'https://api.stackexchange.com/2.2/me',
                responseType: 'json',
                oauth: oauthRes,
                query: {
                    order: 'desc',
                    site: 'gis.stackexchange.com',
                    key: 'A08losWPtUdwPk95Zm47pw((',
                    access_token: oauthRes.access_token,
                    filter: 'withbody'
                }
            });
            // userId = data.login
        }
    });
    var testState = 'redaktorABCDEFGHIJKLMNOPQRZ12345';
    app.get('/', function (req, res, next) {
        //console.log('AUTH HEADERS', JSON.stringify(res.headers));
        g.auth(req, res, { state: testState });
    });
    app.get('/auth', function (req, res) {
        //console.log('ACCESS HEADERS', JSON.stringify(res.headers));
        // Obtaining access_token, verifying, logging
        g.access(req, res, { state: testState })
            .then(g.verify, function (e) { console.log('ACCESS ERR', e); })
            .then(function (gRes) {
            console.log('stackexchangeData', gRes.data);
            if (gRes.data.meta.status === 200) {
                res.status(200).send('OK! ' /* + gRes.data.name */);
            }
            else {
                res.status(gRes.data.meta.status || 404).send('Sorry, we cannot find that!');
            }
        }, function (e) { console.log('VERIFY ERR', e); });
    });
    app.listen(5000);
});
//# sourceMappingURL=testStackexchange.js.map