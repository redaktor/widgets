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
        debug: true,
        clientId: process.env.CLIENT_KEY,
        clientSecret: process.env.CLIENT_SECRET,
        authUrl: 'https://accounts.google.com/o/oauth2/auth',
        accessUrl: 'https://www.googleapis.com/oauth2/v4/token',
        callbackUrl: 'https://redaktor.circinus.uberspace.de/redaktornode/callback',
        scope: 'https://www.googleapis.com/auth/plus.me',
        verify: function (oauthRes) {
            console.log('oauthRes', oauthRes);
            /*
              return g.get({
                url: 'https://www.googleapis.com/plus/v1/people/me',
                responseType: 'json',
                oauth: oauthRes
              });
            */
        }
    });
    /* Easier to use redaktor.auth middlewares - testing OAuth1 here */
    /* Basically app.get('/',twitter.getRequestToken.bind(twitter)); */
    /*
    app.get('/2', (req: any, res: any) => {
      twitter2.auth().then(function(v){
        console.log('-1',v);
      },
      function(e){
        console.log('-2',e);
      })
    });
    app.get('/testerror', function (req: any, res: any, next: any) {
      res.status((req.query.status) ? parseInt(req.query.status) : 400).end();
    });
    */
    var testState = 'redaktorABCDEFGHIJKLMNOPQRZ1234';
    app.get('/', function (req, res, next) {
        //console.log('AUTH HEADERS', JSON.stringify(res.headers));
        g.auth(req, res, { state: testState });
    });
    app.get('/callback', function (req, res) {
        //console.log('ACCESS HEADERS', JSON.stringify(res.headers));
        // Obtaining access_token, verifying, logging
        g.access(req, res)
            .then(g.verify)
            .then(function (gRes) {
            console.log('googleData', gRes.data);
            if (gRes.data.meta.status === 200) {
                res.status(200).send('OK! ' + gRes.data.displayName);
            }
            else {
                res.status(gRes.data.meta.status || 404).send('Sorry, we cannot find that!');
            }
        });
    });
    app.listen(5000);
});
//# sourceMappingURL=testGoogle.js.map