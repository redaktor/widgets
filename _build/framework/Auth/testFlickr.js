(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./OAuth/one", "express", "express-session"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var one_1 = require("./OAuth/one");
    var express = require("express");
    var session = require("express-session");
    var app = express();
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
    var HOST = 'https://redaktor.circinus.uberspace.de/redaktornode/';
    var flickr = new one_1.default({
        debug: true,
        consumerKey: process.env.CONSUMER_KEY,
        consumerSecret: process.env.CONSUMER_SECRET,
        requestUrl: 'https://www.flickr.com/services/oauth/request_token',
        authUrl: 'https://www.flickr.com/services/oauth/authorize?perms=read',
        accessUrl: 'https://www.flickr.com/services/oauth/access_token',
        callbackUrl: HOST + 'callback',
        //options: {request: {}, access: {}}
        verify: function (oauthRes) {
            console.log('oauthRes', oauthRes);
            return { fullname: oauthRes.data.fullname };
            /*
           oauthRes { data:
            { oauth_token: '1767',
              oauth_token_secret: 'zM',
              user_id: '17674844',
              screen_name: 'sl007',
              x_auth_expires: '0',
              authUrl: 'https://api.flickr.com/oauth/authenticate?oauth_token=1767...' },
         
             return flickr.get({
               url: 'https://api.flickr.com/1.1/account/verify_credentials.json',
               responseType: 'json',
               oauth: oauthRes.data
             });*/
        }
    });
    //console.log(flickr.callback.path);
    /* Easier to use redaktor.auth middlewares - testing OAuth1 here */
    /* Basically app.get('/',flickr.auth.bind(flickr)); */
    var testState = 'redaktorABCDEFGHIJKLMNOPQRZ12345';
    app.get('/', function (req, res) {
        flickr.auth(req, res, { state: testState }).then(function (authRes) {
            console.log('flickr authRes', authRes);
        });
    });
    app.get('/callback', function (req, res) {
        // Obtaining access_token, verifying, logging
        flickr.access(req, res)
            .then(flickr.verify)
            .then(function (verifyRes) {
            console.log('flickr verifyRes', verifyRes);
            res.json(verifyRes);
        });
    });
    app.listen(5000);
});
//# sourceMappingURL=testFlickr.js.map