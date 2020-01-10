(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./MailAuth", "express", "express-session", "body-parser"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MailAuth_1 = require("./MailAuth");
    var express = require("express");
    var session = require("express-session");
    var bodyParser = require("body-parser");
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
    app.use([bodyParser.json(), bodyParser.urlencoded({ extended: true })]);
    var HOST = 'https://redaktor.circinus.uberspace.de/redaktornode/';
    var m = new MailAuth_1.default({
        debug: true,
        callbackUrl: HOST,
        user: 'redaktor-mail',
        pass: process.env.SECRET,
        email: 'mail@redaktor.circinus.uberspace.de',
        name: 'IndieAuth',
        host: 'circinus.uberspace.de',
        port: 587,
        renderForm: true // (default false)
    });
    /* Easier to use redaktor.auth middlewares - testing OAuth1 here */
    /* Basically app.get('/',twitter.auth.bind(twitter)); */
    var testState = 'redaktorABCDEFGHIJKLMNOPQRZ12345';
    app.get('/', function (req, res) {
        m.auth(req, res, { state: testState, to: process.env.TO, html: true, xkcd: true });
    });
    app.post('/', function (req, res) {
        m.access(req, res).then(function (o) { console.log('FINAL', o); });
    });
    app.listen(5000);
});
//# sourceMappingURL=testMail.js.map