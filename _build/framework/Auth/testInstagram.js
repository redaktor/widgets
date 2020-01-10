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
        authUrl: 'https://api.instagram.com/oauth/authorize/',
        accessUrl: 'https://api.instagram.com/oauth/access_token',
        callbackUrl: 'https://redaktor.circinus.uberspace.de/redaktornode/auth',
        scope: 'basic',
        verify: function (oauthRes) {
            console.log('oauthRes', oauthRes);
        }
    });
    /*
    { access_token: '430xxx',
      user:
       { username: 'sebastianlasse',
         bio: '',
         website: '',
         profile_picture: 'https://scontent.cdninstagram.com/t51.2885-19/s150x150/13827479_1167675740013158_207377041278894080_a.jpg',
         full_name: 'Sebastian Lasse',
         id: '4304863848' },
      meta: { status: 200 } }
    */
    var testState = 'redaktorABCDEFGHIJKLMNOPQRZ12345';
    app.get('/', function (req, res, next) {
        //console.log('AUTH HEADERS', JSON.stringify(res.headers));
        g.auth(req, res, { state: testState });
    });
    app.get('/auth', function (req, res) {
        //console.log('ACCESS HEADERS', JSON.stringify(res.headers));
        // Obtaining access_token, verifying, logging
        g.access(req, res, { state: testState }).then(g.verify);
    });
    app.listen(5000);
});
//# sourceMappingURL=testInstagram.js.map