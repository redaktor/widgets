(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "path", "./router", "../../Template"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var express = require("express");
    var path = require("path");
    var router_1 = require("./router");
    var Template_1 = require("../../Template");
    var basePath = '../../../';
    var app = express();
    /* Rendering : */
    app.engine('html', Template_1.render);
    app.set('view engine', 'html');
    app.set('views', path.resolve(__dirname, basePath + 'views/IndieAuth'));
    /* Static Directories : */
    app.use(express.static(path.resolve(__dirname, basePath)));
    app.use(express.static(path.resolve(__dirname, basePath + 'assets')));
    app.use(express.static(path.resolve(__dirname, basePath + 'node_modules')));
    /* Router for IndieAuth : */
    app.use(router_1.default);
    app.listen(5000);
});
//# sourceMappingURL=server.js.map